const OursFriends = require('../../models/oursFriends');
const { createError } = require('../../helpers/createError');

const getAllOursFriends = async (req, res) => {
    const data = await OursFriends.find({});
    
    if (!data) {
        throw createError({
            status: 404,
            message: 'There is no ours friends',
        });
    }

    res.status(200).json(data);
}

module.exports = getAllOursFriends;
