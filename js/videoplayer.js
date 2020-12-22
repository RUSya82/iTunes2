export const videoPlayerInit = () => {
   const videoPlayer = document.querySelector('.video-player');
   const videoButtonPlay = document.querySelector('.video-button__play');
   const videoButtonStop = document.getElementsByClassName('video-button__stop')[0];
   const videoTimePassed = document.querySelector('.video-time__passed');
   const videoProgress = document.querySelector('.video-progress');
   const videoTimeTotal = document.querySelector('.video-time__total');


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
     * меняет иконку стоп на начать заново
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
           setRefreshIcon();
       }
   }

    /**
     * Остановка видеоплеера и сброс на ноль
     */
   const stopPlay = () => {
       videoPlayer.pause();
       videoPlayer.currentTime = 0;
       setPlayIcon();
   }

    /**
     * Добавление нуля, если число меньше 10 (для красоты)
     * @param number
     * @returns {*}
     */
   const addZero = number => (+number < 10) ? ('0' + number) : number;

   videoPlayer.addEventListener('click', videoPlayerToggle);
   videoButtonPlay.addEventListener('click', videoPlayerToggle);
   videoButtonStop.addEventListener('click', () => {
       stopPlay();
       if(videoButtonStop.classList.contains('fa-refresh')){
            videoPlayerToggle();
       }
   });
    /**
     * Когда видео закончилось
     */
   videoPlayer.addEventListener('ended', () =>{
       setPlayIcon();
       videoProgress.value = 0;
   })

   videoPlayer.addEventListener('timeupdate', () => {
       let currentTime = videoPlayer.currentTime;
       let duration = videoPlayer.duration;

       let minutePassed = addZero(Math.floor(currentTime/60));
       let secondPassed = addZero(Math.floor(currentTime % 60));
       let minuteTotal = addZero(Math.floor(duration/60));
       let secondTotal = addZero(Math.floor(duration % 60));

       videoTimePassed.textContent = `${minutePassed}:${secondPassed}`;
       videoTimeTotal.textContent = `${minuteTotal}:${secondTotal}`;
       videoProgress.value = currentTime/duration*100;

   });

   videoProgress.addEventListener('change', () => {
       let duration = videoPlayer.duration;
       let newValue = videoProgress.value;
       videoPlayer.currentTime = (newValue * duration) /100;
   })

}