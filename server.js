// Dependencies
const express = require("express");
const mongoose = require('mongoose');
const request = require("request");
const cheerio = require("cheerio");
const exphbs = require("express-handlebars");

// Initialize Express
const app = express();

// Database configuration
const Story = require("./storyModel.js");
mongoose.connect("mongodb://localhost/scraper");

// Handlebars stuff
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Get scraper function
const fetchStories = require('./fetchStories')

// Routes
app.get("/", async function(req, res) {

  const stories = await fetchStories();

  Story.create(stories, (err, docs) => {
    if (err) console.log(err)

    Story.find({}, (err, stories) => {
      res.render("index", {story: stories}) 
    });
  });
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
