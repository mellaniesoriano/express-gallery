/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const session = require('express-session');
const helpers = require('./routeFunctions/galleryFunctions.js');
const db = require('../models');
const { Gallery, User } = db;

const { photoMetas } = require('../collections/photoMeta.js');

router.route('/gallery/new')
  .get((req, res) => {
    res.render('new');
  });

router.route('/')
  .get((req, res) => {
    helpers.displayAllPhotos(req, res, 'index');
  });

router.route('/gallery')
.get((req, res) => {
    helpers.displayAllPhotos(req, res, 'index');
  })
  .post((req, res) => {
    helpers.postPhoto(req, res);
  });

router.route('/gallery/:id')
  .get((req, res) => {
    Gallery.findById(parseInt(req.params.id))
      .then(picture => {
        console.log('PICTURE DATA', picture);
        res.redirect(`/gallery/${req.params.id}/edit`);
      });
  });

router.route('/gallery/:id/edit')
  .get((req, res) => {
    let pictureID = parseInt(req.params.id);
    Gallery.findById(pictureID)
    .then((picture) => {
      console.log('PICTURE>>', picture);
      let query = { id: pictureID };

      photoMetas().findOne(query, {id:0, _id:0})
        .then((metaData) => {
          console.log('THIS IS MY QUERY', query);
          console.log('THIS IS MY DATA>>', metaData);
          res.render('edit', {
            picture: picture,
            metaData: metaData
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
  })
  .put((req, res) => {
    Gallery.update({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    }, {
      // returning: true,
      where: {
        id: req.params.id
      }
    })
      .then((metaData) => {
        console.log('***META DATA***', metaData);
        photoMetas().updateOne({
      id: parseInt(req.params.id)},
      {
        $set: req.body.meta
      });
        console.log('CHECKING META DATA', req.body.meta);
    console.log('WHAT IS MY ID??? >>>>', req.params.id);
    res.redirect(`/gallery/${req.params.id}/edit`);
      })
      .catch( err => {
        console.log('PUT ERROR', err);
      });
  });

router.route('/logout')
  .get((req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

module.exports = router;