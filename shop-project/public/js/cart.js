const numberOfCartItems = document.querySelector(".cart_number");
const addToCartButton = document.querySelectorAll(".add_to_cart");

const addProductToCartHandler = async (event) => {
  //----------> here we save the id of the product in the product element
  const productId = event.target.value;

  //send a request to add product to cart
  try {
    const {
      data: { cartContents },
    } = await axios.post(`/cart/add/${productId}`);
    numberOfCartItems.innerHTML = cartContents.numberOfCartItems;
  } catch (error) {
    console.log(error);
  }
};

//----------> loop through all the cart button
addToCartButton.forEach((button) => {
  button.onclick = (event) => addProductToCartHandler(event);
});

//---> get total number of cart items
const getCartContents = async () => {
  try {
    const {
      data: { cartContents },
    } = await axios.get(`/cart/items`);

    numberOfCartItems.innerHTML = cartContents.numberOfCartItems;
  } catch (error) {
    console.log(error);
  }
};

getCartContents();
