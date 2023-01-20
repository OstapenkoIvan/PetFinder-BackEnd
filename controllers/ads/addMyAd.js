const Ad = require('../../models/adModel');
const { createError } = require('../../helpers/createError');
const uploadFiles = require('../../helpers/uploadFiles');
    
const addMyAd = async (req, res) => {
    const { _id } = req.user;
    const { photo, passport } = req.files;

    const params = {
        ...req.body,
    };

    const newAd = await Ad.create({ ...params, owner: _id, });

    if (!newAd) {
        throw createError({ status: 500, message: 'Ad creation error' });
    }
    
    if (photo !== undefined) {
        const { filename } = photo[0];

        const cloudinaryPathForPetsPhotos = '/goit_team_project_react_nodejs/pets_photos';

        const petPhotoURL = await uploadFiles(newAd._id, filename, cloudinaryPathForPetsPhotos);

        params.photo = petPhotoURL;
    }

    if (passport !== undefined) {
        const { filename } = passport[0];

        const cloudinaryPathForPetsPassports = '/goit_team_project_react_nodejs/pets_passports';

        const petPassportURL = await uploadFiles(newAd._id, filename, cloudinaryPathForPetsPassports);

        params.passport = petPassportURL;
    }

    const data = await Ad.findByIdAndUpdate(newAd._id, { photo: params.photo, passport: params.passport }, { new: true })
        .populate('owner', 'name email phone');

    res.status(201).json({ message: 'Created new ad', ad: data });
}

module.exports = addMyAd;