const block = document.getElementById('block')

const time = document.getElementById('time')
const timeCount = document.getElementById('time-count')

const money = document.getElementById('money')
const moneyCount = document.getElementById('money-count')

const army = document.getElementById('arm')
const armyCount = document.getElementById('arm-count')

const heart = document.getElementById('heart')
const heartCount = document.getElementById('heart-count')

const player = document.getElementById('player')
const warsElement = document.getElementById('wars')
const moneyElement = document.getElementById('money')

const speedY = 10;

const hearthStart = 100
const moneyStart = 0
const armyStart = 30

let playerPosX = 0;
let playerPosY = 0;
console.log('Стартовые позиции', playerPosX + '   ' + playerPosY);

function updatePlayerPosition() {
    player.style.left = playerPosX + 'px'; 
    player.style.top = playerPosY + 'px';  
    console.log(`Позиция: X = ${playerPosX} px, Y = ${playerPosY} px`);
}

function initPlayerPosition() {
    const computedStyle = window.getComputedStyle(player);
    playerPosY = parseInt(computedStyle.top, 10) || 0;
    playerPosX = parseInt(computedStyle.left, 10) || 0;
    updatePlayerPosition();
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') {
        playerPosY -= speedY;  
        updatePlayerPosition();
    } else if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
        playerPosY += speedY; 
        updatePlayerPosition();
    } else if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
        playerPosX -= speedY;  
        updatePlayerPosition();
    } else if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
        playerPosX += speedY; 
        updatePlayerPosition();
    }
});

window.addEventListener('load', initPlayerPosition);

// Счетчики

function checkCollision(rect1, rect2) {
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

function updateGame() {
    const moneyElement = document.getElementById('money');
    const player = document.getElementById('player');

    const moneyRect = moneyElement.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (checkCollision(moneyRect, playerRect)) {
        
        moneyElement.style.display = 'none';
        const currentMoney = moneyCount += 1
    }
}


setInterval(updateGame, 1000 / 30);
