const Note = require("../models/NoteModel");

const note = {
  getAllUsersNotes: (req, res) => {
    Note.find({})
      .then((notes) => {
        return res.json(notes);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json("Internal server error.");
      });
  },
  getAllNotes: (req, res) => {
    Note.find({ userID: req.body.userID }) // req.query.id (z url)
      .then((notes) => {
        if (!notes.length) {
          return res.status(404).json("User doesn't have any notes.");
        }
        return res.json(notes);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json("Internal server error.");
      });
  },
  getSingleNote: (req, res) => {
    Note.findOne({ id: req.body.id }) // req.params.id (dane dołączone do axios.get) albo query (url)
      .then((note) => {
        if (!note) {
          return res.status(404).json("Note doesn't exist.");
        }
        return res.json(note);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json("Internal server error.");
      });
  },
};

module.exports = note;
