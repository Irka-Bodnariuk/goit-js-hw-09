const refs = {
  stasrtBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let intervalId = null;

refs.stasrtBtn.addEventListener('click', onClickStartBtn);
refs.stopBtn.addEventListener('click', onClickStopBtn);

function onClickStartBtn() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.stasrtBtn.setAttribute('disabled', '');
  refs.stopBtn.toggleAttribute('disabled', '');
}
function onClickStopBtn() {
  clearInterval(intervalId);
  refs.stasrtBtn.toggleAttribute('disabled', '');
  refs.stopBtn.setAttribute('disabled', '');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
