import { validateImage } from "../utils/inputValidator.js";
import { setFormReply } from "./setFormReply.js";
//----------> resetting preview image
const resetImagePreview = () => {
  //once we are resetting image preview, we set the validity to false automatically
  productImagePreview.src = "";
  productImagePreview.alt = "";
  productImagePreview.style.display = "none";
  productFormInputIsValid.productImageIsValid = false;
  productImageFile = "";
  transformedImage = "";
};

const changeImageHandler = async (event) => {
  //----------> get the files
  let imageFiles = event.target.files;

  let validationResult = await validateImage({ data: imageFiles, validationType: "length" });
  if (validationResult.status === "error") {
    //----------> reset image preview
    return resetImagePreview();
  }

  let imageFile;
  const errorData = { hasError: false, errorMessage: "" };

  for (let index = 0; index < imageFiles.length; index++) {
    imageFile = imageFiles[index];
    let validationResult = await validateImage({
      data: imageFiles,
      validationType: "others",
      config: { imageFile },
    });

    if (validationResult.status === "error") {
      errorData.errorMessage = validationResult.message;
      errorData.hasError = true;
      break;
    }
  }

  if (errorData.hasError) {
    //----------> set an error
    setFormReply({
      message: errorData.errorMessage,
      type: "error",
    });
    saveFormValidity();
    //----------> reset image preview
    resetImagePreview();
    return;
  }

  //---------> set image validity to true
  productFormInputIsValid.productImageIsValid = true;
  setFormReply({
    replyType: "reset",
  });
  return;
  //----------> transform the image
  await transformImage(imageFile);
};

export { changeImageHandler };
