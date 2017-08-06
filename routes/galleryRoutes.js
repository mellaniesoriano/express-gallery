/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const db = require('../models');
const Gallery = db.Gallery;

// GET /gallery/new to see a "new photo" form
router.route('/gallery/new')
  .get((req, res) => {
    console.log('getting new?');
    res.render('new');
  });

// GET / to view a list of gallery photos
router.route('/')
.get((req, res) => {
  Gallery.findAll()
    .then((allPhotos) => {
      console.log(allPhotos);
      console.log('You got this');
      res.render('index', {allPhotos});
    })
    .catch((err) => {
      console.log(err);
    });
  });


// POST /gallery to create a new gallery photo
router.route('/gallery')
.get((req, res) => {
  Gallery.findAll()
    .then((allPhotos) => {
      console.log(allPhotos);
      console.log('You got this');
      res.render('index', {allPhotos});
    })
    .catch((err) => {
      console.log(err);
    });
  })
.post((req, res) => {
  Gallery.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  })
    .then((data) => {
      console.log(data);
      console.log('created new photo');
      res.redirect('/gallery/');
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
    .then((singlePhoto) => {
      console.log(singlePhoto.id);
      console.log('grabbed photo by id');
      res.render('singlePhoto', {singlePhoto});
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
    returning: true,
    where: {
      id: req.params.id
    }
  })
  .then((data) => {
    console.log(data);
    console.log('putting!!');
    res.end();
  })
  .catch((err) => {
    console.log(err);
  });
})
.delete((req, res) => {
  Gallery.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((data) => {
    console.log(data);
    console.log('deleted!!');
    res.end();
  })
  .catch((err) => {
    console.log(err);
  });
});


module.exports = router;