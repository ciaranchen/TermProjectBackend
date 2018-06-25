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
    required: true,
    trim: true
  },
  create_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    update_at: Date.now,
    default: Date.now
  },
  avatar: String, // 头像的url
  auth: { type: Boolean, required: true, default: false }
});

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
exports.authenticate = (email, password, callback) => {
  UserModel.findOne({
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

let UserModel = mongoose.model('User', userSchema);

exports.UserModel = UserModel;


