import http from "http";
import express from "express";
import WebSocket from "ws";

const app = express();

// console.log("Hello~!!");
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/", express.static(__dirname + "/public"));
app.get("/", (req, res, next) => {
  res.render("home");
});
app.get("/*", (req, res, next) => {
  res.redirect("/");
});

const handleListen = () => {
  console.log("Listening on http://localhost:3100");
};

// app.listen(3000, handleListen);

/* 
app.listen = function() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
*/

// http 서버를 server 라는 변수에 담기 위해 app.listen 메소드 내부 코드 중 일부를 굳이 표현
const server = http.createServer(app);

// web socket 서버를 http 서버와 동일한 포트에서 열기 위해 http 서버를 변수 server에 담았고, 그 server에 web socket도 같이 띄움.
const wss = new WebSocket.Server({ server });

const allMember = [];

wss.on("connection", (socket) => {
  allMember.push(socket);
  console.log("Connected to the Browser");
  socket.on("close", () => {
    console.log("Disconnected to the Brwoser");
  });
  socket.on("message", (message) => {
    const stringMessage = JSON.parse(message); // socket으로 (front에서 보낸 rare객체를) message로 받아버리기~~. JSON 문자열을 object로 변환.
    console.log(stringMessage);
    allMember.forEach((all) =>
      all.send(`${stringMessage.nick} : ${stringMessage.message}`) // 받은 메시지의 nick과 message를 모든 사람들에게 보내버리기~~
    );
  });
});

server.listen(3100, handleListen);
