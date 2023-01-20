// const { createError } = require('../../helpers/createError');
const Ad = require('../../models/adModel');

const getFavoritesAds = async (req, res) => {
    const { _id } = req.user;
    const { query = '' } = req.query;
    // const { page = 1, limit = 16, query = '' } = req.query;
    // const skip = (parseInt(page) - 1) * parseInt(limit);

    // const count = await Ad.find({ followers: { $elemMatch: { $eq: _id } }, addTitle: { $regex: new RegExp(query, 'i') } })

    const data = await Ad.find({ followers: { $elemMatch: { $eq: _id } }, addTitle: { $regex: new RegExp(query, 'i') } })
        .populate('owner', 'name email phone')
        .sort({ createdAt: -1 })
        // .skip(skip)
        // .limit(limit);

    // if (!data) {
    //     throw createError({ status: 404, message: 'Not found' });
    // }

    // res.status(200).json({ count: count.length, data });
    res.status(200).json(data);
}

module.exports = getFavoritesAds;