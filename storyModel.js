const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StorySchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  link: {
    type: String,
    trim: true,
    required: true
  },
  summary: {
    type: String,
    trim: true,
    required: true
  },
})

const Story = mongoose.model('Story', StorySchema);

module.exports = Story;