const Ad = require('../../models/adModel');

const getAllAds = async (req, res) => {
    const { category = 'inGoodHands', query = '' } = req.query;
    // const { category = 'inGoodHands', page = 1, limit = 16, query = '' } = req.query;
    // const skip = (parseInt(page) - 1) * parseInt(limit);

    // const count = await Ad.find({ addTitle: { $regex: new RegExp(query, 'i') }, category });

    const data = await Ad.find({ addTitle: { $regex: new RegExp(query, 'i') }, category })
        .populate('owner', 'name email phone')
        .sort({ createdAt: -1 })
        // .skip(skip)
        // .limit(limit);
    
    // res.status(200).json({ count: count.length, data });
    res.status(200).json(data);
}

module.exports = getAllAds;