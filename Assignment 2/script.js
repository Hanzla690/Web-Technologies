let hamburger = document.getElementById("header-menu");
let header = document.getElementById("header");
hamburger.addEventListener("click", () => {
  header.classList.toggle("mobile");
});

$("#Submit").click((event) => {
  if (
    $("#Name").val() == "" ||
    $("#Email").val() == "" ||
    $("#Message").val() == ""
  ) {
    alert("Empty String");
    event.preventDefault();
  }
});
