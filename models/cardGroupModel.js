const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardGroupModel = mongoose.model('CardGroupModel', {
  creator : { type: Schema.Types.ObjectId, ref: 'UserModel', require: true },
  owner   : { type: Schema.Types.ObjectId, ref: 'UserModel', require: true },
  name    : { type: String, require: true },
  major   : {
    type: String,
    require: false,
    enum: [
      '英语', '数学', '历史', '政治', '编程', '法学', '物理', '天文', '经济学', '医学', '机械自动化', '教育学', '公务员', '生物学', '自然科学', '人文', '数据库', '分布式'
    ]},
  create_at: { type: Date, default: Date.now }
});

exports.CardGroupModel = CardGroupModel;