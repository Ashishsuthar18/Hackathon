let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct(name, sku, category, unit, stock){

    const product = {
        name,
        sku,
        category,
        unit,
        stock
    };

    products.push(product);

    if(p.stock < 10){
        rowClass="low-stock";
    }

    function deleteProduct(index){
    if(confirm("Delete this product?")){
        products.splice(index,1);
        saveProducts();
        }
    }

    localStorage.setItem("products", JSON.stringify(products));
}