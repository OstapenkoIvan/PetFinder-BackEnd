const cloudinary = require('cloudinary').v2;
const { isValidObjectId } = require('mongoose');
const Ad = require('../../models/adModel');
const { createError } = require('../../helpers/createError');

const deleteMyAdByID = async (req, res) => {
    const { _id } = req.user;
    const { adId } = req.params;

    if (!isValidObjectId(adId)) {
        throw createError({ status: 422, message: 'ID is not valid for MongoDB documents, please enter correct adId' });
    }

    const data = await Ad.findOneAndRemove({ _id: adId, owner: _id })
        .populate('owner', 'email phone');

    if (!data) {
        throw createError({status: 404, message: 'Ad not Found' });
    }
    
    if (data) {
        await cloudinary.uploader.destroy(`goit_team_project_react_nodejs/pets_photos/${adId}`)
            .catch(error => console.error(error));
        await cloudinary.uploader.destroy(`goit_team_project_react_nodejs/pets_passports/${adId}`)
            .catch(error => console.error(error));
    }

    res.status(200).json({
        message: 'Ad deleted',
        ad: data
    });
}

module.exports = deleteMyAdByID;