export const videoPlayerInit = () => {
   const videoPlayer = document.querySelector('.video-player');
   const videoButtonPlay = document.querySelector('.video-button__play');
   const videoTimePassed = document.querySelector('.video-time__passed');
   const videoProgress = document.querySelector('.video-progress');
   const videoTimeTotal = document.querySelector('.video-time__total');
   const videoButtonVolume = document.querySelector('.video-button__volume');
   //Живые коллекции
    const videoButtonStop = document.getElementsByClassName('video-button__stop')[0];
   const videoVolumeProgress = document.getElementsByClassName('video-volume__progress')[0];


    /**
     * Устанавливает начальное значение громкости
     * @param vol
     */
   const setInitVolume = (vol) => {
       videoPlayer.volume = vol;
   }

   setInitVolume(0.5);


    /**
     * Установки иконки в Play
     */
   const setPlayIcon = () => {
       videoButtonPlay.classList.add('fa-play');
       videoButtonPlay.classList.remove('fa-pause');
   }

    /**
     * Установка иконки кнопки в Pause
     */
   const setPauseIcon = () => {
       videoButtonPlay.classList.remove('fa-play');
       videoButtonPlay.classList.add('fa-pause');
   }

    /**
     * устанавливает иконку в "refresh"
     */
   const setRefreshIcon = () => {
       videoButtonStop.classList.remove('fa-stop');
       videoButtonStop.classList.add('fa-refresh');
   }
    /**
     * устанавливает иконку стоп
     */
    const setStopIcon = () => {
        videoButtonStop.classList.add('fa-stop');
        videoButtonStop.classList.remove('fa-refresh');
    }
    /**
     * Устанавливает иконку видео "Звук есть"
     */
    const setVolumeIconTrue = () => {
        videoButtonVolume.classList.add('fa-volume-up');
        videoButtonVolume.classList.remove('fa-volume-off');
    }
    /**
     * Устанавливает иконку видео "Звук отключен"
     */
    const setVolumeIconFalse = () => {
        videoButtonVolume.classList.remove('fa-volume-up');
        videoButtonVolume.classList.add('fa-volume-off');
    }
    /**
     * включение/отключение (пауза) видеоплеера
     */
   const videoPlayerToggle = () => {
       if(videoPlayer.paused){
           videoPlayer.play();
           setPauseIcon();
           setStopIcon();
       }else {
           videoPlayer.pause();
           setPlayIcon();
           setRefreshIcon();        //при паузе есть возможность начать видео сначала
       }
   }

    /**
     * Остановка видеоплеера и сброс на ноль
     */
   const stopPlay = () => {
       videoPlayer.pause();
       videoPlayer.currentTime = 0;
        videoProgress.value = 0;
       setPlayIcon();
   }

    /**
     * Добавление нуля, если число меньше 10 (для красоты)
     * @param number(int)
     * @returns {*}
     */
   const addZero = number => (+number < 10) ? ('0' + number) : number;

    /**
     * обработка нажатияна само окно плеера
     */
   videoPlayer.addEventListener('click', videoPlayerToggle);

    /**
     * обработка нажатия на кнопку плеера
     */
   videoButtonPlay.addEventListener('click', videoPlayerToggle);

    /**
     * Обработка нажатия на кнопку стоп
     */
   videoButtonStop.addEventListener('click', () => {
       stopPlay();
       if(videoButtonStop.classList.contains('fa-refresh')){    //тут наверное грамотнее data-state использовать?
            videoPlayerToggle();
       }
   });

    /**
     * Когда видео закончилось
     */
   videoPlayer.addEventListener('ended', () =>{
       setPlayIcon();       //меняем иконку
       videoProgress.value = 0;     //сбрасываем прогресс на ноль
   })

    /**
     * Когда видео проигрывается, меняем положение ползунка и время
     */
   videoPlayer.addEventListener('timeupdate', () => {
       let currentTime = videoPlayer.currentTime;       //текущее время
       let duration = videoPlayer.duration;             //полное время видео
       /*
        пытался получить duration вне addEventListener - не работает, чтобы время
        minuteTotal и secondTotal постоянно не изменять, они же одинаковые всё время
       */
       let minutePassed = addZero(Math.floor(currentTime/60));
       let secondPassed = addZero(Math.floor(currentTime % 60));
       let minuteTotal = addZero(Math.floor(duration/60));
       let secondTotal = addZero(Math.floor(duration % 60));

       videoTimePassed.textContent = `${minutePassed}:${secondPassed}`;
       videoTimeTotal.textContent = `${minuteTotal}:${secondTotal}`;
        videoProgress.value = currentTime/duration*100;

   });
    /**
     * Переключает звук видео (вкл/выкл)
     */
   const toggleVolume = () => {
       if(videoPlayer.muted === true){
           videoPlayer.muted = false;
       }else{
           videoPlayer.muted = true;
       }
   }

    /**
     * обработка изменения прогресса(range) видео
     */
   videoProgress.addEventListener('input', () => {
       //console.log(111);
       let duration = videoPlayer.duration;
       let newValue = videoProgress.value;
       console.log(newValue);
       videoPlayer.currentTime = (newValue * duration) /100;
   })
    /**
     *  включаем и отключаем звук по кнопке звука
     */
    videoButtonVolume.addEventListener('click',toggleVolume);

    /**
     *  Если меняем ползунок управления звуком
     */
    videoVolumeProgress.addEventListener('change', () => {
        let newVolumeValue = videoVolumeProgress.value;
        videoPlayer.volume  = newVolumeValue/100;
    })

    /**
     * Событие изменения звука
     */
    videoPlayer.addEventListener('volumechange', () => {
        let currentVolume = videoPlayer.volume;
        videoVolumeProgress.value = currentVolume*100;
        //меняем иконку наличия звука если он на нуле или muted
        if(currentVolume === 0 || videoPlayer.muted){
            setVolumeIconFalse();
        }else{
            setVolumeIconTrue();
        }
    })

}