import express from "express";

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
app.listen(3000, handleListen);
