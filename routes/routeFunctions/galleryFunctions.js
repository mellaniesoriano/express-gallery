/* jshint esversion: 6 */
const dbFunctions = require('./dbFunctions.js');

const db = require('../../models');
const { Gallery, User } = db;

const { photoMetas } = require('../../collections/photoMeta.js');

module.exports = (() => {
  const displayAllPhotos = (req, res, views) => {
    dbFunctions.getAllPhotos()
      .then((allPhotos) => {
        res.render(views, {
          allPhotos,
          user: req.user,
          id: req.params.id
        });
      })
      .catch((err) => {
        console.log('err');
      });

      photoMetas().find().toArray()
      .then(metas => {
        console.log(metas);
      })
      .catch( err => {
        console.log(err);
      });
    };

  const postPhoto = (req, res) => {
    dbFunctions.createPhoto(req)
      .then((data) => {
      Gallery.findAll({
        limit: 1,
        order: [['createdAt', 'DESC']]
      })
      .then((item) => {
        console.log('*** ITEM >> ', item[0].id);
        console.log(req.body.meta);
        let metaObj = req.body.meta;
        metaObj.id = item[0].id;

        photoMetas().insertOne(metaObj);
      })
      .catch((err) => {
        console.log(err);
      });
      res.redirect('/');
    })
      .catch((err) => {
        console.log(err);
      });
  };

  const editPhoto = (req, res) => {
    dbFunctions.updatePhoto(req)
      .then((metaData) => {
        photoMetas().updateOne({
          id: parseInt(req.params.id)},
          {
            $set: req.body.meta
          });
        photoMetas().update(
          query,{
            $unset: dbFunctions.removeValues(metaRemove)
          });
        res.redirect('edit');
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
              $unset: dbFunctions.removeValues(metaRemove)
            }
            );
        } else {
          let metaObj = req.body.meta;
          metaObj.id = pictureID;
          photoMetas().insertOne(metaObj);
        }
      });
    };

  const deletePhoto = (req, res) => {
    dbFunctions.destroyPhoto(req)
      .then((data) => {
        let pictureID = parseInt(req.params.id);
        photoMetas().findOneAndDelete({id:pictureID});
        res.redirect('/');
        res.end();
      })
      .catch((data) => {
        console.log(err);
      });
    };

  const editById = (req, res) => {
    dbFunctions.getById(req)
      .then((editPhoto) => {
        res.render('edit', {editPhoto});
      })
      .catch((err) => {
        console.log(err);
      });
    };

  const getPhotoById = (req, res) => {
    dbFunctions.getById(req)
      .then((picture) => {
        res.redirect(`/gallery/${req.params.id}/edit`);
      });
    };

  const getEditPhotoId = (req, res) => {
    dbFunctions.getById(req)
      .then((picture) => {
        let query = { id: parseInt(req.params.id) };
        photoMetas().findOne(query, {id:0, _id:0})
          .then((metaData) => {
            res.render('edit', {
              picture: picture.dataValues,
              metaData: metaData
            });
          });
        })
      .catch((err) => {
        console.log(err);
      });
    };

  return {
    displayAllPhotos,
    postPhoto,
    editPhoto,
    deletePhoto,
    editById,
    getPhotoById,
    getEditPhotoId
  };
})();