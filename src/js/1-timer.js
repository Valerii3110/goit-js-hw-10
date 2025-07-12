import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorSvg from '../img/error.svg';

const startButton = document.querySelector('button');
const datetimePicker = document.getElementById('datetime-picker');
const timeValuesArray = document.getElementsByClassName('value');

let userSelectedDate = null;
let countdownInterval = null;

// iziToast error message config
const toastErrorConfig = {
  timeout: 5000,
  title: 'Error',
  message: 'Please choose a date in the future',
  titleColor: '#fff',
  messageColor: '#fff',
  backgroundColor: '#EF4040',
  progressBarColor: '#B51B1B',
  iconUrl: errorSvg,
  position: 'topRight',
  titleSize: '16',
  titleLineHeight: '24',
  messageSize: '16',
  messageLineHeight: '24',
};

// Initialize Flatpickr
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDate]) {
    const ms = selectedDate.getTime() - Date.now();
    if (ms > 1000) {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    } else {
      startButton.disabled = true;
      iziToast.error(toastErrorConfig);
    }
  },
});

startButton.addEventListener('click', onStartCountdown);

function onStartCountdown() {
  startButton.disabled = true;
  datetimePicker.disabled = true;

  countdownInterval = setInterval(() => {
    const ms = userSelectedDate.getTime() - Date.now();

    if (ms < 1000) {
      clearInterval(countdownInterval);
      datetimePicker.disabled = false;

      iziToast.success({
        timeout: 4000,
        title: 'Countdown complete',
        message: 'Time is up!',
        titleColor: '#fff',
        messageColor: '#fff',
        backgroundColor: '#59A10D',
        progressBarColor: '#326101',
        position: 'topRight',
        icon: '🎉',
        titleSize: '16',
        messageSize: '16',
      });

      document.querySelector('.timer')?.classList.add('finished');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(ms);
    updateDisplay({ days, hours, minutes, seconds });
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateDisplay({ days, hours, minutes, seconds }) {
  timeValuesArray[0].textContent = addLeadingZero(days);
  timeValuesArray[1].textContent = addLeadingZero(hours);
  timeValuesArray[2].textContent = addLeadingZero(minutes);
  timeValuesArray[3].textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
