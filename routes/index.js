const express = require("express");
const router = express.Router();
const { note, user } = require("../controllers");

router.get("/notes", note.getAllNotes);
router.get("/notes/all", note.getAllUsersNotes);
router.get("/note", note.getSingleNote);

router.get("/users", user.getAllUsers);

module.exports = router;
