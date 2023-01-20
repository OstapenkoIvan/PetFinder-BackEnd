const News = require('../../models/newsModel');
const { createError } = require('../../helpers/createError');

const getAllNews = async (req, res) => {
    const { page = 1, limit = 8, query = '' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const data = await News.find({ title: { $regex: new RegExp(query, 'i') } })
        .sort({ dateISO: -1 })
        .skip(skip)
        .limit(limit);

    if (!data) {
        throw createError({
            status: 404,
            message: 'There is no news',
        });
    }

    res.status(200).json(data);
}

module.exports = getAllNews;
