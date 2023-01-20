const { addMyPetValidationSchema, updateMyPetValidationSchema } = require('../validation/petValidation');
const fs = require('fs/promises');
const path = require('path');

const FILES_TEMP_DIR = path.join(__dirname, '..', 'temp', 'files');

const addMyPetValidation = async (req, res, next) => {
    const { photo, passport } = req.files;
    let filePhotoPath = '';
    let filePassportPath = '';

    if (photo !== undefined) {
        const { filename } = photo[0];
        filePhotoPath = path.join(FILES_TEMP_DIR, filename);
    }

    if (passport !== undefined) {
        const { filename } = passport[0];
        filePassportPath = path.join(FILES_TEMP_DIR, filename);
    }

    const validationResult = addMyPetValidationSchema.validate(req.body);

    if (validationResult.error) {
        filePhotoPath && await fs.unlink(filePhotoPath);
        filePassportPath && await fs.unlink(filePassportPath);
        return res.status(400).json({ message: validationResult.error.message });
    }

    next();
}

const updateMyPetValidation = async (req, res, next) => {
    const { photo, passport } = req.files;
    let filePhotoPath = '';
    let filePassportPath = '';

    if (photo !== undefined) {
        const { filename } = photo[0];
        filePhotoPath = path.join(FILES_TEMP_DIR, filename);
    }

    if (passport !== undefined) {
        const { filename } = passport[0];
        filePassportPath = path.join(FILES_TEMP_DIR, filename);
    }

    const validationResult = updateMyPetValidationSchema.validate(req.body);

    if (validationResult.error) {
        filePhotoPath && await fs.unlink(filePhotoPath);
        filePassportPath && await fs.unlink(filePassportPath);
        return res.status(400).json({ message: validationResult.error.message });
    }

    next();
}

module.exports = {
    addMyPetValidation,
    updateMyPetValidation
}