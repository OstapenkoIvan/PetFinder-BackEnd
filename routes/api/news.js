const express = require('express');

const controllerWrraper = require('../../helpers/controllerWrraper');
const getAllNews = require('../../controllers/news/getAllNews');

const router = express.Router();

router.get('/', controllerWrraper(getAllNews));

module.exports = router;