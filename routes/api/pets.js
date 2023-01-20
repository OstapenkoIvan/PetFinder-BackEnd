const express = require('express');

const { userAuthenticate } = require('../../middlewares/authenticateMiddleware');
const { addMyPetValidation, updateMyPetValidation } = require('../../middlewares/petsValidationMiddleware');
const controllerWrraper = require('../../helpers/controllerWrraper');
const upload = require('../../middlewares/uploadFilesMiddleware');
const { getAllMyPets, addMyPet, updateMyPetByID, deleteMyPetByID } = require('../../controllers/pets');

const router = express.Router();

router.use(userAuthenticate);

router.get('/', controllerWrraper(getAllMyPets));

router.post('/', upload.fields([ { name: 'photo', maxCount: 1 }, { name: 'passport', maxCount: 1 }, ]), addMyPetValidation, controllerWrraper(addMyPet));

router.patch('/:petId', upload.fields([ { name: 'photo', maxCount: 1 }, { name: 'passport', maxCount: 1 }, ]), updateMyPetValidation, controllerWrraper(updateMyPetByID));

router.delete('/:petId', controllerWrraper(deleteMyPetByID));

module.exports = router;