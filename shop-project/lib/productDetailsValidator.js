const productDetailsValidator = async ({ name, price, description, imageUrl }) => {
  if (!name || !price || !description || !imageUrl) {
    return { success: false, message: "Please provide values for all the fields" };
  }

  if (description.trim().length > 500) {
    return { success: false, message: "Products description cannot exceed 500 characters" };
  }
  return { success: true };
};
module.exports = productDetailsValidator;
