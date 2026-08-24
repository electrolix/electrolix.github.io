
/* =========================================================
   BLOG LINKS
========================================================= */

const blogLinks = [

   "https://electrolix.github.io/finolex-0-75-mm-wire-complete-guide.html",

   "https://electrolix.github.io/finolex-copper-wires-guide.html",

   "https://electrolix.github.io/finolex-90-mtr-wires-buying-guide.html",

    "https://electrolix.github.io/finolex-frlsh-wires-explained.html",

    "https://electrolix.github.io/finolex-frls-wires-features-uses.html",

    "https://electrolix.github.io/finolex-fr-wires-features-sizes-uses.html",

    "https://electrolix.github.io/finolex-4-sq-mm-wire-uses-specifications.html",

    "https://electrolix.github.io/finolex-6-sq-mm-wire-guide.html",

    "https://electrolix.github.io/understanding-finolex-1-5-sq-mm-wire.html",

    "https://electrolix.github.io/finolex-1-sq-mm-wire-details.html",

    "https://electrolix.github.io/finolex-wires-for-lighting-guide.html",

    "https://electrolix.github.io/understanding-finolex-wires-power-sockets.html",

    "https://electrolix.github.io/finolex-industrial-cables-types-sizes-guide.html",     

];


/* =========================================================
   PAGINATION SETTINGS
========================================================= */

const ARTICLES_PER_PAGE = 6;


/* =========================================================
   DATA
========================================================= */

let allArticles = [];

let currentPage = 1;


/* =========================================================
   META
========================================================= */

function getMeta(doc, selector){

    const element =
        doc.querySelector(selector);

    if(element){

        return (
            element.getAttribute("content")
            || ""
        );

    }

    return "";

}


/* =========================================================
   DATE
========================================================= */

function getDate(doc){

    const scripts =
        doc.querySelectorAll(
            'script[type="application/ld+json"]'
        );

    for(const script of scripts){

        try{

            const data =
                JSON.parse(
                    script.textContent
                );

            const items =
                data["@graph"]
                    ? data["@graph"]
                    : [data];

            for(const item of items){

                if(item.datePublished){

                    return item.datePublished;

                }

            }

        }

        catch(error){

            // Ignore invalid JSON

        }

    }

    return "";

}


/* =========================================================
   IMAGE
========================================================= */

function getHeroImage(doc){

    const image =
        doc.querySelector(
            ".hero-right img"
        );

    if(!image){

        return "";

    }

    const src =
        image.getAttribute("src");

    if(!src){

        return "";

    }

    try{

        return new URL(
            src,
            doc.baseURI
        ).href;

    }

    catch(error){

        return src;

    }

}


/* =========================================================
   REAL ARTICLE DESCRIPTION
========================================================= */

function getArticleDescription(doc){

    let description =
        getMeta(
            doc,
            'meta[property="og:description"]'
        );

    if(description){

        return cleanText(description);

    }


    description =
        getMeta(
            doc,
            'meta[name="description"]'
        );

    if(description){

        return cleanText(description);

    }


    const selectors = [

        ".article-excerpt",

        ".article-description",

        ".post-excerpt",

        ".post-description",

        ".excerpt",

        ".hero-description",

        ".hero p",

        "article p"

    ];


    for(const selector of selectors){

        const element =
            doc.querySelector(selector);

        if(element){

            const text =
                cleanText(
                    element.textContent
                );

            if(text.length > 40){

                return shortenText(text);

            }

        }

    }


    const paragraphs =
        doc.querySelectorAll("p");

    for(const paragraph of paragraphs){

        const text =
            cleanText(
                paragraph.textContent
            );

        if(text.length > 60){

            return shortenText(text);

        }

    }


    return "";

}


/* =========================================================
   CLEAN TEXT
========================================================= */

function cleanText(text){

    return String(text || "")
        .replace(/\s+/g," ")
        .trim();

}


/* =========================================================
   SHORTEN REAL TEXT
========================================================= */

