const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuBtn.onclick = () => {

    nav.classList.toggle("active");

    if(nav.classList.contains("active")){
        menuBtn.innerHTML='<i class="fas fa-times"></i>';
    }
    else{
        menuBtn.innerHTML='<i class="fas fa-bars"></i>';
    }

}
