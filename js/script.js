fetch("../components/header.html")
.then(response => response.text())
.then(data => {

    document.getElementById("header").innerHTML = data;


    const menuBtn = document.getElementById("menuBtn");

    const nav = document.getElementById("nav");

    menuBtn.addEventListener("click",()=>{

        nav.classList.toggle("active");

    });

});


fetch("../components/footer.html")
.then(response => response.text())
.then(data => {

    document.getElementById("footer").innerHTML = data;

});
