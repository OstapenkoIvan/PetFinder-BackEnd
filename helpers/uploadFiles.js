const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');
const path = require('path');

const FILES_TEMP_DIR = path.join(__dirname, '..', 'temp', 'files');

const uploadFiles = async (noticeId, filename, cloudinaryPathForFiles) => {
    const filePath = path.join(FILES_TEMP_DIR, filename);

    const file = await cloudinary.uploader.upload(filePath, {
        public_id: noticeId,
        folder: cloudinaryPathForFiles,
        overwrite: true,
    })
        .catch(error => console.error(error));
    
    const { url } = file;
    
    await fs.unlink(filePath);

    return url;
}

module.exports = uploadFiles;