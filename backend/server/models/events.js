const mongoose = require('mongoose');
const { fixUpdate } = require('../mongo');

const { Schema } = mongoose;

const EventSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  location: {
    type: String,
  },
  comment: {
    type: String,
  },
}, {
  id: false,
  shardKey: {
    _id: 1,
  },
  timestamps: { },
});

EventSchema.index({ start: 1, end: 1 });

EventSchema.plugin(fixUpdate);

module.exports = {
  EventSchema,
  Event: mongoose.model('events', EventSchema),
};
