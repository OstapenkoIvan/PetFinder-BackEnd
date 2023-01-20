const express = require('express');

const controllerWrraper = require('../../helpers/controllerWrraper');
const getAllOursFriends = require('../../controllers/oursFriends/oursFriends');

const router = express.Router();

router.get('/', controllerWrraper(getAllOursFriends));

module.exports = router;