// This is the Browser

const messageList = document.querySelector("#messagelist");
const nickList = document.querySelector("#nicklist");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

// front에서 websocket 연결주소 세팅
const socket = new WebSocket(`ws://${window.location.host}`);

// websocket 연결
socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

// 메시지를 받을 때
socket.addEventListener("message", (message) => {
  console.log(message.data);
  const li = document.createElement("li");
  li.innerText = message.data; // 받은 데이터 공개하기~~
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected to Server");
});

const rare = {
  nick: "no_name",
};

// nick을 입력할 때
function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  rare.nick = input.value; // nick input창에 nickname을 입력하면 rare.nick에 덮어씌어진다
  const li = document.createElement("li");
  li.innerText = `nickname : ${input.value}`;
  nickList.append(li);
  input.value = "";
}

// 메시지를 입력할 때
function handleSummit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  rare["message"] = input.value;
  // rare = { nick : "~~~", message : "~~~~~"}
  socket.send(JSON.stringify(rare)); // socket으로 rare 객체를 보내버리기~~~. object를 JSON 문자열로 변환.
  input.value = "";
}

nickForm.addEventListener("submit", handleNickSubmit);
messageForm.addEventListener("submit", handleSummit);
