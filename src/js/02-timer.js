import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const timerRef = document.querySelector('.timer');
const inputRef = document.querySelector('#datetime-picker');
let scheduledDate = null;

const options = {
  enableTime: true, //Вмикає засіб вибору часу
  time_24hr: true, //Відображає засіб вибору часу в 24-годинному режимі без вибору AM/PM, якщо ввімкнено
  defaultDate: new Date(), //Встановлює початкові вибрані дати.
  minuteIncrement: 1, //Регулює крок для введення хвилин (включно з прокручуванням)
  onClose(selectedDates) {
    scheduledDate = selectedDates[0].getTime();
    if (scheduledDate < Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    } else {
      startBtnRef.toggleAttribute('disabled');
    }
  }, //Функції, які запускаються щоразу, коли календар закривається
};

flatpickr('#datetime-picker', options).clear();

const startBtnRef = document.querySelector('[data-start]');
startBtnRef.setAttribute('disabled', false);
startBtnRef.addEventListener('click', clickBtn);

const timer = {
  intervalId: null,
  refs: {},

  start(rootSelector, deadline) {
    this.getRefs(rootSelector);
    this.intervalId = setInterval(() => {
      const ms = deadline - Date.now();

      if (ms <= 1000) {
        clearInterval(this.intervalId);
      }

      const data = this.convertMs(ms);
      this.refs.days.textContent = this.addLeadinZero(data.days);
      this.refs.hours.textContent = this.addLeadinZero(data.hours);
      this.refs.minutes.textContent = this.addLeadinZero(data.minutes);
      this.refs.seconds.textContent = this.addLeadinZero(data.seconds);
    }, 1000);
  },

  getRefs(rootSelector) {
    this.refs.days = rootSelector.querySelector('[data-days]');
    this.refs.hours = rootSelector.querySelector('[data-hours]');
    this.refs.minutes = rootSelector.querySelector('[data-minutes]');
    this.refs.seconds = rootSelector.querySelector('[data-seconds]');
  },
  convertMs(ms) {
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
  },
  addLeadinZero(value) {
    return String(value).padStart(2, '0');
  },
};

function clickBtn() {
  timer.start(timerRef, scheduledDate);
  startBtnRef.setAttribute('disabled', false);
  inputRef.setAttribute('disabled', false);
}
