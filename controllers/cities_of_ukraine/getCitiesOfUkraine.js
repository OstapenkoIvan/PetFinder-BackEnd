const CitiesOfUkraine = require('../../models/citiesOfUkraineModel');
const { createError } = require('../../helpers/createError');

const getCitiesOfUkraine = async (req, res) => {
    const data = await CitiesOfUkraine.find({})

    if (!data) {
        throw createError({
            status: 404,
            message: 'There is no cities of Ukraine',
        });
    }

    res.status(200).json(data);
}

module.exports = getCitiesOfUkraine;
