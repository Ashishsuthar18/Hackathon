let products = JSON.parse(localStorage.getItem("products")) || [];

/* SAVE DATA */
function saveProducts(){
localStorage.setItem("products", JSON.stringify(products));
updateDashboard();
loadProducts();
loadDropdown();
}

/* DASHBOARD STATS */
function updateDashboard(){

let totalProducts = products.length;
let totalStock = 0;
let lowStock = 0;

products.forEach(p=>{
totalStock += Number(p.stock);

if(p.stock < 10){
lowStock++;
}
});

document.getElementById("totalProducts").innerText = totalProducts;
document.getElementById("totalStock").innerText = totalStock;
document.getElementById("lowStock").innerText = lowStock;

}

/* LOAD PRODUCT TABLE */
function loadProducts(){

const table = document.querySelector("#productsTable tbody");
if(!table) return;

table.innerHTML="";

products.forEach((p,index)=>{

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
function showAddProductModal(){

let name = prompt("Product Name");
let sku = prompt("SKU");
let category = prompt("Category");
let unit = prompt("Unit");
let stock = prompt("Initial Stock");

if(!name) return;

products.push({
name:name,
sku:sku,
category:category,
unit:unit,
stock:Number(stock)
});

saveProducts();

}

/* DELETE PRODUCT */
function deleteProduct(index){

if(confirm("Delete this product?")){
products.splice(index,1);
saveProducts();
}

}

/* ADD STOCK */
function addStock(){

let qty = Number(document.getElementById("receiptQuantity").value);
let productName = document.getElementById("receiptProduct").value;

if(!productName || qty <= 0){
alert("Select product and quantity");
return;
}

let product = products.find(p => p.name === productName);

if(product){
product.stock += qty;
saveProducts();
}

}

/* REMOVE STOCK */
function removeStock(){

let qty = Number(document.getElementById("deliveryQuantity").value);
let productName = document.getElementById("deliveryProduct").value;

if(!productName || qty <= 0){
alert("Select product and quantity");
return;
}

let product = products.find(p => p.name === productName);

if(product){

product.stock -= qty;

if(product.stock < 0){
product.stock = 0;
}

saveProducts();

}

}

/* LOAD DROPDOWN PRODUCTS */
function loadDropdown(){

let receipt = document.getElementById("receiptProduct");
let delivery = document.getElementById("deliveryProduct");

if(!receipt || !delivery) return;

receipt.innerHTML='<option value="">Select Product</option>';
delivery.innerHTML='<option value="">Select Product</option>';

products.forEach(p=>{

receipt.innerHTML += `<option value="${p.name}">${p.name}</option>`;
delivery.innerHTML += `<option value="${p.name}">${p.name}</option>`;

});

}

/* INIT */
updateDashboard();
loadProducts();
loadDropdown();

// Sidebar navigation
document.querySelectorAll(".sidebar ul li").forEach(item => {
item.addEventListener("click", function(){

const page = this.getAttribute("data-page");

if(!page) return;

// hide all pages
document.querySelectorAll(".page").forEach(p=>{
p.classList.remove("active");
});

// show selected page
document.getElementById(page).classList.add("active");

// active menu highlight
document.querySelectorAll(".sidebar ul li").forEach(li=>{
li.classList.remove("active");
});

this.classList.add("active");

});
});