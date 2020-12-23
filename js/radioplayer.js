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

    const setInitVolume = (vol) => {
        audio.volume = vol;
    }

    /**
     * Устанавливает иконку видео "Звук есть"
     */
    const setVolumeIconTrue = () => {
        radioButtonVolume.classList.add('fa-volume-up');
        radioButtonVolume.classList.remove('fa-volume-off');
    }
    /**
     * Устанавливает иконку видео "Звук отключен"
     */
    const setVolumeIconFalse = () => {
        radioButtonVolume.classList.remove('fa-volume-up');
        radioButtonVolume.classList.add('fa-volume-off');
    }

    setInitVolume(0.5);


    /**
     * Переключает звук видео (вкл/выкл)
     */
    const toggleVolume = () => {
        if(audio.muted === true){
            audio.muted = false;
        }else{
            audio.muted = true;
        }
    }

    radioButtonVolume.addEventListener('click',toggleVolume);

    /**
     *  Если меняем ползунок управления звуком
     */
    radioVolumeProgress.addEventListener('change', () => {
        let newVolumeValue = radioVolumeProgress.value;
        audio.volume  = newVolumeValue/100;
    })

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

    /**
     * Событие изменения звука
     */
    audio.addEventListener('volumechange', () => {
        let currentVolume = audio.volume;
        radioVolumeProgress.value = currentVolume*100;
        //меняем иконку наличия звука если он на нуле или muted
        if(currentVolume === 0 || audio.muted){
            setVolumeIconFalse();
        }else{
            setVolumeIconTrue();
        }
    })

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