function shortenText(text){

    if(text.length <= 180){

        return text;

    }

    return (
        text
            .substring(0,180)
            .replace(/\s+\S*$/,"")
            .trim()
        + "..."
    );

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(date){

    if(!date){

        return "";

    }

    const parsed =
        new Date(date);

    if(isNaN(parsed)){

        return "";

    }

    return parsed.toLocaleDateString(
        "en-IN",
        {
            day:"numeric",
            month:"short",
            year:"numeric"
        }
    );

}


/* =========================================================
   FETCH ARTICLE
========================================================= */

async function fetchArticle(url){

    try{

        const response =
            await fetch(url);

        if(!response.ok){

            throw new Error(
                "Article could not be loaded"
            );

        }

        const html =
            await response.text();

        const parser =
            new DOMParser();

        const doc =
            parser.parseFromString(
                html,
                "text/html"
            );


        const title =

            getMeta(
                doc,
                'meta[property="og:title"]'
            )

            ||

            doc.querySelector("h1")
                ?.textContent

            ||

            doc.querySelector("title")
                ?.textContent

            ||

            "Electrolix Article";


        const description =
            getArticleDescription(doc);


        const image =
            getHeroImage(doc);


        return {

            title:
                cleanText(title),

            description:
                description,

            image:
                image,

            date:
                getDate(doc),

            url:
                url

        };

    }

    catch(error){

        console.error(
            "Failed:",
            url,
            error
        );

        return null;

    }

}


/* =========================================================
   LOAD ALL
========================================================= */

async function loadArticles(){

    const requests =
        blogLinks.map(
            url =>
                fetchArticle(url)
        );


    const results =
        await Promise.all(
            requests
        );


    allArticles =
        results.filter(
            article =>
                article !== null
        );


    document.getElementById(
        "articleCount"
    ).textContent =
        allArticles.length
        +
        (
            allArticles.length === 1
                ? " Article"
                : " Articles"
        );


    /* Set hero image from first article */

    if(allArticles[0]?.image){

        document.getElementById(
            "heroArticleImage"
        ).src =
            allArticles[0].image;

    }

    else{

        document.getElementById(
            "heroArticleImage"
        ).style.display =
            "none";

    }


    currentPage = 1;

    renderArticles();

}


/* =========================================================
   FEATURED
========================================================= */

function renderFeatured(article){

    const container =
        document.getElementById(
            "featuredArticle"
        );


    if(!article){

        container.innerHTML = `

            <div class="message">

                <h3>
                    No article available
                </h3>

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <a
            href="${escapeHtml(article.url)}"
            class="featured-image"
        >

            ${
                article.image

                ?

                `
                <img
                    src="${escapeHtml(article.image)}"
                    alt="${escapeHtml(article.title)}"
                    loading="eager"
                >
                `

                :

                `
                <div class="message">
                    No image available
                </div>
                `

            }

        </a>


        <div class="featured-content">

            <div class="featured-label">
                Featured Guide
            </div>


            ${
                article.date

                ?

                `
                <div class="article-date">
                    ${formatDate(article.date)}
                </div>
                `

                :

                ""

            }


            <h2 class="featured-title">

                ${escapeHtml(article.title)}

            </h2>


            ${
                article.description

                ?

                `
                <p class="featured-description">

                    ${escapeHtml(
                        article.description
                    )}

                </p>
                `

                :

                ""

            }


            <a
                href="${escapeHtml(article.url)}"
                class="read-button"
            >

                Read Article

                <span>→</span>

            </a>

        </div>

    `;

}


/* =========================================================
   PAGINATION
========================================================= */

function renderPagination(totalArticles){

    const pagination =
        document.getElementById(
            "articlesPagination"
        );


    const totalPages =
        Math.ceil(
            totalArticles /
            ARTICLES_PER_PAGE
        );


    if(totalPages <= 1){

        pagination.innerHTML = "";

        return;

    }


    let html = "";


    /* PREVIOUS */

    html += `

        <button
            class="pagination-button pagination-arrow ${
                currentPage === 1
                    ? "disabled"
                    : ""
            }"
            data-page="${currentPage - 1}"
            aria-label="Previous page"
            ${
                currentPage === 1
                    ? "disabled"
                    : ""
            }
        >
            ←
        </button>

    `;


    /* PAGE NUMBERS */

    for(
        let page = 1;
        page <= totalPages;
        page++
    ){

        html += `

            <button
                class="pagination-button ${
                    page === currentPage
                        ? "active"
                        : ""
                }"
                data-page="${page}"
                aria-label="Page ${page}"
                ${
                    page === currentPage
                        ? 'aria-current="page"'
                        : ""
                }
            >

                ${page}

            </button>

        `;

    }


    /* NEXT */

    html += `

        <button
            class="pagination-button pagination-arrow ${
                currentPage === totalPages
                    ? "disabled"
                    : ""
            }"
            data-page="${currentPage + 1}"
            aria-label="Next page"
            ${
                currentPage === totalPages
                    ? "disabled"
                    : ""
            }
        >
            →
        </button>

    `;


    pagination.innerHTML = html;


    /* PAGE CLICK EVENTS */

    pagination
        .querySelectorAll(
            ".pagination-button:not(.disabled)"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function(){

                    const page =
                        Number(
                            this.dataset.page
                        );


                    if(
                        !page ||
                        page === currentPage
                    ){

                        return;

                    }


                    currentPage = page;


                    renderArticles();


                    document
                        .getElementById(
                            "articlesGrid"
                        )
                        .scrollIntoView({
                            behavior:"smooth",
                            block:"start"
                        });

                }
            );

        });

}


