const Pet = require('../../models/petModel');

const getAllMyPets = async (req, res) => {
    const { _id } = req.user;
    // const { page = 1, limit = 8 } = req.query;
    // const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // const count = await Pet.find({ owner: _id });

    const data = await Pet.find({ owner: _id })
        .sort({ createdAt: -1 })
        // .skip(skip)
        // .limit(limit);

    // res.status(200).json({ count: count.length, data });
    res.status(200).json(data);
}

module.exports = getAllMyPets;