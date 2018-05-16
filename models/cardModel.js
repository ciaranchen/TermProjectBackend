const mongoose = require('mongoose');

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;


// 问题在于用户如果希望插入更多的东西，恐怕会很困难
const cardSchema = new Schema({
  question: String,
  answer: String,
  // todo: finish the defination of card
  imageLoc: String,
});

module.exports = mongoose.model('userModel', cardSchema);
