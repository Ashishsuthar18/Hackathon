document.getElementById("loginForm").addEventListener("submit", function(e){

e.preventDefault();

let username = document.getElementById("username").value;
let password = document.getElementById("password").value;

if(username === "admin" && password === "admin123"){

window.location="dashboard.html";

}else{

document.getElementById("message").innerText="Invalid login";

}

});
