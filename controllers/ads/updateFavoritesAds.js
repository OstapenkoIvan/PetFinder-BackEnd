const { isValidObjectId } = require('mongoose');
const Ad = require('../../models/adModel');
const { createError } = require('../../helpers/createError');

const addFavoritesAds = async (req, res) => {
    const { _id } = req.user;
    const { adId } = req.params;

    if (!isValidObjectId(adId)) {
        throw createError({ status: 422, message: "Ad with such ID is not found" });
    }

    const ad = await Ad.findById(adId);

    if (!ad) {
        throw createError({status: 404, message: 'Ad not Found' });
    }
    
    const indexUser = await ad.followers.indexOf(_id);

    if (indexUser === -1) { 
        const data = await Ad.findByIdAndUpdate(adId, { $push: { followers: _id } }, { new: true })
            .populate('owner', 'name email phone');
        res.status(200).json({
            message: `Ad ${adId} added in favorites ads`,
            data
        });
    } else {
        const data = await Ad.findByIdAndUpdate(adId, { $pull: { followers: _id } }, { new: true })
            .populate('owner', 'name email phone');
        res.status(200).json({
            message: `Ad ${adId} deleted in favorites ads`,
            data
        });
    }
}

module.exports = addFavoritesAds;