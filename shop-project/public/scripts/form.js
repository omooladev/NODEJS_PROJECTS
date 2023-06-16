const productName = document.querySelector("#product_name");
const productPrice = document.querySelector("#product_price");
const productImage = document.querySelector("#product_image");
const formReply = document.querySelector(".form_reply");
const productForm = document.querySelector(".product_form");

//important-------->functions

const submitFormHandler = async (event) => {
  event.preventDefault();
  formReply.innerHTML = "";
  formReply.classList.remove("error");
  formReply.classList.remove("success");
  if (!productName.value || !productPrice.value || !productImage.value) {
    formReply.innerHTML = "An error has occurred, please try again";
    formReply.classList.add("error");
    return;
  }
  let product = {
    productName: productName.value,
    productPrice: productPrice.value,
    productImage: productImage.value,
  };
  const productImgTransform = await transformProductImage(product.productImage);
  console.log(productImgTransform);
  formReply.innerHTML = "Product item added successfully";
  formReply.classList.add("success");
};
const transformProductImage = async (productImage) => {
  const fileReader = new FileReader();
};
//important-------->Event Listeners
productForm.addEventListener("submit", submitFormHandler);
