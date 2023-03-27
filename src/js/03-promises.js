const refs = {
  delayInput: document.querySelector('input[name="delay"]'),
  delayStepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', handlePromiseCreation);

let amount = null;
let firstDelay = null;
let delayStep = null;
// function that creates and returns one promise

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, (firstDelay += delayStep));
  });
}

function handlePromiseCreation(event) {
  event.preventDefault();

  amount = Number(refs.amountInput.value);
  firstDelay = Number(refs.delayInput.value);
  delayStep = Number(refs.delayStepInput.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  refs.form.reset();
}
