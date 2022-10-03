const mongoose = require ('mongoose')

const Schema = new mongoose.Schema({
  blog: {
    type: mongoose.Types.ObjectId,
    ref: 'blogs',
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  stats: {
    view: {
      type: Number,
      default: 0
    },
    like: {
      type: Number,
      default: 0
    }
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

module.exports = mongoose.model('comments', Schema)