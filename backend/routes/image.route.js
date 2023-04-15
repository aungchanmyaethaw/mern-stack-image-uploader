const express = require("express");
const { handleUploadController } = require("../controllers/image.controller");
const { upload } = require("../middlewares/cloudinaryupload");
const router = express.Router();

router.post("/upload", upload.single("image"), handleUploadController);

module.exports = router;
