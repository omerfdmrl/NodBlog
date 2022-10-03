const mongoose = require ('mongoose')

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  href: {
    type: {
      type: String,
      enum: ['url','router']
    },
    value: {
      type: String,
      required: true
    },
    target: {
      type: String,
      enum: ['_self','_blank']
    },
    params: String
  },
  icon: String,
  menu: {
    type: String,
    enum: ['header','footer','left']
  },
  parent: {
    type: mongoose.Types.ObjectId,
    ref: 'menus'
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

module.exports = mongoose.model('menus', Schema)