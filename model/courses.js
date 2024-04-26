const mongoose = require('mongoose');
//schema create the struture of the data in the database
const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
   
  credit: {
    type: String,
    required: true
  }
}
, { timestamps: true });
// export the schema || the Blog inside the model is the naem of the collection in the database
const Blog = mongoose.model('Course', courseSchema);
// here we export the model in order to use it in the other files sever.js file
module.exports = Blog;
