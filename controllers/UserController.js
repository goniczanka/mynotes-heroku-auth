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
};

module.exports = user;
