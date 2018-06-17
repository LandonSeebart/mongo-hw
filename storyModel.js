const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StorySchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: "String is Required"
  },
  string: {
    type: String,
    trim: true,
    required: "String is Required"
  },
  string: {
    type: String,
    trim: true,
    required: "String is Required"
  },
})