/* =========================================================
   RENDER CARDS
========================================================= */

function renderArticles(){

    const grid =
        document.getElementById(
            "articlesGrid"
        );


    const search =
        document.getElementById(
            "articleSearch"
        )
        .value
        .toLowerCase()
        .trim();


    const filtered =
        allArticles.filter(
            article => {

                return (

                    article.title
                        .toLowerCase()
                        .includes(search)

                    ||

                    article.description
                        .toLowerCase()
                        .includes(search)

                );

            }
        );


    document.getElementById(
        "resultsText"
    ).textContent =
        filtered.length
        +
        (
            filtered.length === 1
                ? " article found"
                : " articles found"
        );


    /* FEATURED */

    if(!search){

        renderFeatured(
            allArticles[0]
        );


        document.getElementById(
            "featuredArticle"
        ).style.display =
            "grid";

    }

    else{

        document.getElementById(
            "featuredArticle"
        ).style.display =
            "none";

    }


    /* NO RESULTS */

    if(filtered.length === 0){

        grid.innerHTML = `

            <div class="message">

                <h3>
                    No articles found
                </h3>

                <p>
                    Try another search term.
                </p>

            </div>

        `;


        document.getElementById(
            "articlesPagination"
        ).innerHTML = "";

        return;

    }


    /* REMOVE FEATURED FROM NORMAL LIST */

    const articles =
        search
            ? filtered
            : filtered.slice(1);


    /* TOTAL PAGES */

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                articles.length /
                ARTICLES_PER_PAGE
            )
        );


    if(currentPage > totalPages){

        currentPage = totalPages;

    }


    /* CURRENT PAGE */

    const startIndex =
        (
            currentPage - 1
        ) *
        ARTICLES_PER_PAGE;


    const endIndex =
        startIndex +
        ARTICLES_PER_PAGE;


    const pageArticles =
        articles.slice(
            startIndex,
            endIndex
        );


    /* RENDER ARTICLE CARDS */

    if(pageArticles.length === 0){

        grid.innerHTML = "";

    }

    else{

        grid.innerHTML =
            pageArticles.map(
                article => `

                <article class="article-card">


                    <a
                        href="${escapeHtml(article.url)}"
                        class="article-image"
                    >

                        ${
                            article.image

                            ?

                            `
                            <img
                                src="${escapeHtml(article.image)}"
                                alt="${escapeHtml(article.title)}"
                                loading="lazy"
                            >
                            `

                            :

                            `
                            <div class="message">
                                No image
                            </div>
                            `

                        }

                    </a>


                    <div class="article-content">


                        <div class="article-meta">

                            ${
                                article.date
                                    ? formatDate(article.date)
                                    : "Electrolix Guide"
                            }

                        </div>


                        <h2 class="article-title">

                            <a
                                href="${escapeHtml(article.url)}"
                            >

                                ${escapeHtml(
                                    article.title
                                )}

                            </a>

                        </h2>


                        ${
                            article.description

                            ?

                            `
                            <p class="article-description">

                                ${escapeHtml(
                                    article.description
                                )}

                            </p>
                            `

                            :

                            ""

                        }


                        <a
                            href="${escapeHtml(article.url)}"
                            class="article-read"
                        >

                            Read Article

                            <span>→</span>

                        </a>


                    </div>


                </article>

            `
            ).join("");

    }


    /* RENDER PAGINATION */

    renderPagination(
        articles.length
    );

}


/* =========================================================
   SECURITY
========================================================= */

function escapeHtml(text){

    const div =
        document.createElement("div");

    div.textContent =
        text || "";

    return div.innerHTML;

}


/* =========================================================
   SEARCH
========================================================= */

document
    .getElementById(
        "articleSearch"
    )
    .addEventListener(
        "input",
        function(){

            currentPage = 1;

            renderArticles();

        }
    );


/* =========================================================
   START
========================================================= */

loadArticles();

