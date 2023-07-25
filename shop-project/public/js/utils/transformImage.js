//----------> transform image
const transformImage = async (imageFile) => {
  //----------> check if image file was not passed
  if (!imageFile) {
    return;
  }
  //---------->access file reader class
  const fileReader = new FileReader();

  fileReader.readAsDataURL(imageFile);
  fileReader.onloadend = () => {
    productImageFile = imageFile;
    transformedImage = fileReader.result;
    productImagePreview.src = `${fileReader.result}`;
    productImagePreview.alt = "product image";
    productImagePreview.style.display = "block";

    saveFormValidity();
  };
};
