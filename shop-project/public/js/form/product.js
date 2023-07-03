//----------> This function is for handling the product name,price, and description field
const changeProductInputHandler = (event, { inputType }) => {
  //----------> get the value of the input field
  const inputValue = event.target.value;

  //----------> set a dynamic name for the input field
  const inputIsValid = `product${inputType}IsValid`;

  //----------> check the length of the input field
  const inputValueLength = inputValue.trim().length;

  //----------> check of input type is equal to description
  if (inputType === "Description") {
    return setProductDescriptionLength(inputValue);
  }

  //----------> check if the input value length is 0
  if (inputValueLength === 0) {
    //----------> dynamically set the validity of that input to false
    productFormInputIsValid = {
      ...productFormInputIsValid,
      [inputIsValid]: false,
    };

    //----------> check form validity
    saveFormValidity();

    //----------> set error message since is it not valid
    return setFormReply({
      message: `Please provide a product ${inputType.toLowerCase()}`,
      type: "error",
    });
  }

  //----------> dynamically set the validity of that input to true
  productFormInputIsValid = {
    ...productFormInputIsValid,
    [inputIsValid]: true,
  };

  //----------> check form validity again
  saveFormValidity();

  //----------> reset form reply because the input is valid
  resetFormReply();
};

const setProductDescriptionLength = (productDescriptionValue) => {
  //----------> set the length of the product description in the inner html
  productDescriptionLength.innerHTML = productDescriptionValue.length;

  //----------> check if the length of the description is zero
  if (productDescriptionValue.trim().length === 0) {
    //----------> set the validity to false
    productFormInputIsValid.productDescriptionIsValid = false;

    //----------> configure the form reply
    setFormReply({
      message: `Please provide a product description`,
      type: "error",
    });
  } else {
    //----------> reset form reply
    resetFormReply();

    //----------> check if the length of the product description value is less than 500
    if (productDescriptionValue.length <= 500) {
      //----------> configure the styles
      productDescriptionLength.style.color = "black";
      //----------> change the validity to true
      productFormInputIsValid.productDescriptionIsValid = true;
    } else {
      //----------> configure the styles
      productDescriptionLength.style.color = "red";
      //----------> change the validity to false
      productFormInputIsValid.productDescriptionIsValid = false;
    }
  }
  return saveFormValidity();
};
//----------> resetting preview image
const resetImagePreview = () => {
  //once we are resetting image preview, we set the validity to false automatically
  productImagePreview.src = "";
  productImagePreview.alt = "";
  productImagePreview.style.display = "none";
  productFormInputIsValid.productImageIsValid = false;
};
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
//----------> change the product image
const changeProductImageHandler = async (event) => {
  //----------> get the file
  const imageFile = event.target.files[0];

  //----------> check the file type and if it is not an image
  if (!imageFile.type.includes("image/")) {
    //----------> please provide an image
    setFormReply({ message: "Please upload an image", type: "error" });
    //----------> reset image preview
    resetImagePreview();
    //----------> check form validity
    return saveFormValidity();
  }
  //----------> Default Image Size
  const maxSize = 1024 * 1024 * 5; //? This is 5MB
  //----------> check the size of the image file
  const imageSize = imageFile.size;

  //----------> if the size of image to be uploaded is greater then the default size
  if (imageSize > maxSize) {
    //----------> set an error
    setFormReply({
      message: "Please upload a picture smaller than 5MB",
      type: "error",
    });

    //----------> reset image preview
    resetImagePreview();
    return saveFormValidity();
  }

  //---------> set image validity to true
  productFormInputIsValid.productImageIsValid = true;
  resetFormReply();
  //----------> transform the image
  await transformImage(imageFile);
};
//--------> all event listeners
productName.oninput = (event) => changeProductInputHandler(event, { inputType: "Name" });

productPrice.oninput = (event) => changeProductInputHandler(event, { inputType: "Price" });

productDescription.oninput = (event) => changeProductInputHandler(event, { inputType: "Description" });

productImage.onchange = (event) => changeProductImageHandler(event);
