const mongoose = require("mongoose")

const mongoDb = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/book_sharing")
    .then(() => {
      console.log("Connected to book sharing")
    })
    .catch(err => {
      console.log(err) 
    })
}

module.exports = mongoDb