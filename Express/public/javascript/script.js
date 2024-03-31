// Display Nav on Mobile
let hamburger = document.getElementById("header-menu");
let header = document.getElementById("header");
hamburger.addEventListener("click", () => {
  header.classList.toggle("mobile");
});

// Code to handle form validation
$("#Submit").click((event) => {
  $("#Name, #Email, #Message").next(".error-text").remove();
  if ($("#Name").val() == "") {
    $("#Name").addClass("error");
    $("<span class='error-text'>Please fill out this field</span>").insertAfter(
      $("#Name")
    );
    event.preventDefault();
  }
  if ($("#Email").val() == "") {
    $("#Email").addClass("error");
    $("<span class='error-text'>Please fill out this field</span>").insertAfter(
      $("#Email")
    );
    event.preventDefault();
  }
  if ($("#Message").val() == "") {
    $("#Message").addClass("error");
    $("<span class='error-text'>Please fill out this field</span>").insertAfter(
      $("#Message")
    );
    event.preventDefault();
  }
});

// Clear Error Message
$("input, textarea").focus((event) => {
  $(event.target).removeClass("error");
  $(event.target).next(".error-text").remove();
});

//Increase Product Quantity
$("#quantity-up").click(() => {
  let quantity = $("#product-quantity").val();
  quantity = parseInt(quantity) + 1;
  $("#product-quantity").val(quantity);
});

//Decrease Product Quantity
$("#quantity-down").click(() => {
  let quantity = $("#product-quantity").val();
  if (parseInt(quantity) > 1) {
    quantity = parseInt(quantity) - 1;
    $("#product-quantity").val(quantity);
  }
});
