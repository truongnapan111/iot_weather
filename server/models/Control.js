const { Schema, model} = require('mongoose')

const ControlSchema = new Schema(
  {
    message: { require: true, type: String },
    topic: { require: true, type: String },
    time: { require: true, type: String },
    state: { require: true, type: String },
    name: { require: true, type: String },
  },
  { timestamps: true },
);

module.exports = model('ControlSchema', ControlSchema)