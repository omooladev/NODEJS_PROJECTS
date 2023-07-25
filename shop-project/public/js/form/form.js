//----------> Get form elements
const productForm = document.querySelector(".product_form");
const productFormReply = document.querySelector(".form_reply");
const productFormButton = document.querySelector(".product_form button");

//----------> Get form input elements
const productName = document.querySelector("#product_name");
const productPrice = document.querySelector("#product_price");
const productDescription = document.querySelector("#product_description");
const productDescriptionLength = document.querySelector("#product_description_length");
const productImage = document.querySelector("#product_image");
const productImagePreview = document.querySelector(".preview_image");

//----------> declare variables
let productImageFile;
let transformedImage = productImagePreview.src || "";

//----------> default validity
let productFormInputIsValid = {
  productNameIsValid: productName.value ? true : false,
  productPriceIsValid: productName.value ? true : false,
  productDescriptionIsValid: productName.value ? true : false,
  productImageIsValid: productImagePreview.src ? true : false,
};

//----------> check validity of inputs and return validity of form
const saveFormValidity = () => {
  //----------> get all validity
  const {
    productNameIsValid,
    productPriceIsValid,
    productDescriptionIsValid,
    productImageIsValid,
  } = productFormInputIsValid;

  //----------> check form validity
  const formIsValid =
    productNameIsValid && productPriceIsValid && productDescriptionIsValid && productImageIsValid;

  //----------> if form is not valid, disable the form button
  if (!formIsValid) {
    productFormButton.disabled = true;
    return;
  }

  //----------> enable the form button
  productFormButton.disabled = false;
};

//----------> submit form handler
const submitFormHandler = async (event) => {
  event.preventDefault();

  //----------> disable form button
  productFormButton.disabled = true;

  //----------> reset reply when the form is submitted
  resetFormReply();

  //----------> assign a variable for the new product and
  let newProduct = {
    name: productName.value,
    price: productPrice.value,
    description: productDescription.value,
    transformedImage: transformedImage,
  };

  const isEditing = productForm.className.includes("isEditing");
  const pageLocation = isEditing && window.location.href.split("/");
  const productId = pageLocation && pageLocation[pageLocation.length - 1];
  // resetForm();
  try {
    const { data } = await axios.post(
      `/admin${isEditing ? `/edit-product/${productId}` : "/add-product"}`,
      newProduct,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (data) {
      setFormReply({
        message: isEditing ? "Product edited successfully" : "Product item added successfully",
        type: "success",
      });
      setTimeout(() => {
        resetForm();
        if (data.message === "Product has been edited successfully") {
          window.location.href = "/admin/products";
        }
      }, 2000);
    }
  } catch (error) {
    formatResponseError(error, (errorMessage) => {
      setFormReply({
        message: errorMessage,
        type: "error",
      });
    });
  }
  productFormButton.disabled = false;
};

const resetForm = () => {
  productName.value =
    productPrice.value =
    productImage.value =
    productDescription.value =
    productImageFile =
    transformedImage =
      "";
  productDescriptionLength.innerHTML = "0";
  productImagePreview.src = productImagePreview.alt = "";

  productFormInputIsValid = {
    productNameIsValid: false,
    productPriceIsValid: false,
    productDescriptionIsValid: false,
    productImageIsValid: false,
  };

  saveFormValidity();
  resetFormReply();
};

const formatResponseError = (error, callback) => {
  const errorMessage = error.response.data.message || error.message;
  return callback(errorMessage);
};
//----------> listen to submit event for the form
productForm.onsubmit = (event) => submitFormHandler(event);
