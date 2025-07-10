import iziToast from 'izitoast';
import errorSvg from '../img/error.svg';
import sucsessSvg from '../img/bi_check2-circle.svg';

const form = document.querySelector('.form');
const buttonSubmit = document.querySelector('button');

form.addEventListener('change', changeHandler);
form.addEventListener('submit', submitHandler);

let delay;
let promiseFinalStatus;
function changeHandler(event) {
  console.log(event.currentTarget.delay.classList.contains('input-change'));
  delay = event.currentTarget.delay.value;
  promiseFinalStatus = event.currentTarget.state.value;
}

function createPromise(delay, promiseFinalStatus) {
  // Create promise
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseFinalStatus === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise.then(
    value => {
      iziToast.success({
        title: 'OK',
        message: value,
        timeout: '5000',
        messageColor: '#ffffff',
        titleColor: '#fff',
        titleSize: '16',
        titleLineHeight: '24',
        iconUrl: sucsessSvg,
        iconColor: '#fff',
        backgroundColor: '#59A10D',
        progressBarColor: '#326101',
        position: 'topRight',
        messageSize: '16',
        messageLineHeight: '24',
      });
    },
    error => {
      iziToast.error({
        timeout: '5000',
        messageColor: '#ffffff',
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16',
        titleLineHeight: '24',
        message: error,
        iconUrl: errorSvg,
        iconColor: '#fff',
        backgroundColor: '#EF4040',
        progressBarColor: '#B51B1B',
        position: 'topRight',
        messageSize: '16',
        messageLineHeight: '24',
      });
    }
  );
}

function submitHandler(event) {
  event.preventDefault();
  createPromise(delay, promiseFinalStatus);
  form.reset();
}
