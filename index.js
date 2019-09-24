const throng = require("throng");
const { appInit } = require("./helpers/express");
const Post = require("./models/PostModel");
const { mongooseConnect } = require("./helpers/mongoose");

const port = process.env.PORT || 8080;
const workers = process.env.WEB_CONCURRENCY || 1;
throng({ workers, lifetime: Infinity }, async () => {
  await mongooseConnect();

  const app = appInit();
  const listener = app.listen(port, () => {
    console.log("API SERVER");
    console.log(`Running on port ${port}`);
    console.log("Enter Ctrl + C to stop");
  });

  let io = require("socket.io")(listener);
  let userList = new Set();
  io.on("connection", client => {
    client.on("join", data => {
      const newUser = { socketId: client.id, ...data };
      userList.add(newUser);
      io.sockets.emit("updateUsers", [...userList]);
    });
    client.on("checkUsers", coworkerCount => {
      if (coworkerCount.length !== userList.size) {
        io.sockets.emit("updateUsers", [...userList]);
      }
    });
    client.on("manual-disconnect", async () => {
      let user;
      await userList.forEach(x => {
        if (x.socketId === client.id) {
          user = x;
          userList.delete(x);
        }
      });
      io.sockets.emit("updateUsers", [...userList]);
      if (
        !userList.size ||
        ![...userList].some(x => x.username === user.username)
      ) {
        const post = await Post.findOne({
          username: user.username,
          isActive: true
        });
        const end = new Date();
        // update post to no longer be active, note the end date and time, and calculate duration in milliseconds minus the 20 second delay
        await Post.findOneAndUpdate(
          { _id: post._id },
          {
            isActive: false,
            end,
            duration: end.getTime() - post.start.getTime()
          }
        );
        io.sockets.emit("confirmManualDisconnect");
      }
    });
    client.on("disconnect", async () => {
      let isActive = false;
      let user;
      await userList.forEach(x => {
        if (x.socketId === client.id) {
          user = x;
          isActive = true;
          userList.delete(x);
        }
      });
      if (isActive) {
        io.sockets.emit("updateUsers", [...userList]);
        setTimeout(async () => {
          io.sockets.emit("checkForUser", user.username);
          setTimeout(async () => {
            if (![...userList].some(x => x.username === user.username)) {
              const post = await Post.findOne({
                username: user.username,
                isActive: true
              });
              const end = new Date();
              // update post to no longer be active, note the end date and time, and calculate duration in milliseconds minus the 20 second delay
              await Post.findOneAndUpdate(
                { _id: post._id },
                {
                  isActive: false,
                  end,
                  duration: end.getTime() - post.start.getTime() - 20000
                }
              );
            }
          }, 5000);
        }, 15000);
      }
    });
  });
});
