const getAllAds = require('./getAllAds');
const getMyAds = require('./getMyAds');
const addMyAd = require('./addMyAd');
const updateMyAdByID = require('./updateMyAdByID');
const getFavoritesAds = require('./getFavoritesAds');
const updateFavoritesAds = require('./updateFavoritesAds');
const deleteMyAdByID = require('./deleteMyAdByID');

module.exports = {
    getAllAds,
    getMyAds,
    addMyAd,
    updateMyAdByID,
    getFavoritesAds,
    updateFavoritesAds,
    deleteMyAdByID
}