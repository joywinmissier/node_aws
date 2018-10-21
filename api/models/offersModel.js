var mongoose = require( 'mongoose' );
var jwt = require('jsonwebtoken');

var offerSchema = new mongoose.Schema({
    shopname : {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price : {
        type: Number,
        required: true
      },
      offerpercent : {
        type: Number,
        required: true
      }
  });

  offerSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      shopname: this.shopname,
      description: this.description,
      price: this.price,
      offerpercent: this.offerpercent,
      exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };
  
  mongoose.model('OfferModel', offerSchema);

