const { Schema, model } = require('mongoose')

const iotSchema = new Schema(
  {
    temperature: { type: Number, require: true },
    humidity: { type: Number, require: true },
    light: { type: Number, require: true },
    time: { type: String, require: true },
  },
  { timestamps: true,
  },
);

module.exports = model('iotSchema', iotSchema);

