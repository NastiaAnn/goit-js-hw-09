function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.body;

stopBtn.setAttribute('disabled', '');
let timerId = null;

startBtn.addEventListener('click', event => {
  event.currentTarget.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled');
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  stopBtn.setAttribute('disabled', '');
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
});
