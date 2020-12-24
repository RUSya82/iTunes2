export const volumeInit = (data) => {
   try {
       let buttonVolume = data.buttonVolume;
       let volumeProgress = data.volumeProgress;
       let player = data.player;
       let volumeStart = data.volumeStart ? data.volumeStart : null;

       if(!buttonVolume){
           throw new ReferenceError("не определа buttonVolume");
       }
       if(!volumeProgress){
           throw new ReferenceError("не определа volumeProgress");
       }
       if(!player){
           throw new ReferenceError("не определа player");
       }

       /**
        * Устанавливает начальное значение громкости
        * @param vol
        */
       const setInitVolume = (vol) => {
           player.volume = vol;
           let currentVolume = player.volume;
           volumeProgress.value = currentVolume * 100;
       }

       setInitVolume(volumeStart);

       /**
        * Устанавливает иконку видео "Звук есть"
        */
       const setVolumeIconTrue = () => {
           buttonVolume.classList.add('fa-volume-up');
           buttonVolume.classList.remove('fa-volume-off');
       }
       /**
        * Устанавливает иконку видео "Звук отключен"
        */
       const setVolumeIconFalse = () => {
           buttonVolume.classList.remove('fa-volume-up');
           buttonVolume.classList.add('fa-volume-off');
       }
       /**
        * Переключает звук видео (вкл/выкл)
        */
       const toggleVolume = () => {
           if (player.muted === true) {
               player.muted = false;
           } else {
               player.muted = true;
           }
       }
       /**
        *  включаем и отключаем звук по кнопке звука
        */
       buttonVolume.addEventListener('click', toggleVolume);
       /**
        *  Если меняем ползунок управления звуком
        */
       volumeProgress.addEventListener('input', () => {
           let newVolumeValue = volumeProgress.value;
           player.volume = newVolumeValue / 100;
       });
       /**
        * Событие изменения звука
        */
       player.addEventListener('volumechange', () => {
           let currentVolume = player.volume;
           volumeProgress.value = currentVolume * 100;
           //меняем иконку наличия звука если он на нуле или muted
           if (currentVolume === 0 || player.muted) {
               setVolumeIconFalse();
           } else {
               setVolumeIconTrue();
           }
       });
   }catch (e) {
       console.error("Извините, в данных ошибка");
       console.error(e.name);
       console.error(e.message);
   }

}