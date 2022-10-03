const mongoose = require ('mongoose')

const Schema = new mongoose.Schema({
  blog: {
    type: mongoose.Types.ObjectId,
    ref: 'blogs'
  },
  comment: {
    type: mongoose.Types.ObjectId,
    ref: 'comments'
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'users'
  },
  reason: {
    type: String,
    enum: ['spam','against_community_rules','rules_violation'],
    default: 'spam'
  },
  status: {
    type: String,
    enum: ['active','pending','solved'],
    default: 'active'
  },
  created_at : {
    type : Date
  },
  updated_at : {
      type : Date
  }
})

Schema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  return next()
})

module.exports = mongoose.model('reports', Schema)