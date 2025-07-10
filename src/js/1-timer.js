import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import errorSvg from '../img/error.svg';

const button = document.querySelector('button');
button.addEventListener('click', clickHandler);

let userSelectedDate;
let ms;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    ms = userSelectedDate.getTime() - Date.now();
    if (ms > 1000) {
      button.disabled = false;
    } else {
      button.disabled = true;
      iziToast.error({
        timeout: '5000',
        messageColor: '#ffffff',
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16',
        titleLineHeight: '24',
        message: 'Please choose a date in the future',
        iconUrl: errorSvg,
        iconColor: '#fff',
        backgroundColor: '#EF4040',
        progressBarColor: '#B51B1B',
        position: 'topRight',
        messageSize: '16',
        messageLineHeight: '24',
      });
    }
  },
};

const datetimePicker = document.getElementById('datetime-picker');
flatpickr(datetimePicker, options);

datetimePicker.addEventListener('input', inputHandler);

const timeValuesArray = document.getElementsByClassName('value');

function clickHandler() {
  button.disabled = true;
  datetimePicker.disabled = true;

  const intervalId = setInterval(
    () => {
      ms = userSelectedDate.getTime() - Date.now();
      convertMs(ms);
      const { days, hours, minutes, seconds } = convertMs(ms);
      timeValuesArray[0].textContent = addLeadingZero(days);
      timeValuesArray[1].textContent = addLeadingZero(hours);
      timeValuesArray[2].textContent = addLeadingZero(minutes);
      timeValuesArray[3].textContent = addLeadingZero(seconds);
      if (ms < 1000) {
        clearInterval(intervalId);
        datetimePicker.disabled = false;
      }
      datetimePicker.classList.remove('input-change');
    },
    1000,
    ms
  );
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function inputHandler(event) {
  event.target.classList.add('input-change');
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
