const { isValidObjectId } = require('mongoose');
const Ad = require('../../models/adModel');
const { createError } = require('../../helpers/createError');
const uploadFiles = require('../../helpers/uploadFiles');
    
const updateMyAdByID = async (req, res) => {
    const { adId } = req.params;
    const { photo, passport } = req.files;

    if (!isValidObjectId(adId)) {
        throw createError({ status: 422, message: "Ad with such ID is not found" });
    }

    const params = {};

    if (photo !== undefined) {
        const { filename } = photo[0];

        const cloudinaryPathForPetsPhotos = '/goit_team_project_react_nodejs/pets_photos';

        const petPhotoURL = await uploadFiles(adId, filename, cloudinaryPathForPetsPhotos);

        params.photo = petPhotoURL;
    }

    if (passport !== undefined) {
        const { filename } = passport[0];

        const cloudinaryPathForPetsPassports = '/goit_team_project_react_nodejs/pets_passports';

        const petPassportURL = await uploadFiles(adId, filename, cloudinaryPathForPetsPassports);

        params.passport = petPassportURL;
    }

    const updateAd = await Ad.findByIdAndUpdate(adId, { ...req.body, ...params }, { new: true })
        .populate('owner', 'name email phone');
    
    if (!updateAd) {
        throw createError({ status: 500, message: 'Ad creation error' });
    }

    res.status(201).json({ message: 'Updated ad', ad: updateAd });
}

module.exports = updateMyAdByID;