/* jshint esversion: 6 */
const express = require('express');
const bp = require('body-parser');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./models');
const { Gallery, User } = db;
const galleryRoute = require('./routes/galleryRoutes.js');
const loginRoute = require('./routes/loginRoutes.js');
const methodOverride = require('method-override');

const app = express();

app.use(bp.urlencoded());

app.use(session({
  secret: 'Keyboard Cat'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  (username, password, done) => {
    console.log('client-side-username', username);
    console.log('client-side-password', password);

    User.findOne({
      where : {
        username : username
      }
    }).then((user) => {
      console.log('user exists in DB');
      if (user.password === password) {
        console.log('username and password successful');
        return done(null, user);
      } else {
        console.log('password was incorrect');
        return done(null, false, { message: 'incorrect password' });
      }
    }).catch((err) => {
      console.log('username not found');
      console.log(err);
      return done(null, false, { message: 'incorrect username' });
    });
  }
));


passport.serializeUser((user, done) => {
  console.log('serializing the user into session');
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  console.log('adding user info into the req obj');
  User.find({
    where: {
      id: userId
    }
  }).then((user) => {
    return done(null, {
      id: user.id,
      username: user.username
    });
  }).catch((err) => {
    done(err, user);
  });
});

app.use(express.static('public'));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use('/', galleryRoute);
app.use('/login', loginRoute);

const server = app.listen(PORT, () => {
  db.sequelize.sync();
  console.log(`Server funning on ${PORT}`);
});