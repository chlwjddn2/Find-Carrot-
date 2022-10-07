'use strict'; 

export default class PopUp {
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.message = document.querySelector('.message');
        this.restartBtn = document.querySelector('.restart');
        this.restartBtn.addEventListener('click', ()=>{
            this.onClick && this.onClick();
            this.hide();
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

    showPopUp(text) {
        this.message.innerText = text;
        this.popUp.classList.remove('pop-up-hidden');
    }

    hide() {
        this.popUp.classList.add('pop-up-hidden');
    }
}