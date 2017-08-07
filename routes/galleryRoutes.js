/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const helpers = require('./routeFunctions/galleryFunctions.js');


router.route('/gallery/new')
  .get((req, res) => {
    res.render('new');
  });

router.route('/')
  .get((req, res) => {
    helpers.displayAllPhotos(req, res);
  });

router.route('/gallery')
  .get((req, res) => {
    helpers.displayAllPhotos(req, res);
  })
  .post((req, res) => {
    helpers.postPhoto(req, res);
  });

router.route('/gallery/:id')
  .get((req, res) => {
    helpers.getById(req, res);
  })
  .put((req, res) => {
    helpers.editPhoto(req, res);
  })
  .delete((req, res) => {
    helpers.deletePhoto(req, res);
  });

router.route('/gallery/:id/edit')
  .get((req, res) => {
    helpers.editById(req, res);
  });


module.exports = router;