$(() => {
  displayProducts();

  $(document).on("click", ".delete-btn", deleteProduct);
  $(document).on("click", ".edit-btn", showModal);
  $(document).on("click", "#submit", addProduct);
});

function displayProducts() {
  $.ajax({
    method: "get",
    url: "/api/products",
    success: (data) => {
      let items = $(".items");
      items.empty();

      data.forEach((product) => {
        items.append(`<div class="item" data-product-id="${product._id}">
                <div class="left">
                  <img src="${product.image}" alt="" />
                  <div>${product.title}</div>
                </div>
                <div class="right">
                  <div class="price">$${product.price}</div>
                  <div class="add-to-cart-btn edit-btn">
                    <span>Edit</span>
                  </div>
                  <div class="add-to-cart-btn delete-btn">
                    <span>Delete</span>
                  </div>
                </div>
              </div>`);
      });
    },
    error: () => {
      console.log("Error fetching products");
    },
  });
}

function deleteProduct() {
  let ID = $(this).parent().parent().data("product-id");
  $.ajax({
    method: "delete",
    url: `/api/products/${ID}`,
    success: function () {
      displayProducts();
    },
  });
}

function addProduct(event) {
  event.preventDefault();
  let formData = new FormData();

  formData.append("title", $("#title").val());
  formData.append("price", $("#price").val());
  formData.append("description", $("#description").val());
  formData.append("category", $("#category").val());
  formData.append("tags", JSON.stringify($("#tags").val().split(" ")));

  var pairs = $("#specifications").val().split(" ");
  var dataObject = {};
  pairs.forEach(function (pair) {
    var keyValue = pair.split(",");
    var key = keyValue[0];
    var value = keyValue[1];
    dataObject[key] = value;
  });

  formData.append("specifications", JSON.stringify(dataObject));
  let fileInput = $("#image")[0];
  formData.append("image", fileInput.files[0]);

  $.ajax({
    method: "post",
    url: "/api/products",
    processData: false,
    contentType: false,
    data: formData,
    success: function () {
      hideModal();
      setTimeout(() => {
        displayProducts()
      }, 3000);
    //   location.reload(true);
    },
  });
}

function showModal() {
  $(".gray-background").show();
  $(".add-product").show();
  $("body").css("overflow", "hidden");
}

function hideModal() {
  $(".gray-background").hide();
  $(".add-product").hide();
  $("body").css("overflow", "");
}

$(".add-btn").click(() => {
  showModal();
});

$(".gray-background").click(() => {
  hideModal();
});
