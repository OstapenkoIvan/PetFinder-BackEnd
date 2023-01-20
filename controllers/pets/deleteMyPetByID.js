const cloudinary = require('cloudinary').v2;
const { isValidObjectId } = require('mongoose');
const Pet = require('../../models/petModel');
const { createError } = require('../../helpers/createError');

async function deleteMyPetByID(req, res) {
    const { _id } = req.user;
    const { petId } = req.params;

    if (!isValidObjectId(petId)) {
        throw createError({ status: 422, message: 'ID is not valid for MongoDB documents, please enter correct petId' });
    }

    const data = await Pet.findOneAndRemove({ _id: petId, owner: _id });

    if (!data) {
        throw createError({status: 404, message: 'Pet not Found'});
    }

    if (data) {
        await cloudinary.uploader.destroy(`goit_team_project_react_nodejs/my_pets_photos/${petId}`)
            .catch(error => console.error(error));
        await cloudinary.uploader.destroy(`goit_team_project_react_nodejs/my_pets_passports/${petId}`)
            .catch(error => console.error(error));
    }

    res.status(200).json({
        message: 'Pet deleted',
        ad: data
    });
}

module.exports = deleteMyPetByID;