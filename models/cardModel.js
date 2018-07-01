const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// 问题在于用户如果希望插入更多的东西，恐怕会很困难
let CardModel = mongoose.model('CardModel', Schema({
  group: {type: Schema.Types.ObjectId, ref: 'CardGroupModel'},
  question: String,
  answer: String,
  imageLoc: String,
}));

exports.CardModel = CardModel;
