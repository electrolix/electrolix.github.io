const search = document.getElementById("search");
const filter = document.getElementById("filter");
const cards = document.querySelectorAll(".card");

function updateCards(){

    const keyword = search.value.toLowerCase().trim();
    const category = filter.value;

    cards.forEach(card=>{

        const text = card.innerText.toLowerCase();
        const cardCategory = card.dataset.category;

        const matchKeyword = text.includes(keyword);

        const matchCategory =
            category === "all" ||
            cardCategory === category;

        if(matchKeyword && matchCategory){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

}

search.addEventListener("keyup",updateCards);

filter.addEventListener("change",updateCards);
