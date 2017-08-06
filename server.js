/* jshint esversion: 6 */
const express = require('express');
const bp = require('body-parser');
const PORT = process.env.PORT || 3000;
const db = require('./models');