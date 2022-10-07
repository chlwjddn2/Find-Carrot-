'use strict';
import * as sound from "./sound.js";
import Field from "./field.js";

export default class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.startBtn = document.querySelector('.start__btn');
        this.timer = document.querySelector('.timer');
        this.scoreCount = document.querySelector('.counter');

        this.startBtn.addEventListener('click', ()=>{
            if(this.started) {
                this.stop();
            } else {
                this.start();
            }
        });
        
        
        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);
        
        this. started = false;
        this. score = 0;
        this. gametimer = undefined;
    }
    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }
    start() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
    }
    
    stop() {
        this.started = false;
        this.stopGameTimer();
        this.hideStartButton();
        
        // showPopUp('시작하시겠습니까');
        sound.playAlert();
        sound.stopBackground();
        this.onGameStop && this.onGameStop('cancel');
    }

    finish(win){
        this.started = false;
        if(win){
            sound.playWin();
        } else {
            sound.playBug(); 
        }
        this.hideStartButton();
        this.stopGameTimer();
        sound.stopBackground();
        this.onGameStop && this.onGameStop(win? 'You Won!!' : 'You Lost...');
        // showPopUp(win? 'You Won!!' : 'You Lost...');
    }

    onItemClic = (item) => {
        if(!this.started) {
            return;
        }
        if(item === 'carrot'){
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.carrotCount) {
                this.finish(true);
            } 
        } else if (item === 'bug') {
            this.finish(false);
        }
    };

    showStopButton() {
        const icon = this.startBtn.querySelector('.fa-solid');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play'); 
        this.startBtn.style.visibility = 'visible'; 
    }

    hideStartButton() {
        this.startBtn.style.visibility = 'hidden';
    }

    showTimerAndScore() {
        this.timer.style.visibility = 'visible';
        this.scoreCount.style.visibility = 'visible';
    }
    

    startGameTimer(){
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.gametimer = setInterval(()=>{
            if(remainingTimeSec <= 0){
                clearInterval(this.gametimer);
                this.finish(CARROT_COUNT === this.score);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        },1000);
    }

    stopGameTimer(){
        clearInterval(this.gametimer);
    }

    updateTimerText(time){
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.timer.innerText = `${minutes}:${seconds}`;
    }

    initGame() {
        this.score = 0;
        // field.innerHTML = '';
        this.scoreCount.innerText = this.carrotCount;
        this.gameField.init();
        // addItem('carrot', CARROT_COUNT, 'img/carrot.png');
        // addItem('bug', BUG_COUNT, 'img/bug.png')
    }

    updateScoreBoard(){
        this.scoreCount.innerText = this.carrotCount - this.score;
    }
}

