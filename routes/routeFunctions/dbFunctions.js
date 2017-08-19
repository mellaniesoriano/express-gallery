/* jshint esversion: 6 */
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require('../../models');
const { Gallery, User } = db;

const saltRounds = 10;

module.exports = (() => {
  const getAllPhotos = () => {
    return Gallery.findAll( {
      order: [ [ 'createdAt', 'DESC' ] ]
    });
  };

  const createPhoto = (req) => {
    return Gallery.create({
      id: req.params.id,
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
      id: req.params.id,
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

  const createUser = (req, res) => {
    console.log('username: ', req.body.username);
    console.log('password: ', req.body.password);

    bcrypt.genSalt(saltRounds)
      .then( salt => {
        bcrypt.hash(req.body.password, salt)
        .then( hash => {
          console.log(hash);

          User.create({
            username: req.body.username,
            password: hash
          }).then( () => {
            console.log('inserted new user!');
            res.end();
          }).catch( err => {
            console.log(err);
          });
        });
      }).catch( err => {
        console.log(err);
      });
      res.redirect('/');
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