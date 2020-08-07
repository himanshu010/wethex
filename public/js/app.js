console.log("client side js loaded!!!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
weatherForm.addEventListener("submit", (e) => {
  const location = search.value;
});
