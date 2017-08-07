/* jshint esversion: 6 */
const db = require('../../models');
const Gallery = db.Gallery;

module.exports = (() => {
  const getAllPhotos = () => {
    return Gallery.findAll();
  };

  const createPhoto = (req) => {
    return Gallery.create({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    });
  };

  const getById = (req) => {
    return Gallery.findById(parseInt(req.params.id));
  };

  const updatePhoto = (req) => {
    return Gallery.update({
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    }, {
      returning: true,
      where: {
        id: req.params.id
      }
    });
  };

  const destroyPhoto =(req) => {
    return Gallery.destroy({
      where: {
        id: req.params.id
      }
    });
  };

  return {
    getAllPhotos,
    createPhoto,
    getById,
    updatePhoto,
    destroyPhoto
  };
})();