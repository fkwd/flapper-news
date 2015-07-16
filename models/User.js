var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jwt');

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true},
  hash: String,
  salt: String
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64);
};

UserSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64);

  return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
  // set expiration to 60 days
  var today = new Date();
  var expr = new Date(today);
  expr.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    expr: parseInt(expr.getTime() / 1000)
  }, 'SECRET');
};

mongoose.model('User', UserSchema);
