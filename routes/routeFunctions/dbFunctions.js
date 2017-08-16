/* jshint esversion: 6 */
const session = require('express-session');
const db = require('../../models');
const { Gallery, User } = db;

module.exports = (() => {
  const getAllPhotos = () => {
    return Gallery.findAll( {
      order: [ [ 'createdAt', 'DESC' ] ]
    });
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

  const createUser = (req) => {
    return User.create({
      username: req.body.username,
      password: req.body.password
    });
  };

  const logoutUser = (req) => {
    req.session.destroy();
  };

  return {
    getAllPhotos,
    createPhoto,
    getById,
    updatePhoto,
    destroyPhoto,
    createUser,
    logoutUser
  };
})();