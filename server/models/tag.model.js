const mongoose = require ('mongoose')

const Schema = new mongoose.Schema({
  key: {
    type: String
  },
  count: {
    type: Number,
    min: 0
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

module.exports = mongoose.model('tags', Schema)