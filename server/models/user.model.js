const mongoose = require ('mongoose')
const bcrypt = require('bcrypt')

const Schema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  about: {
    type: String
  },
  social: {
    instagram: String,
    linkedin: String,
    facebook: String,
    twitter: String
  },
  image: {
    type : String,
    default: '/assets/img/illustrations/profiles/profile-1.png'
  },
  role: {
    type: mongoose.Types.ObjectId,
    ref: 'roles'
  },
  group: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'groups'
    }
  ],
  verify: {
    code : String,
    at : Date,
    send : Date
  },
  forgot_password: {
    code : String,
    at : Date,
    send : Date
  },
  notification: {
    email: {
      status: {
        type: Boolean,
        default: true
      },
      failed_login_attempt: {
        type: Boolean,
        default: true
      }
    }
  },
  fac: {
    type: {
      type: String,
      enum: ['off','email'],
      default: 'off'
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
  const user = this
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  if (this.isModified('password') || this.isNew) {
    bcrypt.hash(user.password, 10, (error, hash) => {
      if (error) {
        return next(error)
      }
      user.password = hash
      next()
    })
  } else {
    return next()
  }
})


module.exports = mongoose.model('users', Schema)