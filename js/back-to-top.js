const backToTop = document.createElement("a");

backToTop.id = "backToTop";
backToTop.href = "#";

backToTop.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 24 24"
     fill="none"
     stroke="currentColor"
     stroke-width="2.8"
     stroke-linecap="round"
     stroke-linejoin="round">
    <path d="M12 19V5"/>
    <path d="M5 12l7-7 7 7"/>
</svg>
`;

document.body.appendChild(backToTop);

window.addEventListener("scroll",function(){

    if(window.scrollY>300){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click",function(e){

    e.preventDefault();

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
