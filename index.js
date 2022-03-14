const express = require("express");
const cors = require("cors");
const auth = require("./middlewares/auth");

const userRouter = require("./routes/users");
const connectionRouter = require("./routes/connections");
const channelRouter = require("./routes/channels");
const messageRouter = require("./routes/messages");

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", auth);
app.use("/users", userRouter);
app.use("/connections", connectionRouter);
app.use("/channels", channelRouter);
app.use("/messages", messageRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
