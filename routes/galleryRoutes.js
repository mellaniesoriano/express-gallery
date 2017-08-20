/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const session = require('express-session');
const helpers = require('./routeFunctions/galleryFunctions.js');
const db = require('../models');
const { Gallery, User } = db;

const { photoMetas } = require('../collections/photoMeta.js');

const removeValues = (obj) => {
  for (var key in obj){
    if(obj.hasOwnProperty(key)){
      obj[key] = "";
    }
  }
  return obj;
};


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
        // console.log('PICTURE DATA', picture);
        res.redirect(`/gallery/${req.params.id}/edit`);
      });
  });

router.route('/gallery/:id/edit')
  .get((req, res) => {
    let pictureID = parseInt(req.params.id);
    Gallery.findById(pictureID)
    .then((picture) => {
      // console.log('PICTURE>>', picture);
      let query = { id: pictureID };

      photoMetas().findOne(query, {id:0, _id:0})
        .then((metaData) => {
          // console.log('THIS IS MY QUERY', query);
          // console.log('THIS IS MY DATA>>', metaData);
          res.render('edit', {
            picture: picture.dataValues,
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
      where: {
        id: req.params.id
      }
    })
      .then((metaData) => {
        photoMetas().updateOne({
      id: parseInt(req.params.id)},
      {
        $set: req.body.meta
      });
        photoMetas().update(
          query,{
            $unset:removeValues(metaRemove)
          });
    res.redirect(`/gallery/${req.params.id}/edit`);
      })
      .catch( err => {
        console.log('PUT ERROR', err);
      });
    let pictureID = parseInt(req.params.id);
    let addMeta = req.body.meta;
    let metaRemove = req.body;
    delete metaRemove.author;
    delete metaRemove.description;
    delete metaRemove.link;

    let query = { id: pictureID };
    console.log('query ID', query);
    photoMetas().findOne(query, (err, data) => {
      if(data){
        photoMetas().update(
          query,
          {
            $set: addMeta
          }
        );
        photoMetas().update(
          query,
          {
            $unset: console.log('REMOVING >>>>', removeValues(metaRemove))
          }
        );
      } else {
        let metaObj = req.body.meta;
        metaObj.id = pictureID;
        photoMetas().insertOne(metaObj);
      }
    });

  })
  .delete((req, res) => {
    helpers.deletePhoto(req, res);
  });

router.route('/logout')
  .get((req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

module.exports = router;