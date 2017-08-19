/* jshint esversion: 6 */
const mongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb://localhost:27017/galleryMeta';

let photoMetas = null;

mongoClient.connect(mongoURL, (err, db) => {
  console.log(db);

  photoMetas = db.collection('photoMetas');
});

module.exports = {
  photoMetas: () => photoMetas
};