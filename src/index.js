const express = require("express");
const path = require("path");
const auth = require("./middlewares/auth");

const usersRouter = require("./routers/users");
const channelsRouter = require("./routers/channels");

const PORT = process.env.PORT || 8080;
const app = express();
const publicDirPath = path.join(__dirname, "../client/build");

app.use(express.json());
app.use(express.static(publicDirPath));

app.use("/", auth);
app.use("/users", usersRouter);
app.use("/channels", channelsRouter);

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
