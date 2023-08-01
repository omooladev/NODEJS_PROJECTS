import { setFormReply } from "../functions/setFormReply.js";

//----------> Default Image Size
const MAX_IMAGE_SIZE = 1024 * 1024 * 5; //? This is 2MB
const MAX_IMAGE_SIZE_NUMBER = 5;
//----------> validate images
const validateImage = async ({ data, validationType, config }) => {
  if (validationType === "length") {
    if (data.length > 4) {
      setFormReply({
        message: "The maximum number of images that you can upload is 4",
        type: "error",
      });
      //----------> check form validity
      saveFormValidity();
      return { status: "error" };
    }
    return { status: "success" };
  } else {
    const { imageFile } = config;
    //----------> if file type is not an image
    if (!imageFile.type.includes("image/")) {
      return { status: "error", message: "Please upload an image" };
    }
    //----------> check the size of the image file
    const imageSize = imageFile.size;
    //----------> if the size of image to be uploaded is greater then the default size
    if (imageSize > MAX_IMAGE_SIZE) {
      return {
        status: "error",
        message: `Please upload a picture smaller than ${MAX_IMAGE_SIZE_NUMBER}MB`,
      };
    }
    return { status: "success" };
  }
};

export { validateImage };
