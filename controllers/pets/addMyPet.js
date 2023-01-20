const Pet = require('../../models/petModel');
const { createError } = require('../../helpers/createError');
const uploadFiles = require('../../helpers/uploadFiles');
    
const addMyPet = async (req, res) => {
    const { _id } = req.user;
    const { photo, passport } = req.files;

    const params = {
        ...req.body,
    };

    const newPet = await Pet.create({ ...params, owner: _id });

    if (!newPet) {
        throw createError({ status: 500, message: 'Pet creation error' });
    }

    if (photo !== undefined) {
        const { filename } = photo[0];

        const cloudinaryPathForPetsPhotos = '/goit_team_project_react_nodejs/my_pets_photos';

        const petPhotoURL = await uploadFiles(newPet._id, filename, cloudinaryPathForPetsPhotos);

        params.photo = petPhotoURL;
    }

    if (passport !== undefined) {
        const { filename } = passport[0];

        const cloudinaryPathForPetsPassports = '/goit_team_project_react_nodejs/my_pets_passports';

        const petPassportURL = await uploadFiles(newPet._id, filename, cloudinaryPathForPetsPassports);

        params.passport = petPassportURL;
    }

    const data = await Pet.findByIdAndUpdate(newPet._id, { photo: params.photo, passport: params.passport }, { new: true })

    res.status(201).json({ message: 'Created new pet', pet: data });
}

module.exports = addMyPet;