/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dbFunctions = require('./routeFunctions/dbFunctions.js');

router.route('/')
  .get((req, res) => {
    res.render('./LoginViews/loginPage');
  })
  .post(passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

router.route('/new')
  .get((req, res) => {
    res.render('./LoginViews/newUserPage');
  })
  .post((req, res) => {
    dbFunctions.createUser(req, res);
  });

router.route('/logout')
  .get((req, res) => {
    dbFunctions.logoutUser(req);
    res.redirect('/');
  });

module.exports = router;