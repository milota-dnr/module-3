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
const pulya = document.getElementById('pulya')

const coins = document.getElementById('coins')
const coinsCount = document.getElementById('coins-count')
let coinsNumber = -1

const snaryad = document.getElementById('snaryad');

snaryad.addEventListener('mousedown', function(event) {
  // Проверяем, что нажата левая кнопка мыши (код 0)
  if (event.button === 0) {
    // Запускаем движение вверх
    moveUp();
  }
});

function moveUp() {
  const animate = () => {
    const currentTop = parseInt(snaryad.style.top) || 100;
    if (currentTop > 0) {
      snaryad.style.top = (currentTop - 5) + 'px'; // Скорость: 5 пикселей за шаг
      requestAnimationFrame(animate);
    }
  };
  animate();
}


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
    // Проверка на корректность координат
    if (!rect1 || !rect2) return false;

    return rect1.right >= rect2.left &&
           rect1.left <= rect2.right &&
           rect1.bottom >= rect2.top &&
           rect1.top <= rect2.bottom;
}

let moneyCollected = false;

function updateGame() {
    // Используем глобальные переменные, а не переобъявляем
    if (!moneyElement || !player || moneyCollected) return;

    const moneyRect = moneyElement.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (checkCollision(moneyRect, playerRect)) {
        moneyCollected = true;
        moneyElement.style.display = 'none';
        console.log('Монета собрана!');
        coinsNumber++
        coinsCount.textContent = coinsNumber
        // Здесь можно добавить +1 к счётчику монет
    }
}

// Функция для сброса монеты (вызывайте, например, каждые 5 секунд)
function resetMoney() {
    if (moneyCollected) {
        moneyCollected = false;
        moneyElement.style.display = 'block';
        moneyElement.style.left = Math.random() * 700 + 'px';
        moneyElement.style.top = Math.random() * 500 + 'px';
    }
}

setInterval(updateGame, 1000 / 30);
setInterval(resetMoney, 2000); // Монета появляется каждые 2 секунд



const formElement = document.getElementById('form')
const path = document.getElementById('path')
const header = document.getElementById('header')

const timeStartCount = document.getElementById('time-start')

const userName = document.getElementById('user-name')
const buttonStart = document.getElementById('button-start')

buttonStart.addEventListener('click', function(){
     const value = userName.value.trim(); // Убираем пробелы по краям
    const length = value.length;
    if(length>=5){
        console.log('регистрация успешна')
        player.style.display = 'block'
        formElement.style.display = 'none'
        header.style.display = 'block'
        path.style.display = 'block'
    }
})
// Настройки стрельбы
const FIRE_RATE = 300; // мс между выстрелами
const BULLET_SPEED = 10; // пикселей за кадр
let lastFireTime = 0;

// Функция создания снаряда
function createBullet() {
  const bullet = document.createElement('div');
  bullet.classList.add('bullet');

  // Получаем координаты игрока и контейнера
  const playerRect = player.getBoundingClientRect();
  const containerRect = document.getElementById('container').getBoundingClientRect();

  // Расчёт позиции пули:
  // 1. Позиция игрока внутри контейнера: playerRect.left - containerRect.left
  // 2. Центр игрока по горизонтали: + playerRect.width / 2
  // 3. Центр пули: - (bulletWidth / 2), где bulletWidth = 8px (из CSS)
  const bulletWidth = 8; // ширина пули из .bullet в CSS
  const bulletX = playerRect.left - containerRect.left + playerRect.width / 2 - bulletWidth / 2;

  // Позиция пули по вертикали: верхний край игрока
  const bulletY = playerRect.top - containerRect.top;

  // Устанавливаем стили
  bullet.style.left = bulletX + 'px';
  bullet.style.top = bulletY + 'px';

  document.getElementById('container').appendChild(bullet);
  return bullet;
}


// Функция движения снаряда
function moveBullet(bullet) {
  const animate = () => {
    const currentTop = parseInt(bullet.style.top) || 0;
    if (currentTop > -20) { // Убираем за верхней границей
      bullet.style.top = (currentTop - BULLET_SPEED) + 'px';
      requestAnimationFrame(animate);
    } else {
      // Удаляем элемент, если вышел за экран
      bullet.remove();
    }
  };
  animate();
}

// Основная функция стрельбы
function shoot() {
  const currentTime = Date.now();
  if (currentTime - lastFireTime < FIRE_RATE) return; // Ограничение частоты

  lastFireTime = currentTime;
  const bullet = createBullet();
  moveBullet(bullet);
}

// Обработчики событий для стрельбы
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') { // Пробел для стрельбы
    event.preventDefault(); // Предотвращаем прокрутку страницы
    shoot();
  }
});

document.getElementById('shoot-btn').addEventListener('click', shoot);
function checkCollision(rect1, rect2) {
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}
function checkBulletEnemyCollisions() {
    const bullets = document.querySelectorAll('.bullet');
    const enemy = document.getElementById('wars');

    // Если врага нет или он скрыт, выходим
    if (!enemy || enemy.style.display === 'none') return;

    const enemyRect = enemy.getBoundingClientRect();

    bullets.forEach(bullet => {
        const bulletRect = bullet.getBoundingClientRect();

        if (checkCollision(bulletRect, enemyRect)) {
            // Обрабатываем столкновение
            handleCollision(bullet, enemy);
        }
    });
}
function handleCollision(bullet, enemy) {
    // Удаляем пулю
    bullet.remove();

    // Здесь можно добавить эффекты взрыва, звука и т. д.
    console.log('Попадание в врага!');

    // Уничтожаем врага (или уменьшаем здоровье)
    destroyEnemy(enemy);

    // Обновляем счётчик уничтоженных врагов
    updateEnemyCount();
}

function destroyEnemy(enemy) {
    enemy.style.display = 'none';
    // Можно добавить анимацию взрыва перед удалением
    setTimeout(() => {
        resetEnemy(enemy); // Возрождаем врага через некоторое время
    }, 2000); // Через 2 секунды
}

function resetEnemy(enemy) {
    enemy.style.display = 'block';
    // Случайная позиция для врага
    enemy.style.left = Math.random() * 700 + 'px';
    enemy.style.top = Math.random() * 500 + 'px';
}

function updateEnemyCount() {
    // Пример обновления счётчика уничтоженных врагов
    const enemyCountElement = document.getElementById('enemy-count');
    if (enemyCountElement) {
        let currentCount = parseInt(enemyCountElement.textContent) || 0;
        enemyCountElement.textContent = currentCount + 1;
    }
}
function gameLoop() {
    checkBulletEnemyCollisions();
    updateGame(); // Ваша существующая функция обновления игры
    requestAnimationFrame(gameLoop);
}

// Запускаем игровой цикл после загрузки страницы
window.addEventListener('load', () => {
    initPlayerPosition();
    gameLoop();
});
// Проверяем коллизии 60 раз в секунду (более плавно)
setInterval(checkBulletEnemyCollisions, 1000 / 60);
