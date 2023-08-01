import { previewImageTemplate } from "../templates/previewImage.js";
//----------> transform image
const transformImage = async (imageFiles) => {
  //----------> check if image file was not passed
  if (!imageFiles) {
    return;
  }
  productImageFile = imageFiles;
  for (let index = 0; index < imageFiles.length; index++) {
    //---------->access file reader class
    const fileReader = new FileReader();
    const imageFile = imageFiles[index];
    fileReader.readAsDataURL(imageFile);
    fileReader.onloadend = async () => {
      previewImageTemplate(fileReader.result);
      if (index === imageFiles.length - 1) {
        saveFormValidity();
      }
    };
  }
};
export { transformImage };
