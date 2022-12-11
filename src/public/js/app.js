// This is the Browser

const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

// 메시지를 받을 때
socket.addEventListener("message", (message) => {
  console.log(message.data);
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected to Server");
});

const nickname = {
  type: "nick",
  payload: "no_name",
};

// nick을 입력할 때
function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  nickname.payload = input.value;
  input.value = "";
}

// 메시지를 입력할 때
function handleSummit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  const message = {
    type: "message",
    payload: input.value,
  };
  socket.send(JSON.stringify(`${nickname.payload} : ${message.payload}`));
  input.value = "";
}

nickForm.addEventListener("submit", handleNickSubmit);
messageForm.addEventListener("submit", handleSummit);
