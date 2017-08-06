/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const db = require('../models');
const Gallery = db.Gallery;

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


module.exports = router;