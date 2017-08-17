/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const session = require('express-session');
const helpers = require('./routeFunctions/galleryFunctions.js');

router.route('/gallery/new')
  .get((req, res) => {
    res.render('new');
  });

router.route('/')
  .get((req, res) => {
    helpers.displayAllPhotos(req, res, 'index');
  });

router.route('/gallery')
  .post((req, res) => {
    helpers.postPhoto(req, res);
  });

router.route('/gallery/:id')
  .get((req, res) => {
    helpers.displayAllPhotos(req, res, 'singlePhoto');
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

router.route('/logout')
  .get((req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

module.exports = router;