// Load Header
fetch("header.html")
.then(response => response.text())
.then(data => {
    document.getElementById("header").innerHTML = data;

    // Your existing menu JS
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
});


// Load Footer
fetch("footer.html")
.then(response => response.text())
.then(data => {
    document.getElementById("footer").innerHTML = data;
});
