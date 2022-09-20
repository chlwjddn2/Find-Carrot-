'use strict';

// 당근과 벌레 랜덤 배치
const CARROT_SIZE = 110;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_SEC = 10;

const field = document.querySelector('.fleid');
const fieldRect = field.getBoundingClientRect();
const startBtn = document.querySelector('.start__btn');
const timer = document.querySelector('.timer');
const scoreCount = document.querySelector('.counter');
const popUp = document.querySelector('.pop-up');
const restartBtn = document.querySelector('.restart');
const message = document.querySelector('.message');

//음원 재생
const backgroudSound = new Audio('./sound/bg.mp3'); // Aduio 객체 생성
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');

let started = false;
let score = 0;
let gametimer = undefined;

field.addEventListener('click', onFieldClick);

startBtn.addEventListener('click', ()=>{
    if(started) {
        stopGame();
    } else {
        startGame();
    }
});

restartBtn.addEventListener('click',()=>{
    startGame();
    hidePopUp();
});

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(backgroudSound);
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideStartButton();
    showPopUp('다시 시작하시겠습니까?');
    stopSound(backgroudSound);
}

function finishGame(win){
    started = false;
    if(win){
        playSound(winSound);
    } else {
        playSound(bugSound);
    }
    hideStartButton();
    stopGameTimer();
    stopSound(backgroudSound);
    showPopUp(win? 'You Won!!' : 'You Lost...');
}

function showStopButton() {
    const icon = startBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play'); 
    startBtn.style.visibility = 'visible'; 
}

function hideStartButton() {
    startBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    timer.style.visibility = 'visible';
    scoreCount.style.visibility = 'visible';
}

function startGameTimer(){
    let remainingTimeSec = GAME_SEC;
    updateTimerText(remainingTimeSec);
    gametimer = setInterval(()=>{
        if(remainingTimeSec <= 0){
            clearInterval(gametimer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    },1000);
}

function updateTimerText(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timer.innerText = `${minutes}:${seconds}`;
}

function stopGameTimer(){
    clearInterval(gametimer);
}

function showPopUp(text) {
    message.innerText = text;
    popUp.classList.remove('pop-up-hidden');
}

function hidePopUp() {
    popUp.classList.add('pop-up-hidden');
}

function initGame() {
    score = 0;
    field.innerHTML = '';
    scoreCount.innerText = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, './img/carrot.png');
    addItem('bug', BUG_COUNT, './img/bug.png')
}

function onFieldClick(event) {
    if(!started) {
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')) {
        target.remove();
        score++;
        updateScoreBoard();
        playSound(carrotSound);
        if(score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if(target.matches('.bug')) {
        stopGame();
        finishGame(false);
        playSound(alertSound);
    }
}

function updateScoreBoard(){
    scoreCount.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for(let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play(); 
}

function stopSound(sound){
    sound.pause();
} 
