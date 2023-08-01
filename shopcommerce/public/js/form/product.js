import { changeImageHandler } from "../functions/imageHandler.js";
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



//--------> all event listeners
productName.oninput = (event) => changeProductInputHandler(event, { inputType: "Name" });

productPrice.oninput = (event) => changeProductInputHandler(event, { inputType: "Price" });

productDescription.oninput = (event) =>
  changeProductInputHandler(event, { inputType: "Description" });

productImage.onchange = (event) => changeImageHandler(event);
