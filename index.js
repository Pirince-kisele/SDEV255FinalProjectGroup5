const express = require("express");

const app = express();
const port = 3000;


//views Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//wildderware for static files
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("pages/index");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
