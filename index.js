const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require('mongoose')
const morgan = require('morgan')
const Courses = require('./model/courses')
 const path = require('path')

const app = express();
const port = 3000;
// connection String from the database
const CONNECTION = 'mongodb+srv://liyopirince1992:Miradi32Tembo@blogs.x7sgeik.mongodb.net/SDV255FINALPROJECTDB'

// connect to mongodb
mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(port,()=> {console.log(`server is listening on port ${port}`)}), console.log("connected to mongodb and satrt the server"))
.catch((err) => console.log(err));


//views Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//srt EJS as temple engine for static files
app.use(morgan('dev'))
app.use(express.static("public"));
// Parse Fson and url-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


// links or normal routes those routes help to navigate between pages
app.get("/", (req, res) => {
  res.redirect('/courses') // we redirect every courses we have in courses route to the home page
});

app.get("/addcourse", (req, res) => {
  res.render("pages/addcourse");
});
app.get('/teacher',(req, res)=>{
    res.render('pages/teacher')
  
})


// Courses Route 
// this is the route to get all the course
app.get("/courses", (req, res) =>{
  Courses.find().sort({createdAt: -1})
  .then((result) => res.render('pages/index', {courses: result, title: 'All Courses'}))
  .catch((err) => console.log(err));
})

// create new course in the database and save it in the database
app.post( "/courses",(req, res) =>{
const course = new Courses(req.body);// this is the object that we are going to save in the database
  course.save()
  .then((result) => {
    res.redirect('/courses')
  })
  .catch((err) => {console.log(err)});
  
})
// show indivisual course detailes by fining the id of the blog
app.get("/courses/:id", (req, res) =>{
const id = req.params.id;
  Courses.findById(id)
  .then((result) => {
    res.render('pages/course-details', {course: result, title: 'Blog Details'})})
  .catch((err) => {console.log(err)});
})

// delet blog by id
app.delete('/courses/:id', (req, res) =>{
const id = req.params.id;
  Courses.findByIdAndDelete(id)
  .then((result) => {
    res.json({redirect:'/courses'})
  })
     .catch((err) => {console.log(err)});
})

