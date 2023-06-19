const productDescription = document.querySelectorAll(".product_description");

productDescription.forEach((description) => {
  if (description.innerHTML.trim().length > 220) {
    description.innerHTML = description.innerHTML.substring(0, 220) + "...";
  }
});
