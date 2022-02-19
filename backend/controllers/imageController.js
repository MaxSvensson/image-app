const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const ImageMetadata = require("../models/ImageMetadataModel");

const IMG_DIRECTORY_PATH = "public/img";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMG_DIRECTORY_PATH);
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    let filename = req.body.name.slice(0, 10).toLowerCase();
    filename = filename.replace(/ /g, "-").replace(/[åäö]+/g, "a");
    filename = `${filename}${`_${Date.now()}`}`
    cb(null, `${filename}.${extension}`);
  },
});

const upload = multer({
  storage: multerStorage,
  fileFilter: (req, file, cb) => { 
    if( ['jpeg', 'png'].indexOf(file.mimetype.split("/")[1]) >= 0 ) {
      cb(null, true)
    }
    cb(null, false);
  }
});

exports.getAllImages = async (req, res, next) => {
  const data = await ImageMetadata.find();

  return res.status(200).json({
    status: "success",
    data: data,
  });
};

exports.uploadImage = upload.single("photo");

exports.createImageMetadata = async (req, res, next) => {
  try {
    if(!req.file) throw new Error("Worng file extension")
    
    let buffer = await sharp(req.file.path)
    .resize(400, 400)
    .toBuffer();
    sharp(buffer).toFile(path.resolve(req.file.destination ,req.file.filename));

    const doc = await ImageMetadata.create({
      name: req.body.name,
      path: `/img/${req.file.filename}`,
    });

    if(!doc) throw new Error("")
    return res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "invalid input",
    });
  }
};
