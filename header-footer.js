// Load Header
fetch("header.html")
.then(response => response.text())
.then(data => {

    document.getElementById("header").innerHTML = data;

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");

    if(menuBtn){

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("active");

        });

    }

});

// Load Footer
fetch("footer.html")
.then(response => response.text())
.then(data => {

    document.getElementById("footer").innerHTML = data;

});
