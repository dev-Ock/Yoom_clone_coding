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
  console.log("Listening on http://localhost:3000");
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
    const stringMessage = JSON.parse(message);
    console.log(stringMessage);
    // switch (stringMessage.type) {
    //   case "nick":
    //     const nickname = stringMessage.payload;

    //   case "message":
    //     const content = stringMessage.payload;

    // }

    allMember.forEach((all) => all.send(stringMessage));
  });
});

server.listen(3000, handleListen);
