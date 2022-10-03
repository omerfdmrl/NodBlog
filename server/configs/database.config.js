require('dotenv').config({ path : '../.env' })
const mongoose = require('mongoose')

module.exports = {
  connect () {
    mongoose.connect(`${process.env.PROD_MONGODB}`)
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.log(err))
  },
  mongoose
}