const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  username: String,
  password: {
    type: String,
    required: String,
    trim: true
  },
  update_at: {
    type: Date,
    default: Date.now
  },
  avatar: String, // 头像的url
  // todo: finish the defination of user
});

let User = mongoose.model('userModel', userSchema);

//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

// authenticate
userSchema.statics.authenticate = (email, password, callback) => {
  User.findOne({
    email: email
  }).exec((err, user) => {
    if (err) {
      return callback(err);
    } else if (!user) {
      // user not found
      return callback(new Error('User nor found.'));
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if (res === true) return callback(null, user);
      else return callback(new Error("password wrong."));
    });
  });
};

module.exports = User;

