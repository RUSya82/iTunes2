import {radioPlayerInit} from './radioplayer.js';
import {videoPlayerInit} from "./videoplayer.js";
import {audioPlayerInit} from "./audioPlayer.js";

let buttons = document.querySelectorAll('.player-btn');
let blocks = document.querySelectorAll('.player-block');

let resetPlayers = () => {
    buttons.forEach((btn, i) => {
       btn.classList.remove('active');
       blocks[i].classList.remove('active');
    });
}

buttons.forEach((btn, index) => {
    btn.addEventListener('click',(e) => {
        resetPlayers();
        btn.classList.add('active');
        blocks[index].classList.add('active');
    })
});



radioPlayerInit();
videoPlayerInit();
audioPlayerInit()