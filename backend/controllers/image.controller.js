const cloudinary = require("cloudinary").v2;
const Image = require("../model/image.model");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const handleUploadController = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    await Image.create({
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });

    res.json({
      success: true,
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};

module.exports = { handleUploadController };
