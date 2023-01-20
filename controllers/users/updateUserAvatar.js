const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs/promises');
const User = require('../../models/userModel');

const USER_AVATAR_TEMP_DIR = path.join(__dirname, '..', '..', 'temp', 'users_avatars');

const updateUserAvatar = async (req, res) => {
    const { _id } = req.user;
    const { filename } = req.file;

    const userAvatarPath = path.join(USER_AVATAR_TEMP_DIR, filename);

    const userAvatar = await cloudinary.uploader.upload(userAvatarPath, {
        public_id: _id,
        folder: '/goit_team_project_react_nodejs/users_avatars',
        overwrite: true,
    })
        .catch(error => {
            console.error(error);
        });

    await fs.unlink(userAvatarPath);

    const data = await User.findByIdAndUpdate(_id, { avatar: userAvatar.url }, { new: true })
        .select({ password: 0, createdAt: 0, updatedAt: 0, refreshToken: 0 });
    
    res.status(200).json({
        message: `User avatar ${data.name} updated`,
        user: data
    });
}

module.exports = updateUserAvatar;
