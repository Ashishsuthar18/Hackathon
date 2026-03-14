let products = JSON.parse(localStorage.getItem("products")) || [];

function addStock(index, quantity){
    products[index].stock += Number(quantity);
    localStorage.setItem("products", JSON.stringify(products));
}

function removeStock(index, quantity){
    products[index].stock -= Number(quantity);
    localStorage.setItem("products", JSON.stringify(products));
}