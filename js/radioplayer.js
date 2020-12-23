import {volumeInit} from "./volumeInit.js";
export const radioPlayerInit = () => {
    let radio = document.querySelector('.radio');
    let radioCoverImg = document.querySelector('.radio-cover__img');
    let radioHeaderBig = document.querySelector('.radio-header__big');
    let radioNavigation = document.querySelector('.radio-navigation');
    let radioItem = document.querySelectorAll('.radio-item');
    let radioStop = document.querySelector('.radio-stop');

    let radioButtonVolume = document.querySelector('.radio-button__volume');

    let radioVolumeProgress = document.getElementsByClassName('radio-volume__progress')[0];

    let audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;

    let data = {
        buttonVolume: radioButtonVolume,
        volumeProgress: radioVolumeProgress,
        player: audio,
        volumeStart: 0.5,

    };
    volumeInit(data);


    const setPlayIcon = () => {
        radioStop.classList.remove('fa-stop');
        radioStop.classList.add('fa-play');
    }

    const setStopIcon = () => {
        radioStop.classList.remove('fa-play');
        radioStop.classList.add('fa-stop');
    }

    const setSelectRadioStation = (station) => {
        radioItem.forEach(item => item.classList.remove('select'));
        station.classList.add('select');
    }


    audio.addEventListener('play', () => {
        setStopIcon();
        radio.classList.add('play');
    });
    audio.addEventListener('pause', () => {
        setPlayIcon();
        radio.classList.remove('play');
    });

    radioNavigation.addEventListener('change', (event) => {
        let target = event.target;
        let parent = target.closest('.radio-item');
        radioHeaderBig.textContent = parent.querySelector('.radio-name').textContent;
        let curImg = parent.querySelector('.radio-img').src;
        radioCoverImg.src = curImg;
        setSelectRadioStation(parent);

        audio.src = target.dataset.radioStantion;

        audio.play();
        radioStop.disabled = false;
    });

    radioStop.addEventListener('click', () => {
        if(audio.paused){
            audio.play();
        }else{
            audio.pause();
        }
    })

}