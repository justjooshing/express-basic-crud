const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const members = require("./Members.json");
// const logger = require("./middleware/logger");

const app = express();

// Init middleware
// app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Homepage route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
    members,
  })
);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
