const short = require("short-uuid");
const { getData, setData } = require("../db/db");

class User {
  findAll() {
    return getData("users");
  }

  updateAll(data) {
    return setData("users", data);
  }

  findOne(userId) {
    const users = this.findAll();

    return users.find((user) => user.id === userId);
  }

  insertOne(newUser) {
    const users = this.findAll();
    let user = users.find((user) => user.username === newUser.username);

    if (user) {
      return user;
      // throw new Error("username already taken");
    }

    user = {
      id: short.generate(),
      ...newUser,
    };

    this.updateAll([...users, user]);

    return user;
  }

  updateOne(userId, userData) {
    const users = this.findAll();
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, ...userData };
      }

      return user;
    });

    this.updateAll(updatedUsers);
  }
}

const user = new User();

module.exports = user;
