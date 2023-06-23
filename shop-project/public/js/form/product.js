

const transformImage = async (imageFile) => {
  const fileReader = new FileReader();
  if (imageFile) {
    fileReader.readAsDataURL(imageFile);
    fileReader.onloadend = () => {
      productImageFile = imageFile;
      transformedImage = fileReader.result;
      productImagePreview.style.backgroundImage = `url(${fileReader.result})`;
      productImagePreview.style.display = "block";
      return checkFormValidity();
    };
  }
};
const changeProductInputHandler = (event, { inputType }) => {
  const inputValue = event.target.value;
  const inputIsValid = `product${inputType}IsValid`;
  if (inputValue.trim().length == 0) {
    productFormInputIsValid = {
      ...productFormInputIsValid,
      [inputIsValid]: false,
    };
    checkFormValidity();
    return setFormReply({
      replyMessage: `Please provide a product ${inputType.toLowerCase()}`,
      replyClass: "error",
    });
  }
  productFormInputIsValid = {
    ...productFormInputIsValid,
    [inputIsValid]: true,
  };
  checkFormValidity();
  resetFormReply();
};
const changeProductDescriptionHandler = (event) => {
  setProductDescriptionLength(event.target.value);
};
const setProductDescriptionLength = (productDescriptionValue) => {
  const productDescriptionLengthValue = productDescriptionValue.length;
  productDescriptionLength.innerHTML = productDescriptionLengthValue;
  if (productDescriptionValue.trim().length === 0) {
    productFormInputIsValid.productDescriptionIsValid = false;
    setFormReply({
      replyMessage: `Please provide a product description`,
      replyClass: "error",
    });
  } else {
    resetFormReply();
    if (productDescriptionLengthValue <= 500) {
      productDescriptionLength.style.color = "black";
      productFormInputIsValid.productDescriptionIsValid = true;
    } else {
      productDescriptionLength.style.color = "red";
      productFormInputIsValid.productDescriptionIsValid = false;
    }
  }
  return checkFormValidity();
};
const changeProductImageHandler = async (event) => {
  const imageFile = event.target.files[0];
  if (!imageFile.type.includes("image/")) {
    setFormReply({ replyMessage: "Please upload an image", replyClass: "error" });
    productFormInputIsValid.productImageIsValid = false;
    return checkFormValidity();
  }
  const maxSize = 1024 * 1024; //? This is 1MB
  const imageSize = imageFile.size;

  if (imageSize > maxSize) {
    setFormReply({
      replyMessage: "Please upload a picture smaller than 1MB",
      replyClass: "error",
    });
    productImagePreview.style.backgroundImage = ``;
    productImagePreview.style.display = "none";
    productFormInputIsValid.productImageIsValid = false;
    return checkFormValidity();
  }
  productFormInputIsValid.productImageIsValid = true;
  resetFormReply();
  //important-----> transform image
  await transformImage(imageFile);
};

//important-------->Event Listeners
productName.addEventListener("input", (event) =>
  changeProductInputHandler(event, { inputType: "Name" })
);
productPrice.addEventListener("input", (event) =>
  changeProductInputHandler(event, { inputType: "Price" })
);
productDescription.addEventListener("input", changeProductDescriptionHandler);
productImage.addEventListener("change", changeProductImageHandler);
