/* jshint esversion: 6 */
const express = require('express');
const bp = require('body-parser');
const PORT = process.env.PORT || 3000;
const db = require('./models');
const Gallery = db.Gallery;
const galleryRoute = require('./routes/galleryRoutes.js');

const app = express();

app.use('/', galleryRoute);

const server = app.listen(PORT, () => {
  db.sequelize.sync();
  console.log(`Server funning on ${PORT}`);
});