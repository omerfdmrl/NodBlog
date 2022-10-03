const mongoose = require ('mongoose')

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  permission: {
    type: [String],
    enum: [
      'login-site','register-site',
      'admin-get-settings', 'admin-save-settings',
      'admin-get-menu','admin-save-menu',
      'admin-get-user','admin-save-user',
      'admin-login-as',
      'admin-get-role','admin-save-role',
      'admin-get-group','admin-save-group',
      'admin-get-report', 'admin-save-report',
      'site-blog-like', 'site-blog-report',
      'site-blog-dislike',
      'site-comment-add', 'site-comment-like',
      'site-comment-report', 'panel-blog-list',
      'panel-blog-add', 'panel-blog-edit',
      'panel-blog-save', 'panel-blog-delete',
      'panel-user-edit', 'site-profile-follow'
    ]
  },
  default: {
    type: Boolean
  },
  banned: {
    type: Boolean
  },
  image: {
    type: String
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

module.exports = mongoose.model('roles', Schema)