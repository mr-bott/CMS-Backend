const asyncHandler = require("../../utils/asyncHandler");
const customError = require("../../utils/customError");
const { uploadFromBuffer } = require("./images.servies");
const { saveImageWithProductId ,getImageWithId,deleteImageWithId } = require("./images.repository");

// module.exports.addImage = asyncHandler(async (req, res, next) => {
//   //get properties in body
//   const { product_id, is_primary } = req.body;

//   //check file exist or not
//   if (!req.file) {
//     return next(new customError("No file selected", 400));
//   }

//   //upload image to cloudinary
//   const result = await uploadFromBuffer(req);

//   //   res.status(200).json({
//   //     message: "Uploaded successfully",
//   //     imageUrl: result.secure_url,
//   //     publicId: result.public_id,
//   //   });

//   // save the url received form cloudinary into database
//   const saved = await saveImageWithProductId(
//     product_id,
//     result.secure_url,
//     is_primary,
//   );

//   if (saved.rows.length > 0) {
//     res.status(200).json({
//       message: "Image url saved Sussesfully",
//       imageUrl: result.secure_url,
//     });
//   }
// });

module.exports.addImage = asyncHandler(async (req, res, next) => {
  const { product_id, is_primary } = req.body;

  if (!req.files || req.files.length === 0) {
    return next(new customError("No files selected", 400));
  }

  const uploadedImages = [];

  // Loop through all images
  for (const file of req.files) {
    const result = await uploadFromBuffer(file); // modify service to accept file

    await saveImageWithProductId(
      product_id,
      result.secure_url,
      is_primary || false
    );

    uploadedImages.push(result.secure_url);
  }

  res.status(200).json({
    message: "Images uploaded successfully",
    images: uploadedImages,
  });
});

module.exports.deleteImage = asyncHandler(async (req, res, next) => {
  //varaibles from body
  const { id } = req.params;

  // image exist in db
  const imageExist = await getImageWithId(id);

  if (imageExist.rows.length == 0) {
    return next(new customError("Image Not Exist in Database"), 400);
  }

  //deleting image ffrom DB
  const result = await deleteImageWithId(id);

  if (result.rows.length === 0) {
    res.status(200).json({
      message: "Image Deleted Successfully",
    });
  }
});
