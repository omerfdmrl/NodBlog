const mongoose = require ('mongoose')
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_');

const Schema = new mongoose.Schema({
  __id: {
    type:  String
  },
  slug: {
    type: String
  },
  blog: {
    type: mongoose.Types.ObjectId,
    ref: 'blogs'
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

module.exports = mongoose.model('redirects', Schema)