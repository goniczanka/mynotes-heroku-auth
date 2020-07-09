const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

const user = {
  getAllUsers: (req, res) => {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        return res.status(500).json("Internal server error.");
      });
  },
  userLogin: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username }).then((user) => {
      if (!user) {
        return res.status(404).json("User does not exist.");
      }
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            const payload = {
              id: user._id,
              username: user.username,
              createdAt: user.createdAt,
            };
            return res.json(payload);
          } else {
            return res.status(403).json("Wrong password.");
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json("Internal server error");
        });
    });
  },
};

module.exports = user;
