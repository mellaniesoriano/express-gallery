/* jshint esversion: 6 */
const dbFunctions = require('./dbFunctions.js');

module.exports = (() => {
  const displayAllPhotos = (req, res) => {
    dbFunctions.getAllPhotos()
      .then((allPhotos) => {
        res.render('index', {allPhotos});
      })
      .catch((err) => {
        console.log('err');
      });
  };

  const postPhoto = (req, res) => {
    dbFunctions.createPhoto(req)
      .then((newPhoto) => {
        res.redirect('/gallery');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getById = (req, res) => {
    dbFunctions.getById(req)
      .then((singlePhoto) => {
        res.render('singlePhoto', {singlePhoto});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editPhoto = (req, res) => {
    dbFunctions.updatePhoto(req)
      .then((data) => {
        console.log('successfully updated photo!');
      })
      .catch((err) => {
        console.log(err);
      });
      res.redirect(`/gallery/${parseInt(req.params.id)}/edit`);
      res.end();
  };

  const deletePhoto = (req, res) => {
    dbFunctions.destroyPhoto(req)
      .then((data) => {
        console.log('* DELETED *', data);
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

  return {
    displayAllPhotos,
    postPhoto,
    getById,
    editPhoto,
    deletePhoto,
    editById
  };
})();