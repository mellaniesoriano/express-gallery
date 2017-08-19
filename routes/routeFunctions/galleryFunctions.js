/* jshint esversion: 6 */
const dbFunctions = require('./dbFunctions.js');

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
  };

  const postPhoto = (req, res) => {
    dbFunctions.createPhoto(req)
      .then((newPhoto) => {
        res.redirect('/');
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
    editPhoto,
    deletePhoto,
    editById
  };
})();