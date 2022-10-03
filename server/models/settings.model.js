const mongoose = require ('mongoose')

const Schema = new mongoose.Schema({
    url: {
        site: {
            type: String,
            default: 'http://127.0.0.1/'
        },
        backend: {
            type: String,
            default: 'http://127.0.0.1:8081/'
        }
    },
    name: {
        type: String
    },
    favicon: {
        type: String
    },
    logo: {
        type: {
            type: String,
            enum: ['logo','text'],
            default: 'logo'
        },
        value: {
            logo: {
                type: String
            },
            text: {
                type: String
            },
        }
    },
    head: {
        title: {
            type: String
        },
        meta: {
            keywords: {
                type: String
            },
            description: {
                type: String
            },
            subject: {
                type: String
            },
        },
        og: {
            title: {
                type: String
            },
            type: {
                type: String
            },
            image: {
                type: String
            },
            site_name: {
                type: String
            },
            description: {
                type: String
            },
        }
    },
    email: {
        title: {
            type: String
        },
        favicon: {
            type: String
        },
        logo: {
            type: String
        },
        url: {
            type: String
        },
    },
    smtp: {
        type: {
            type: String,
            enum: ['smtp'],
            default: 'smtp'
        },
        host: String,
        port: String,
        user: String,
        password: String
    },
    site: {
        blog: {
            profile_pagination: {
                type: Number,
                min: 0,
                default: 9
            },
            home_pagination: {
                type: Number,
                min: 0,
                default: 9
            },
            tag_pagination: {
                type: Number,
                min: 0,
                default: 9
            }
        },
        social: {
            instagram: {
                type: String,
                default: null
            },
            twitter: {
                type: String,
                default: null
            },
            linkedin: {
                type: String,
                default: null
            },
            facebook: {
                type: String,
                default: null
            },
            reddit: {
                type: String,
                default: null
            },
        }
    },
    api: {
        index: {
            display: {
                type: Boolean,
                default: false
            },
            email: {
                type: String
            },
            key: {
                type: String
            }
        },
        redis: {
            url: {
                type: String,
                default: 'redis://127.0.0.1:6379'
            },
            sitemap: {
                display: {
                    type: Boolean,
                    default: true
                },
                ttl: {
                    type: Number,
                    default: 60
                }
            },
            rss: {
                display: {
                    type: Boolean,
                    default: true
                },
                ttl: {
                    type: Number,
                    default: 60
                }
            }
        },
        aws: {
            display: {
                type: Boolean,
                default: false
            },
            bucket: {
                type: String
            },
            region: {
                type: String
            },
            access: {
                type: String
            },
            secret: {
                type: String
            },
            cdn: {
                type: String
            }
        },
        drive: {
            display: {
                type: Boolean,
                default: false
            },
            client: {
                type: String
            },
            secret: {
                type: String
            },
            redirect: {
                type: String
            },
            refresh: {
                type: String
            }
        },
        recommendation: {
            comment: {
                type: Boolean,
                default: true
            },
            blog: {
                type: Boolean,
                default: true
            },
            user: {
                type: Boolean,
                default: true
            }
        },
        custom: {
            js: {
                type: String,
                default: null
            },
            css: {
                type: String,
                default: null
            }
        }
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

module.exports = mongoose.model('settings', Schema)