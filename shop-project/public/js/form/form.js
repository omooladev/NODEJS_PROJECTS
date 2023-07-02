//* Get form elements
const productForm = document.querySelector(".product_form");
const productFormReply = document.querySelector(".form_reply");
const productFormButton = document.querySelector(".product_form button");
//* Get form input elements
const productName = document.querySelector("#product_name");
const productPrice = document.querySelector("#product_price");
const productDescription = document.querySelector("#product_description");
const productImage = document.querySelector("#product_image");
const productImagePreview = document.querySelector(".preview_image");

const productDescriptionLength = document.querySelector("#product_description_length");
let productImageFile;
let transformedImage;
let productFormInputIsValid = {
  productNameIsValid: false,
  productPriceIsValid: false,
  productDescriptionIsValid: false,
  productImageIsValid: false,
};
//important-------->functions
const checkFormValidity = () => {
  const {
    productNameIsValid,
    productPriceIsValid,
    productImageIsValid,
    productDescriptionIsValid,
  } = productFormInputIsValid;
  const formIsValid =
    productNameIsValid && productPriceIsValid && productDescriptionIsValid && productImageIsValid;

  if (!formIsValid) {
    productFormButton.disabled = true;
    return;
  }
  productFormButton.disabled = false;
};

//* configure form reply
const setFormReply = ({ replyMessage, replyClass, replyType }) => {
  if (replyType === "reset") {
    return resetFormReply();
  }
  productFormReply.innerHTML = replyMessage;
  productFormReply.classList.add(`${replyClass}`);
};

//* reset form reply
const resetFormReply = () => {
  productFormReply.innerHTML = "";
  productFormReply.classList.remove("error");
  productFormReply.classList.remove("success");
};

const submitFormHandler = async (event) => {
  event.preventDefault();
  //? reset form reply
  resetFormReply();
  let newProduct = {
    productName: productName.value,
    productPrice: productPrice.value,
    productDescription: productDescription.value,
    productTransformedImage: transformedImage,
    productImage: productImageFile,
  };
  productFormButton.disabled = true;
  try {
    const { data } = await axios.post("/admin/add-product", newProduct, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (data) {
      setFormReply({
        replyMessage: "Product item added successfully",
        replyClass: "success",
      });
      setTimeout(() => {
        return resetProductInputs();
      }, 2000);
    }
  } catch (error) {
    formatResponseError(error, (errorMessage) => {
      setFormReply({
        replyMessage: errorMessage,
        replyClass: "error",
      });
    });
  }
  productFormButton.disabled = false;
};

const resetProductInputs = () => {
  productName.value = "";
  productPrice.value = "";
  productImage.value = "";
  productDescription.value = "";
  productImageFile = "";
  transformedImage = "";
  productDescriptionLength.innerHTML = "0";
  productImagePreview.src = ``;
  productImagePreview.alt = "";
  productFormInputIsValid.productNameIsValid = false;
  productFormInputIsValid.productPriceIsValid = false;
  productFormInputIsValid.productDescriptionIsValid = false;
  productFormInputIsValid.productImageIsValid = false;
  checkFormValidity();
  resetFormReply();
};
const formatResponseError = (error, callback) => {
  const errorMessage = error.response.data.message || error.message;
  return callback(errorMessage);
};
//important-------->Event Listeners
productForm.addEventListener("submit", submitFormHandler);
