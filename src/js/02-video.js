import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

// Зберігаємо час відтворення у локальному сховищі за допомогою методу `setItem()`
player.on('timeupdate', throttle(function(data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}, 1000));

// Відновлюємо час відтворення з локального сховища
const savedTime = localStorage.getItem(STORAGE_KEY);
if (savedTime) {
  try {
    player.setCurrentTime(savedTime);
  } catch (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  }
}