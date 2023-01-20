const { isValidObjectId } = require('mongoose');
const Pet = require('../../models/petModel');
const { createError } = require('../../helpers/createError');
const uploadFiles = require('../../helpers/uploadFiles');

const updateMyPetByID = async (req, res) => {
    const { petId } = req.params;
    const { photo, passport } = req.files;

    if (!isValidObjectId(petId)) {
        throw createError({ status: 422, message: 'ID is not valid for MongoDB documents, please enter correct petId' });
    }

    if (!req.body) {
        throw createError({ status: 400, message: `Missing fields` });
    }

    const params = {};

    if (photo !== undefined) {
        const { filename } = photo[0];

        const cloudinaryPathForPetsPhotos = '/goit_team_project_react_nodejs/my_pets_photos';

        const petPhotoURL = await uploadFiles(petId, filename, cloudinaryPathForPetsPhotos);

        params.photo = petPhotoURL;
    }

    if (passport !== undefined) {
        const { filename } = passport[0];
        
        const cloudinaryPathForPetsPassports = '/goit_team_project_react_nodejs/my_pets_passports';

        const petPassportURL = await uploadFiles(petId, filename, cloudinaryPathForPetsPassports);

        params.passport = petPassportURL;
    }

    const updatePet = await Pet.findByIdAndUpdate(petId, { ...req.body, ...params }, { new: true });

    if (!updatePet) {
        throw createError({ status: 500, message: 'Pet creation error' });
    }

    res.status(201).json({ message: 'Updated pet', pet: updatePet });
}

module.exports = updateMyPetByID;