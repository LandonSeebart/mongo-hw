// Dependencies
const express = require("express");
const mongojs = require("mongojs");
const request = require("request");
const cheerio = require("cheerio");

// Initialize Express
const app = express();

// Database configuration
const databaseUrl = "scraper";
const collections = ["scrapedData"];
const db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

//Get scraper function
const fetchStories = require('./fetchStories')

app.get("/", async function(req, res) {
  const stories = await fetchStories();
  // Story.create(stories, (err, docs) => {
    // if (err) throw err
    // Story.find({}, (err, stories) => { res.send(handblards(stories))})
  // })
  res.send("Hello world");
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
