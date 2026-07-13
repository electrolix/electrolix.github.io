function loadComponent(id, file){

fetch(file)

.then(response => response.text())

.then(data => {

document.getElementById(id).innerHTML=data;

});

}



loadComponent("header","components/header.html");

loadComponent("footer","components/footer.html");



document.addEventListener("click",function(e){


if(e.target.id==="menuBtn"){

document.getElementById("nav")
.classList.toggle("active");

}


});
