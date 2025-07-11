const socket = io("http://localhost:8000");
const form = document.getElementById("send-container");
const messageInput = document.getElementById("msgInp");
const messageContainer = document.querySelector(".container");
var audio=new Audio('mixkit-positive-notification-951.wav');

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position === 'left') {
    audio.play();
  }
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = msgInp.value;
  append(`You: ${message}`, 'right');
  socket.emit('send', message);
  msgInp.value = '';
});

const name = prompt("enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
  append(`${name} joined the chat`, 'right');
});
socket.on('receive', data => {
  append(`${data.name} :${data.message}`, 'left');
});
socket.on('left', name => {
  append(`${name} Left the chat`, 'left');
});

