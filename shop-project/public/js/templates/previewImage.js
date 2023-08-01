const previewImageTemplate = async (src) => {
  const image = document.createElement("img");
  image.src = src;
  image.alt = "product image";
  image.classList.add("preview_image");
  return previewImageContainer.appendChild(image);
};

export { previewImageTemplate };
