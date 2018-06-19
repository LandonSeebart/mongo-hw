// Dependencies
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const request = require('request');
const cheerio = require('cheerio');
const exphbs = require('express-handlebars');

// Initialize Express
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

// Database configuration
const Story = require('./models/Story');
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Handlebars stuff
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Get scraper function
const fetchStories = require('./fetchStories')

// Routes
// Display all articles in DB
app.get('/', async function(req, res) {

  const stories = await fetchStories();

  Story.create(stories, (err, docs) => {
    if (err) console.log(err)

    Story.find({}, (err, stories) => {
      res.render('index', {stories: stories}) 
    });
  });
});

//
app.get("/articles/:id", function(req, res) {
  const { id } = req.params;

  Story.findById(id, (err, story) => {
    if (err) throw err
    res.render('article', {
      id: req.params.id, 
      story: story
    });
  });
});

app.post("/articles/:id", function(req, res) {
  const { id } = req.params;
  const { comment } = req.body;

  Story.update(
    {_id: id},
    {$push: {comments: comment}},
    function(err){
      if (err) throw err;
      res.redirect(`/articles/${id}`)
    }
 )
});

// Listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log('App running on port 3000!');
});
