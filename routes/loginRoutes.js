/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dbFunctions = require('./routeFunctions/dbFunctions.js');
const db = require('./../models');
const { User } = db;

router.route('/')
  .get((req, res) => {
    res.render('./LoginViews/loginPage');
  })
  .post(passport.authenticate('local', {
      successRedirect: '/gallery',
      failureRedirect: '/login'
    }));

router.route('/new')
  .get((req, res) => {
    res.render('./LoginViews/newUserPage');
  })
  .post((req, res) => {
    console.log('made new user!!');
    return User.create({
      username: req.body.username,
      password: req.body.password
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
  });

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/gallery');
  });

module.exports = router;