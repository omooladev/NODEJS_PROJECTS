//* Get form elements
const productForm = document.querySelector(".product_form");
const productFormReply = document.querySelector(".form_reply");
const productFormButton = document.querySelector(".product_form button");

let productImageFile;
let transformedImage;
let productFormInputIsValid = {
  productNameIsValid: false,
  productPriceIsValid: false,
  productImageIsValid: false,
};

//important-------->functions
const checkFormValidity = () => {
  const { productNameIsValid, productPriceIsValid, productImageIsValid } = productFormInputIsValid;
  const formIsValid = productNameIsValid && productPriceIsValid && productImageIsValid;
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

const formatResponseError = (error, callback) => {
  const errorMessage = error.response.data.message || error.message;
  return callback(errorMessage);
};
//important-------->Event Listeners
productForm.addEventListener("submit", submitFormHandler);
