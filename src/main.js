'use strict';
import PopUp from "./popup.js";
import Game from "./game.js";





const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(()=>{
    startGame();
});

const game = new Game(3,2,2);
game.setGameStopListener((reason)=> {
    console.log(reason);
})
















// function showPopUp(text) {
//     message.innerText = text;
//     popUp.classList.remove('pop-up-hidden');
// }

// function hidePopUp() {
//     popUp.classList.add('pop-up-hidden');
// }







// function addItem(className, count, imgPath) {
//     const x1 = 0;
//     const y1 = 0;
//     const x2 = fieldRect.width - CARROT_SIZE;
//     const y2 = fieldRect.height - CARROT_SIZE;
//     for(let i = 0; i < count; i++) {
//         const item = document.createElement('img');
//         item.setAttribute('class', className);
//         item.setAttribute('src', imgPath);
//         item.style.position = 'absolute';
//         const x = randomNumber(x1, x2);
//         const y = randomNumber(y1, y2);
//         item.style.left = `${x}px`;
//         item.style.top = `${y}px`;
//         field.appendChild(item);
//     }
//     const mediaViewContent = window.matchMedia(`(max-width: 768px)`);
//     const viewChangeHandler = (mediaViewContent) => {
//         for(let i = 0; i < count; i++) {
//             const item = document.createElement('img');
//             item.setAttribute('class', className);
//             item.setAttribute('src', imgPath);
//             item.style.position = 'absolute';
//             const x = randomNumber(x1, x2);
//             const y = randomNumber(y1, y2);
//             item.style.left = `${x}px`;
//             item.style.top = `${y}px`;
//             field.appendChild(item);
//         }
//         mediaViewContent.addEventListener('change',viewChangeHandler);
//     }
// }

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


