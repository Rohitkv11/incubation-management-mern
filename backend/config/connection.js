const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect('mongodb://localhost:27017/incubationreact', { useNewUrlParser: true, useUnifiedTopology: true })
  .then((_) => {
   console.log("mongoose connected to port 27017");
  })
  .catch((error) => {
    console.log(error);
  });
}
module.exports = connectDatabase 