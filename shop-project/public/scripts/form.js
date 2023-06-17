const productName = document.querySelector("#product_name");
const productPrice = document.querySelector("#product_price");
const productImage = document.querySelector("#product_image");
const formReply = document.querySelector(".form_reply");
const productFormButton = document.querySelector(".product_form button");
const productForm = document.querySelector(".product_form");

let productNameIsValid;
let productPriceIsValid;
let productImageIsValid;

//important-------->functions
const saveFormValidity = () => {
  const formIsValid = productNameIsValid && productPriceIsValid && productImageIsValid;
  if (!formIsValid) {
    productFormButton.disabled = true;
    return;
  }
  productFormButton.disabled = false;
};

const submitFormHandler = async (event) => {
  event.preventDefault();
  resetFormReply();
  let product = {
    productName: productName.value,
    productPrice: productPrice.value,
    productImage: productImage.value,
  };
  setFormReply({ replyMessage: "Product item added successfully", replyClass: "success" });
};
const changeProductNameHandler = (event) => {
  const productName = event.target.value;
  if (productName.trim().length === 0) {
    productNameIsValid = false;
    saveFormValidity();
    return setFormReply({
      replyMessage: "Please provide a product name",
      replyClass: "error",
    });
  }
  productNameIsValid = true;
  saveFormValidity();
  resetFormReply();
};
const changeProductPriceHandler = (event) => {
  let productPrice = event.target.value;
  if (productPrice.trim().length === 0) {
    productPriceIsValid = false;
    saveFormValidity();
    return setFormReply({
      replyMessage: "Please provide a product price",
      replyClass: "error",
    });
  }
  productPriceIsValid = true;
  saveFormValidity();
  resetFormReply();
};
const changeProductImageHandler = (event) => {
  const file = event.target.files[0];
  if (!file.type.includes("image/")) {
    setFormReply({ replyMessage: "Product image not a valid image type", replyClass: "error" });
    productImageIsValid = false;
    saveFormValidity();
    return;
  }
  productImageIsValid = true;
  resetFormReply();
  saveFormValidity();
};

const setFormReply = ({ replyMessage, replyClass, replyType }) => {
  if (replyType === "reset") {
    formReply.innerHTML = "";
    formReply.classList.remove("error");
    formReply.classList.remove("success");
    return;
  }
  formReply.innerHTML = replyMessage;
  formReply.classList.add(`${replyClass}`);
};

const resetFormReply = () => {
  formReply.innerHTML = "";
  formReply.classList.remove("error");
  formReply.classList.remove("success");
};
//important-------->Event Listeners
productForm.addEventListener("submit", submitFormHandler);
productName.addEventListener("input", changeProductNameHandler);
productPrice.addEventListener("input", changeProductPriceHandler);
productImage.addEventListener("change", changeProductImageHandler);
