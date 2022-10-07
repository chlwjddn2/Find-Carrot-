'use strict';

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const backgroudSound = new Audio('./sound/bg.mp3'); // Aduio 객체 생성
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const alertSound = new Audio('./sound/alert.wav');

export function playCarrot() {
    playSound(carrotSound);
}

export function playBug() {
    playSound(bugSound);
}

export function playAlert() {
    playSound(alertSound);
}

export function playWin() {
    playSound(winSound);
}

export function playBackground() {
    playSound(backgroudSound);
}

export function stopBackground() {
    stopSound(backgroudSound);
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play(); 
}

function stopSound(sound){
    sound.pause();
} 