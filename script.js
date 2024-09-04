const grid = document.getElementById('game-grid');
const restartBtn = document.getElementById('restart-btn');
let config;

fetch('config.json')
    .then(response => response.json())
    .then(data => {
        config = data;
        createGrid();
    });

function createGrid() {
    grid.innerHTML = '';
    const totalBoxes = 16;
    const deadlyIndexes = generateDeadlyIndexes(config.deadlyCount, totalBoxes);

    for (let i = 0; i < totalBoxes; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.addEventListener('click', () => {
            if (deadlyIndexes.includes(i)) {
                box.classList.add('deadly');
                alert('You lost!');
            } else {
                box.classList.add('safe');
            }
        });
        grid.appendChild(box);
    }
}

function generateDeadlyIndexes(count, total) {
    const indexes = [];
    while (indexes.length < count) {
        const randomIndex = Math.floor(Math.random() * total);
        if (!indexes.includes(randomIndex)) {
            indexes.push(randomIndex);
        }
    }
    return indexes;
}

restartBtn.addEventListener('click', createGrid);
