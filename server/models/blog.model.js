const mongoose = require ('mongoose')
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_');

const Schema = new mongoose.Schema({
  __id: {
    type: String,
    default: shortid.generate()
  },
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    lowercase: true
  },
  image: {
    type: String,
    default: null
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  tag: [{
    type: String
  }],
  resource: [{
    type: String
  }],
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  status: {
    type: String,
    enum: ['draft','pending','published'],
    default: 'draft'
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

module.exports = mongoose.model('blogs', Schema)