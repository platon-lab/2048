var board;
var score = 0;
var rows = 4;
var columns = 4;

// Словник для зображень та імен
const tileData = {
    2: { name: "Tito", img: "Tito.png" },
    4: { name: "Smartik", img: "Smartik.png" },
    8: { name: "Junior", img: "Junior.png" },
    16: { name: "Fil", img: "Fil.png" },
    32: { name: "Milka", img: "Milka.png" },
    64: { name: "Bark", img: "Bark.png" }, // Повторюємо або додавай нові
    128: { name: "Tito", img: "Tito.png" },
    256: { name: "Smartik", img: "Smartik.png" },
    512: { name: "Junior", img: "Junior.png" },
    1024: { name: "Fil", img: "Fil.png" },
    2048: { name: "Milka", img: "Milka.png" },
    4096: { name: "Bark", img: "Bark.png" }
};

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            updateTile(tile, 0);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    tile.style.backgroundImage = "none";

    if (num > 0) {
        let data = tileData[num] || tileData[2048];
        tile.classList.add("b" + num);
        tile.style.backgroundImage = `url('${data.img}')`;
        tile.innerHTML = `<span class="tile-name">${data.name}</span>`;
    }
}

// Управління клавіатурою
document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") slideLeft();
    else if (e.code == "ArrowRight") slideRight();
    else if (e.code == "ArrowUp") slideUp();
    else if (e.code == "ArrowDown") slideDown();
    
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)) {
        setTwo();
        document.getElementById("score").innerText = score;
    }
});

// ПІДТРИМКА СВАЙПІВ (Мобільні пристрої)
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    let touchEndX = e.changedTouches[0].screenX;
    let touchEndY = e.changedTouches[0].screenY;
    handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
});

function handleSwipe(startX, startY, endX, endY) {
    let dx = endX - startX;
    let dy = endY - startY;
    
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 30) slideRight();
        else if (dx < -30) slideLeft();
    } else {
        if (dy > 30) slideDown();
        else if (dy < -30) slideUp();
    }
    setTwo();
    document.getElementById("score").innerText = score;
}

// Логіка руху (залишається без змін)
function filterZero(row) { return row.filter(num => num != 0); }

function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = filterZero(row);
    while (row.length < columns) row.push(0);
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        board[r] = slide(board[r]);
        for (let c = 0; c < columns; c++) {
            updateTile(document.getElementById(r + "-" + c), board[r][c]);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        board[r].reverse();
        board[r] = slide(board[r]);
        board[r].reverse();
        for (let c = 0; c < columns; c++) {
            updateTile(document.getElementById(r + "-" + c), board[r][c]);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            updateTile(document.getElementById(r + "-" + c), board[r][c]);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            updateTile(document.getElementById(r + "-" + c), board[r][c]);
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) return;
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            updateTile(document.getElementById(r + "-" + c), 2);
            found = true;
        }
    }
}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) return true;
        }
    }
    return false;
}