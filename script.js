function loadComponent(id, file){

fetch(file)
.then(response => response.text())
.then(data => {

document.getElementById(id).innerHTML = data;


// Header loaded, now activate menu

if(id === "header"){

const menuBtn = document.getElementById("menuBtn");

const nav = document.getElementById("nav");


menuBtn.addEventListener("click",()=>{

    nav.classList.toggle("active");

});

}


});

}


loadComponent("header", "components/header.html");

loadComponent("footer", "components/footer.html");
