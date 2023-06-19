//* Get form elements
const productForm = document.querySelector(".product_form");
const productFormReply = document.querySelector(".form_reply");
const productFormButton = document.querySelector(".product_form button");

let productImageFile;
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
    productImage: productImageFile,
  };
  const response = await axios.post("/admin/add-product", newProduct, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  setFormReply({ replyMessage: "Product item added successfully", replyClass: "success" });
};
//important-------->Event Listeners
productForm.addEventListener("submit", submitFormHandler);
