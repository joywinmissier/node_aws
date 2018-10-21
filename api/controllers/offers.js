var mongoose = require("mongoose");
var Offers = mongoose.model("OfferModel");

module.exports.offersRead = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      message: "UnauthorizedError: private profile"
    });
  } else {
    Offers.find().exec(function(err, user) {
      res.status(200).json(user);
    });
  }
};

module.exports.updateOffer = function(req, res) {
  Offers.findByIdAndUpdate(req.params.id, req.body, {new: true},function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
};

module.exports.registerOffer = function(req, res) {
  var offerObject = new Offers();

  offerObject.shopname = req.body.shopname;
  offerObject.description = req.body.description;
  offerObject.price = req.body.price;
  offerObject.offerpercent = req.body.offerpercent;

  offerObject.save(function(err) {
    if (err) {
      // if (err.name === "MongoError" && err.code === 11000) {
      //   // Duplicate username
      //   return res
      //     .status(500)
      //     .send({ succes: false, message: "User already exist!" });
      // }

      // Some other error
      return res.status(500).send(err);
    }

    var token;
    token = offerObject.generateJwt();
    res.status(200);
    res.json({
      token: token
    });
  });
};
