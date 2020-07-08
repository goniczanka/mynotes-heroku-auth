const express = require('express');

const router = express.Router();

const BlogPost = require('../models/BlogPost');

// routes
router.get('/', (req, res) => {
  BlogPost.find({})
    .then((data) => {
      console.log('Data: ', data);
      res.json(data);
    })
    .catch((error) => {
      console.log('Error: ', error);
    });
});

router.post('/save', (req, res) => {
  const data = req.body;

  const newBlogPost = new BlogPost(data);

  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({ msg: "Internal server error."});
      return;
    }
    res.json({ msg: "Data has been sent to the server!" });
  })
})

module.exports = router;