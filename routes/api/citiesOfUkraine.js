const express = require('express');

const controllerWrraper = require('../../helpers/controllerWrraper');
const getCitiesOfUkraine = require('../../controllers/cities_of_ukraine/getCitiesOfUkraine');

const router = express.Router();

router.get('/', controllerWrraper(getCitiesOfUkraine));

module.exports = router;