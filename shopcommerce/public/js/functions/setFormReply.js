//----------> configure form reply
const setFormReply = ({ message, type, replyType }) => {
  if (replyType === "reset") {
    return resetFormReply();
  }
  productFormReply.innerHTML = message;
  productFormReply.classList.add(`${type}`);
};

//----------> reset form reply
const resetFormReply = () => {
  productFormReply.innerHTML = "";
  productFormReply.classList.remove("error");
  productFormReply.classList.remove("success");
};

export { setFormReply };
