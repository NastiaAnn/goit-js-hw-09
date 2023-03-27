import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  timeInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysField: document.querySelector('span[data-days]'),
  hoursField: document.querySelector('span[data-hours]'),
  minField: document.querySelector('span[data-minutes]'),
  secField: document.querySelector('span[data-seconds]'),
};
let timerId = null;
refs.startBtn.addEventListener('click', handleStartTimer);
refs.startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      window.alert('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  },
};

flatpickr(refs.timeInput, options);

function handleStartTimer() {
  const selectedDateTime = flatpickr.parseDate(
    refs.timeInput.value,
    'Y-m-d H:i'
  );
  timerId = setInterval(() => {
    refs.startBtn.setAttribute('disabled', '');
    const currentTime = new Date();
    const deltaTime = selectedDateTime - currentTime;
    if (deltaTime <= 0) {
      clearInterval(timerId);
      return;
    }
    const time = convertMs(deltaTime);
    updateClockface(time);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysField.textContent = `${days}`;
  refs.hoursField.textContent = `${hours}`;
  refs.minField.textContent = `${minutes}`;
  refs.secField.textContent = `${seconds}`;
}
