/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const db = require('../models');
const Gallery = db.Gallery;

// GET / to view a list of gallery photos
router.route('/')
.get((req, res) => {
  Gallery.findAll()
    .then((photos) => {
      console.log(photos);
      console.log('You got this');
      res.json();
    })
    .catch((err) => {
      console.log(err);
    });
  });

// GET /gallery/:id to see a single gallery photo
// each gallery photo should include a link to delete this gallery photo
// each gallery photo should include a link to edit this gallery photo
router.route('/gallery/:id')
  .get((req, res) => {
    Gallery.findById(parseInt(req.params.id))
      .then((photo) => {
        console.log(photo);
        console.log('grabbed photo by id');
        res.end();
      })
      .catch((err) => {
        console.log(err);
      });
  });

// POST /gallery to create a new gallery photo
router.route('/gallery')
  .post((req, res) => {
    Gallery.create({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    })
    .then((data) => {
      console.log(data);
      console.log('created new photo');
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
  });


module.exports = router;