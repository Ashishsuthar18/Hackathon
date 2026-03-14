let products = JSON.parse(localStorage.getItem("products")) || [];

/* SAVE DATA */
function saveProducts() {
localStorage.setItem("products", JSON.stringify(products));
updateDashboard();
loadProducts();
loadDropdown();
}

/* DASHBOARD STATS */
function updateDashboard() {

let totalProducts = products.length;
let totalStock = 0;
let lowStock = 0;

products.forEach(p => {
totalStock += Number(p.stock) || 0;

if (p.stock < 10) {
lowStock++;
}
});

document.getElementById("totalProducts").innerText = totalProducts;
document.getElementById("totalStock").innerText = totalStock;
document.getElementById("lowStock").innerText = lowStock;

}

/* LOAD PRODUCT TABLE */
function loadProducts() {

const table = document.querySelector("#productsTable tbody");
if (!table) return;

table.innerHTML = "";

products.forEach((p, index) => {

const row = `
<tr>
<td>${p.name}</td>
<td>${p.sku}</td>
<td>${p.category}</td>
<td>${p.unit}</td>
<td>${p.stock}</td>
<td>
<button onclick="deleteProduct(${index})">Delete</button>
</td>
</tr>
`;

table.innerHTML += row;

});

}

/* ADD PRODUCT */
function showAddProductModal() {

let name = prompt("Product Name");
let sku = prompt("SKU Code");
let category = prompt("Category");
let unit = prompt("Unit (pcs/kg)");
let stock = prompt("Initial Stock");

if (!name) return;

products.push({
name: name,
sku: sku,
category: category,
unit: unit,
stock: Number(stock) || 0
});

saveProducts();

}

/* DELETE PRODUCT */
function deleteProduct(index) {

if (confirm("Delete this product?")) {
products.splice(index, 1);
saveProducts();
}

}

/* ADD STOCK */
function addStock() {

let qty = Number(document.getElementById("receiptQuantity").value);
let select = document.getElementById("receiptProduct");
let index = select.selectedIndex - 1;

if (index < 0 || qty <= 0) {
alert("Select product and quantity");
return;
}

products[index].stock += qty;

saveProducts();

}

/* REMOVE STOCK */
function removeStock() {

let qty = Number(document.getElementById("deliveryQuantity").value);
let select = document.getElementById("deliveryProduct");
let index = select.selectedIndex - 1;

if (index < 0 || qty <= 0) {
alert("Select product and quantity");
return;
}

products[index].stock -= qty;

if (products[index].stock < 0) {
products[index].stock = 0;
}

saveProducts();

}

/* LOAD PRODUCT DROPDOWN */
function loadDropdown() {

let receipt = document.getElementById("receiptProduct");
let delivery = document.getElementById("deliveryProduct");

if (!receipt || !delivery) return;

receipt.innerHTML = '<option value="">Select Product</option>';
delivery.innerHTML = '<option value="">Select Product</option>';

products.forEach((p) => {

receipt.innerHTML += `<option>${p.name}</option>`;
delivery.innerHTML += `<option>${p.name}</option>`;

});

}

/* INIT */
updateDashboard();
loadProducts();
loadDropdown();

/* SIDEBAR NAVIGATION */
document.querySelectorAll(".sidebar ul li").forEach(item => {

item.addEventListener("click", function () {

const page = this.getAttribute("data-page");

if (!page) return;

document.querySelectorAll(".page").forEach(p => {
p.classList.remove("active");
});

document.getElementById(page).classList.add("active");

document.querySelectorAll(".sidebar ul li").forEach(li => {
li.classList.remove("active");
});

this.classList.add("active");

});

});
