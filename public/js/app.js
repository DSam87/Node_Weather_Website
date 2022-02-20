const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const firstMessage = document.querySelector('.first');
const lastMessage = document.querySelector('.last');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  firstMessage.textContent = 'Loading...';
  firstMessage.textContent = '';
  lastMessage.textContent = '';
  let location = search.value;

  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        firstMessage.innerHTML = data.error;
      } else {
        firstMessage.innerHTML = data.location;
        lastMessage.innerHTML = data.forecast;
      }
    });
  });
});
