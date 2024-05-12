const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Courses = require("./model/courses");
const path = require("path");
const dotenv = require("dotenv");
const { error } = require("console");
const authRoutes = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./middleware/AuthMiddleware");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;
// connection String from the database
const CONNECTION =
  "mongodb+srv://liyopirince1992:Miradi32Tembo@blogs.x7sgeik.mongodb.net/SDV255FINALPROJECTDB";
// require the dotenv en config it for it to work when we run the npm start
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// connect to mongodb
mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    (result) =>
      app.listen(PORT, () => {
        console.log(`server is listening on port ${PORT}`);
      }),
    console.log("connected to mongodb and satrt the server"),
  )
  .catch((err) => console.log(err.message));

//views Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//srt EJS as temple engine for static files
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cookieParser());

// Parse Fson and url-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.get("*", checkUser);
app.get('/', (req, res) => {
  res.render('home');
})
//app.get("/", (req, res) => res.redirect("courses"));
app.get("/index", requireAuth, (req, res) => res.render("pages/index"));
// links or normal routes those routes help to navigate between pages
app.get("/addcourse", requireAuth, (req, res) => res.redirect("/courses") // we redirect every courses we have in courses route to the home page
);
app.get("/teacher", requireAuth, (req, res) => {
  res.render("pages/teacher");
});
app.use(authRoutes);








app.get("/courses/:id/updatecourse", (req, res) => {
  res.render("pages/updatecourse");
});

// Courses Route
// this is the route to get all the course that was created
app.get("/courses", (req, res) => {
  Courses.find()
    .sort({ createdAt: -1 })
    .then((result) =>
      res.render("pages/addcourse", { courses: result, title: "All Courses" }),
    )
    .catch((err) => console.log(err));
});

// create new course in the database and save it in the database
app.post("/courses", (req, res) => {
  const course = new Courses(req.body); // this is the object that we are going to save in the database
  course
    .save()
    .then((result) => {
      res.redirect("/courses");
    })
    .catch((err) => {
      console.log(err);
    });
});
// show indivisual course detailes by fining the id of the blog
app.get("/courses/:id", (req, res) => {
  const id = req.params.id;
  Courses.findById(id)
    .then((result) => {
  
         res.render("pages/course-details", {
        course: result,
        title: "Course Details",
      })
       
     
    })
    .catch((err) => {
      console.log(err);
    });
});

// delet blog by id
app.delete("/courses/:id", (req, res) => {
  const id = req.params.id;
  Courses.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        res.status(404).json({ error: "course not found" });
      } else {
        res.json({ redirect: "/courses" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" }), console.log(err);
    });
});

// update course
app.put("/courses/:id/", (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  console.log(updateData);
  Courses.replaceOne({ _id: id }, updateData)

    .then((result) => {
      res
        .status(304)
        .json({ updatedCount: result.modifiedCount }, { redirect: "/courses" });
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
