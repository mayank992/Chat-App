const express = require("express");
const path = require("path");
const auth = require("./middlewares/auth");

const userRouter = require("./routes/users");
const connectionRouter = require("./routes/connections");
const channelRouter = require("./routes/channels");
const messageRouter = require("./routes/messages");

const PORT = process.env.PORT || 8080;
const app = express();
const publicDirPath = path.join(__dirname, "./client/build");

app.use(express.json());
app.use(express.static(publicDirPath));

app.use("/", auth);
app.use("/users", userRouter);
app.use("/connections", connectionRouter);
app.use("/channels", channelRouter);
app.use("/messages", messageRouter);

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
