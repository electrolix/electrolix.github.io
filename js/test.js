document.querySelectorAll(".faq-question").forEach(function(question) {

    question.addEventListener("click", function() {

        const item = this.parentElement;
        const answer = item.querySelector(".faq-answer");

        // Close other FAQs
        document.querySelectorAll(".faq-item").forEach(function(otherItem) {
            if (otherItem !== item) {
                otherItem.classList.remove("active");
                otherItem.querySelector(".faq-answer").style.maxHeight = null;
            }
        });

        // Toggle current FAQ
        item.classList.toggle("active");

        if (item.classList.contains("active")) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }

    });

});
