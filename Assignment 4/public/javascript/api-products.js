var edit = false;
var id = "";

$(() => {
  displayProducts(1);

  $(document).on("click", ".delete-btn", deleteProduct);
  $(document).on("click", ".edit-btn", editProduct);
  $(document).on("click", "#submit", submitForm);
});

function displayProducts(pageNumber) {
  $.ajax({
    method: "get",
    url: `/api/products?pageNumber=${pageNumber}`,
    success: (data) => {
      let items = $(".items");
      items.empty();
      let totalPage = Math.ceil(data.count / data.pageSize);

      data.products.forEach((product) => {
        items.append(`<div class="item" data-product-id="${product._id}">
                <div class="left">
                  <img src="${product.image.url}" alt="" />
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
      let pages = $(".pages");
      pages.empty();
      for (let i = 1; i <= totalPage; i++) {
        pages.append(`
        <div>${i}</div>
        `);
      }
    },
    error: () => {
      console.log("Error fetching products");
    },
  });
}

function editProduct() {
  let ID = $(this).parent().parent().data("product-id");
  id = ID;
  $.ajax({
    method: "get",
    url: `/api/products/${ID}`,
    success: function (result) {
      let specifications = [];
      $("#title").val(result.title);
      $("#price").val(result.price);
      $("#description").val(result.description);
      $("#category").val(result.category);
      $("#tags").val(result.tags);
      for (key in result.specifications) {
        let string = `${key}:${result.specifications[key]},`;
        string.replace(/""/g, "");
        specifications.push(string);
      }
      $("#specifications").val(JSON.stringify(specifications));
      $("label[for='image']").css("display", "none");
      $("#image").css("display", "none");
      $("span.heading").text("Edit Product");
      showModal();
      edit = true;
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

function submitForm(event) {
  event.preventDefault();
  let formData = new FormData();

  formData.append("title", $("#title").val());
  formData.append("price", $("#price").val());
  formData.append("description", $("#description").val());
  formData.append("category", $("#category").val());
  formData.append("tags", JSON.stringify($("#tags").val().split(",")));

  var pairs = $("#specifications").val().split(",");
  var dataObject = {};
  pairs.forEach(function (pair) {
    var keyValue = pair.split(":");
    var key = keyValue[0];
    var value = keyValue[1];
    dataObject[key] = value;
  });

  formData.append("specifications", JSON.stringify(dataObject));
  if (!edit) {
    let fileInput = $("#image")[0];
    formData.append("image", fileInput.files[0]);
    console.log(formData);
    $.ajax({
      method: "post",
      url: "/api/products",
      processData: false,
      contentType: false,
      data: formData,
      success: function () {
        hideModal();
        setTimeout(() => {
          displayProducts();
        }, 5000);
      },
    });
  } else {
    console.log(formData);
    $.ajax({
      method: "put",
      url: `/api/products/${id}`,
      processData: false,
      contentType: false,
      data: formData,
      success: function () {
        hideModal();
        displayProducts();
      },
    });
  }
}

$(".pages").on("click", "div", function (event) {
  event.preventDefault();
  displayProducts($(this).text());
});

$(".add-btn").click(() => {
  edit = false;
  $("label[for='image']").css("display", "block");
  $("#image").css("display", "block");
  $("span.heading").text("Add Product");
  clearFields();
  showModal();
});

$(".gray-background").click(() => {
  hideModal();
});

function clearFields() {
  $("#title").val("");
  $("#price").val("");
  $("#description").val("");
  $("#category").val("");
  $("#tags").val("");
  $("#specifications").val("");
  $("#image").val("");
}

function showModal() {
  $(".add-product").show();
  $(".gray-background")
    .css("height", $(document).height() + "px")
    .show();
  $("body").css("overflow", "hidden");
}

function hideModal() {
  $(".gray-background").hide();
  $(".add-product").hide();
  $("body").css("overflow", "");
}
