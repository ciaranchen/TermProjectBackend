const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardGroupModel = mongoose.model('CardGroupModel', {
  creator : { type: Schema.Types.ObjectId, ref: 'UserModel' },
  owner   : { type: Number, ref: 'UserModel' },
  name    : String,
  major   : {
    type: String,
    require: false,
    enum: [
      '文学', '英语', '代码'
    ]},
  create_at: { type: Date, default: Date.now }
});

exports.CardGroupModel = CardGroupModel;