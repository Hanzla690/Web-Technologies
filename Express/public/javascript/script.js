$(document).ready(() => {
  var container = $("#info-container");

  var child = $("#specifications");
  container.height(child.height() + 60);
});

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

// //Increase Product Quantity
// $("#quantity-up").click(() => {
//   let quantity = $("#product-quantity").val();
//   quantity = parseInt(quantity) + 1;
//   $("#product-quantity").val(quantity);
// });

// //Decrease Product Quantity
// $("#quantity-down").click(() => {
//   let quantity = $("#product-quantity").val();
//   if (parseInt(quantity) > 1) {
//     quantity = parseInt(quantity) - 1;
//     $("#product-quantity").val(quantity);
//   }
// });

// Increase Product Quantity
$(".quantity-up").click(function () {
  console.log("Up Arrow Clicked");
  var input = $(this).parent().prev("input.product-quantity");
  var quantity = parseInt(input.val());
  quantity = isNaN(quantity) ? 0 : quantity;
  input.val(quantity + 1);
});

// Decrease Product Quantity
$(".quantity-down").click(function () {
  console.log("Down Arrow Clicked");
  var $input = $(this).parent().prev("input.product-quantity");
  var quantity = parseInt($input.val());
  quantity = isNaN(quantity) ? 0 : quantity;
  if (quantity > 1) {
    $input.val(quantity - 1);
  }
});

//Set specifications container height dynamically
function setContainerHeight(childID) {
  var container = $("#info-container");

  var child = $(childID);
  container.height(child.height() + 60);
}

// Specifications BTN Click
$("#specifications-btn").click(() => {
  $("#specifications-btn")
    .addClass("button-active")
    .removeClass("button-inactive");
  $("#reviews-btn").addClass("button-inactive").removeClass("button-active");

  $("#specifications").css({
    display: "flex",
    "z-index": 100,
  });

  $("#reviews").css({
    display: "none",
    "z-index": 0,
  });
  setContainerHeight("#specifications");
});

// Reviews BTN Click
$("#reviews-btn").click(() => {
  $("#reviews-btn").addClass("button-active").removeClass("button-inactive");
  $("#specifications-btn")
    .addClass("button-inactive")
    .removeClass("button-active");

  $("#reviews").css({
    display: "flex",
    "z-index": 100,
  });

  $("#specifications").css({
    display: "none",
    "z-index": 0,
  });
  setContainerHeight("#reviews");
});

$(".add-to-cart-btn").click(function (event) {
  event.preventDefault();

  const productID = $(this).data("product-id");
  $.ajax({
    method: "get",
    url: `/products/${productID}/add-to-cart`,
    success: (result) => {
      console.log(result);
    },
  });
  $(".success-msg").addClass("active");
  setTimeout(() => {
    $(".success-msg").removeClass("active");
  }, 2500);
});

$(".update-cart-btn").click(() => {
  let products = [];
  $(".items .item").each(function () {
    let id = $(this).find(".product-title").data("product-id");
    let quantity = $(this).find("input.product-quantity").val();

    products.push({
      id: id,
      quantity: quantity,
    });
  });
  $.ajax({
    method: "post",
    url: "/cart",
    data: {
      products: products,
    },
    success: () => {
      window.location.href = "/cart";
    },
  });
});

$(".bx-user").click(() => {
  $(".login-modal").css("display", "flex").show();
});
