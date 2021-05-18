$(function () {
  loadProducts();
  $(".btnAdd").click(handleNewProduct);
  $(".products").on("click", ".btnDelete", handleDelete);
  $(".products").on("click", ".btnEdit", handleUpdate);
  $(".btnSearch").click(getOneProduct);
  $(".btnUpdate").click(function () {
    const id = $("#editProductModal").val();
    const name = $("#editProductTitle").val();
    const price = $("#editProductPrice").val();
    const color = $("#editProductColor").val();
    const department = $("#editProductDepartment").val();
    const description = $("#editProductDescription").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products/" + id,
      method: "PUT",
      data: { name, price, color, department, description },
      success: function () {
        loadProducts();
      },
    });
  });
});

//Update
function handleUpdate() {
  let btn = $(this);
  let parentDiv = btn.closest(".myProducts");
  let id = parentDiv.attr("Pid");
  $.get(
    "https://usman-recipes.herokuapp.com/api/products/" + id,
    function (response) {
      $("#editProductModal").val(response._id);
      $("#editProductTitle").val(response.name);
      $("#editProductPrice").val(response.price);
      $("#editProductColor").val(response.color);
      $("#editProductDepartment").val(response.department);
      $("#editProductDescription").val(response.description);
      $("#editProductModal").modal("show");
    }
  );
}

//Delete
function handleDelete() {
  let btn = $(this);
  let parrentDiv = btn.closest(".myProducts");
  let id = parrentDiv.attr("Pid");
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products/" + id,
    method: "DELETE",
    success: function () {
      loadProducts();
    },
  });
}

//POST NEW PRODUCTS
function handleNewProduct() {
  const name = $("#productTitle").val();
  const price = $("#productPrice").val();
  const color = $("#productColor").val();
  const department = $("#productDepartment").val();
  const description = $("#productDescription").val();

  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "POST",
    data: { name, price, color, department, description },
    success: function () {
      $("#addProductModal").modal("hide");
      loadProducts();
    },
  });
}
//GET ONE PRODUCT
function getOneProduct() {
  console.log("BTN CLIKCED");
  const getOneProd = $("#searchField").val();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "GET",
    success: function (response) {
      if (getOneProd === response.name) {
        $("#searchProductModal").modal.show();
        $("#productTitle").text(response.name);
        $("#productPrice").text(response.price);
        $("#productColor").text(response.color);
        "#productDepartment".text(response.department);
        $("#productDescription").text(response.description);
      }
    },
  });
}

//GET ALL PRODUCTS
function loadProducts() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "GET",
    success: function (response) {
      $(".products").empty();

      for (let i = 0; i < response.length; i++) {
        res = response[i];
        $(".products").append(
          `<div class="myProducts" Pid=${res._id}><h3>${res.name}</h3><p><strong>Price:</strong> ${res.price}</br><strong>Color:</strong> ${res.color}</br><strong>Department:</strong> ${res.department} </br><strong>Description:</strong> ${res.description}<p><button class="btn btn-primary btnEdit">Edit</button><button class="btn btn-danger btns btnDelete">Delete</button></div>`
        );
      }
    },
  });
}
