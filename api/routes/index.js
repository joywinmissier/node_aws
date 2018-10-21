var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var offersDetails = require('../controllers/offers');

//offers
router.get('/offers', auth, offersDetails.offersRead);

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//registerOffer Admin Panel
router.post('/registerOffer', offersDetails.registerOffer);

//updateOffer Admin Panel
router.put('/updateOffer/:id', auth, offersDetails.updateOffer);

module.exports = router;
