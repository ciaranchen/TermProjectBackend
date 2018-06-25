const mongoose = require('mongoose');
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;


// 问题在于用户如果希望插入更多的东西，恐怕会很困难
let CardModel = mongoose.model('userModel', Schema({
  group: {type: Number, ref: 'CardGroupModel'},
  question: String,
  answer: String,
  imageLoc: String,
  imageHash: String,
  fileLoc: String,
  fileHash: String
}));

exports.CardModel = CardModel;
