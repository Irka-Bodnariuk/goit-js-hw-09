'use strict'; //
const throttle = require('lodash.throttle'); //
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// let step = 500;
// let amount = 3;
// let delay = 1000;

const refs = {
  form: document.querySelector('.form'),
  // btn: document.querySelector('button'),
};
// refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.target;
  for (let i = 1; i <= amount; i++) {
    const position = i;
    console.log(position);
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ delay, position });
      } else {
        reject({ delay, position, error: 'Promise error' });
      }
    }, delay);
  });
}
