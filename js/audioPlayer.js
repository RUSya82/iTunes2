import { addZero } from "./functions.js";
import {getNextIndexInArr, getPrevIndexInArr} from "./functions.js";
import {volumeInit} from "./volumeInit.js";

export const audioPlayerInit = () => {
    const audioHeader = document.querySelector('.audio-header');
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioPlayer = document.querySelector('.audio-player');
    const audioButtonPrev = document.querySelector('.audio-button__prev');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioButtonNext = document.querySelector('.audio-button__next');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming  = document.querySelector('.audio-progress__timing');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const audioNavigation= document.querySelector('.audio-navigation');
    const audioButtonVolume= document.querySelector('.audio-button__volume');
    const audioVolumeProgress= document.querySelector('.audio-volume__progress');



    let playList = ['flow', 'hello', 'speed'];

    let currentTrack = 0;

    let data = {
        buttonVolume: audioButtonVolume,
        volumeProgress: audioVolumeProgress,
        player: audioPlayer,
        volumeStart: 0.5,

    };
    volumeInit(data);



    const nextTrack = () => {
        currentTrack = getNextIndexInArr(currentTrack, playList);
        loadTrack();
    };

    const prevTrack = () => {
        currentTrack = getPrevIndexInArr(currentTrack, playList);
        loadTrack();
    };

    const loadTrack = () => {
        const isPause = audioPlayer.paused;
        const track = playList[currentTrack];

        audioPlayer.src = `./audio/${track}.mp3`;
        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase()


        if(isPause){
            audioPlayer.pause();
        }else{
            audioPlayer.play();
        }
    }

    loadTrack();

    audioNavigation.addEventListener('click', (e) => {
        let target = e.target;
        if(target.classList.contains('audio-button__play')){
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');
            if(audioPlayer.paused){
                audioPlayer.play();
            }else{
                audioPlayer.pause();
            }
        }
        if(target.classList.contains('audio-button__prev')){
            prevTrack();
        }
        if(target.classList.contains('audio-button__next')){
            nextTrack();
        }
    });

    /**
     * Когда видео проигрывается, меняем положение ползунка и время
     */
    audioPlayer.addEventListener('timeupdate', () => {
        let currentTime = audioPlayer.currentTime;       //текущее время
        let duration = audioPlayer.duration;
        let progress = currentTime / duration * 100;
        let minutePassed = addZero(Math.floor(currentTime/60)) || 0;
        let secondPassed = addZero(Math.floor(currentTime % 60)) || 0;
        let minuteTotal = addZero(Math.floor(duration/60)) || '00';
        let secondTotal = addZero(Math.floor(duration % 60)) || '00';
        audioProgressTiming.style.width = progress + '%';
        audioTimePassed.textContent = `${minutePassed}:${secondPassed}`;
        audioTimeTotal.textContent = `${minuteTotal}:${secondTotal}`;

    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioProgress.addEventListener('click', (e) => {
        const  x = e.offsetX;
        console.log('x = ' + x);
        const  allWidth = audioProgress.clientWidth;
        console.log('allWidth = ' + allWidth);
        const progress = x / allWidth * audioPlayer.duration;
        console.log(progress);
        audioPlayer.currentTime = progress;
    });
}