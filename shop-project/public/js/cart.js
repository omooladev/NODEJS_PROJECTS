const numberOfCartItems = document.querySelector(".cart_number");
const addToCartButton = document.querySelectorAll(".add_to_cart");
const notification = document.querySelector(".notification");
const closeNotification = document.querySelector(".close_notification");

let timeOut;
const addProductToCartHandler = async (event) => {
  //----------> here we save the id of the product in the product element
  const productId = event.target.value;
  event.target.disabled = true;
  //send a request to add product to cart

  try {
    const {
      data: { cart },
    } = await axios.post(`/cart/add/${productId}`);
    numberOfCartItems.innerHTML = cart.numberOfCartItems;
    //---------->show notification
    notification.classList.remove("hide");

    //----------> clear timeout if it exists
    if (timeOut) {
      clearTimeout(timeOut);
    }
    //----------> add a timeout
    timeOut = setTimeout(() => {
      closeNotificationHandler();
    }, 2000);
  } catch (error) {
    console.log(error);
  }
  event.target.disabled = false;
};
const closeNotificationHandler = () => {
  if (timeOut) {
    clearTimeout(timeOut);
  }
  notification.classList.add("hide");
};

//----------> loop through all the cart button
addToCartButton.forEach((button) => {
  button.onclick = (event) => addProductToCartHandler(event);
});

//---> get total number of cart items
const getCartContents = async () => {
  try {
    const {
      data: { cart },
    } = await axios.get(`/cart/items`);

    numberOfCartItems.innerHTML = cart.numberOfCartItems;
  } catch (error) {
    console.log(error);
  }
};

if (closeNotification) {
  closeNotification.onclick = (event) => closeNotificationHandler(event);
}
getCartContents();
