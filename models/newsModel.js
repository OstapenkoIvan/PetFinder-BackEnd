const { Schema, model } = require('mongoose');

const newsSchema = new Schema({
    title: {
        type: String,
    },
    url: {
        type: String,
        unique: true,
    },
    info: {
        type: String,
    },
    date: {
        type: String,
    },
},
{
  versionKey: false,
  timestamps: true
});

const News = model('News', newsSchema);

module.exports = News;