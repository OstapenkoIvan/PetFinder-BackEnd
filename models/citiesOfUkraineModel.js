const { Schema, model } = require('mongoose');

const citiesOfUkraineSchema = new Schema({
    city: {
        type: String,
    },
    lat: {
        type: String,
        unique: true,
    },
    lng: {
        type: String,
    },
    country: {
        type: String,
    },
    iso2: {
        type: String,
    },
    admin_name: {
        type: String,
    },
    capital: {
        type: String,
    },
    population: {
        type: String,
    },
    population_proper: {
        type: String,
    },
},
{
  versionKey: false,
  timestamps: true
});

const CitiesOfUkraine = model('cities', citiesOfUkraineSchema);

module.exports = CitiesOfUkraine;