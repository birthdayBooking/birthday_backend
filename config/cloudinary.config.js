const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadSingleFile = async file => {
  // (1) upload image into cloudinary then get down link
  const fileName = file.originalname.split('.')[0]
  const folderName = 'BirthDate';
  const result = await cloudinary.uploader.upload(file.path, {
    public_id: fileName,
    folder: folderName
  });

  // (2) remove server's file when uploaded to cloudinary successfull
  if (result) {
    fs.unlinkSync(file.path);
  }

  return result;
};

const uploadMultipleFile = async files => {
  const folderName = 'BirthDateMany';

  const resPromises = files.map(async file => {
    // (1) upload image into cloudinary then get down link
    const fileName = file.originalname.split('.')[0]
    const resResult = await cloudinary.uploader.upload(file.path, {
      public_id: fileName,
      folder: folderName
    });

    // (2) remove server's file when uploaded to cloudinary successfull
    if (resResult) {
      fs.unlinkSync(file.path);
    }

    // (3) resize image 👉🏼 đoạn resize này đã viết thành một middleware riêng để truyền tham số resize ảnh
    // return {
    //   message: 'upload success',
    //   id: resResult.public_id,
    //   thumb1: this.reSize(resResult.public_id, 200, 200),
    //   main: this.reSize(resResult.public_id, 500, 500),
    //   thumb2: this.reSize(resResult.public_id, 300, 300)
    // };
    return resResult;
  });

  const result = await Promise.all(resPromises);
  return result;
};

module.exports = {
  uploadSingleFile,
  uploadMultipleFile
}
