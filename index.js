const bodyParser = require("body-parser");
const express = require("express");
 const path = require('path')

const app = express();
const port = 3000;


//views Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//srt EJS as temple engine for static files
app.use(express.static("public"));
// Parse Fson and url-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


app.get("/", (req, res) => {
  res.render("pages/index");
});
app.post('courses',(req, res)=>{

  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});