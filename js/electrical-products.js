
/* =========================================================
   BLOG LINKS
========================================================= */

const blogLinks = [

   "https://electrolix.github.io/finolex-0-75-mm-wire-complete-guide.html",

   "https://electrolix.github.io/finolex-90-mtr-wires-buying-guide.html",

    "https://electrolix.github.io/finolex-frlsh-wires-explained.html",

    "https://electrolix.github.io/finolex-frls-wires-features-uses.html",

    "https://electrolix.github.io/finolex-fr-wires-features-sizes-uses.html",

    "https://electrolix.github.io/finolex-4-sq-mm-wire-uses-specifications.html",

    "https://electrolix.github.io/finolex-6-sq-mm-wire-guide.html",

    "https://electrolix.github.io/finolex-copper-wires-guide.html", 

    "https://electrolix.github.io/understanding-finolex-1-5-sq-mm-wire.html",

    "https://electrolix.github.io/finolex-1-sq-mm-wire-details.html",

    "https://electrolix.github.io/finolex-wires-for-lighting-guide.html",

    "https://electrolix.github.io/understanding-finolex-wires-power-sockets.html",

    "https://electrolix.github.io/finolex-industrial-cables-types-sizes-guide.html",   

    "https://electrolix.github.io/finolex-house-wiring-domestic-commercial-cables.html", 

    "https://electrolix.github.io/finolex-wires-and-cables-overview.html", 

    "https://electrolix.github.io/finolex-silver-wire-selection-guide.html",

    "https://electrolix.github.io/finolex-gold-wire-selection-guide.html",

    "https://electrolix.github.io/finolex-wire-suppliers-in-bangalore.html",

    "https://electrolix.github.io/polycab-green-wire-complete-guide.html", 
   
    "https://electrolix.github.io/polycab-industrial-cables-selection.html",

    "https://electrolix.github.io/polycab-etira-fr-wire-complete-information.html",
   
 

];


const ARTICLES_PER_PAGE=6;let allArticles=[],currentPage=1;function getMeta(e,t){let r=e.querySelector(t);return r&&r.getAttribute("content")||""}function getDate(e){let t=e.querySelectorAll('script[type="application/ld+json"]');for(let r of t)try{let a=JSON.parse(r.textContent),l=a["@graph"]?a["@graph"]:[a];for(let i of l)if(i.datePublished)return i.datePublished}catch(n){}return""}function getHeroImage(e){let t=e.querySelector(".hero-right img");if(!t)return"";let r=t.getAttribute("src");if(!r)return"";try{return new URL(r,e.baseURI).href}catch(a){return r}}function getArticleDescription(e){let t=getMeta(e,'meta[property="og:description"]');if(t||(t=getMeta(e,'meta[name="description"]')))return cleanText(t);for(let r of[".article-excerpt",".article-description",".post-excerpt",".post-description",".excerpt",".hero-description",".hero p","article p"]){let a=e.querySelector(r);if(a){let l=cleanText(a.textContent);if(l.length>40)return shortenText(l)}}let i=e.querySelectorAll("p");for(let n of i){let c=cleanText(n.textContent);if(c.length>60)return shortenText(c)}return""}function cleanText(e){return String(e||"").replace(/\s+/g," ").trim()}function shortenText(e){return e.length<=180?e:e.substring(0,180).replace(/\s+\S*$/,"").trim()+"..."}function formatDate(e){if(!e)return"";let t=new Date(e);return isNaN(t)?"":t.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}async function fetchArticle(e){try{let t=await fetch(e);if(!t.ok)throw Error("Article could not be loaded");let r=await t.text(),a=new DOMParser,l=a.parseFromString(r,"text/html"),i=getMeta(l,'meta[property="og:title"]')||l.querySelector("h1")?.textContent||l.querySelector("title")?.textContent||"Electrolix Article",n=getArticleDescription(l),c=getHeroImage(l);return{title:cleanText(i),description:n,image:c,date:getDate(l),url:e}}catch(s){return console.error("Failed:",e,s),null}}async function loadArticles(){let e=blogLinks.map(e=>fetchArticle(e)),t=await Promise.all(e);allArticles=t.filter(e=>null!==e),document.getElementById("articleCount").textContent=allArticles.length+(1===allArticles.length?" Article":" Articles"),allArticles[0]?.image?document.getElementById("heroArticleImage").src=allArticles[0].image:document.getElementById("heroArticleImage").style.display="none",currentPage=1,renderArticles()}function renderFeatured(e){let t=document.getElementById("featuredArticle");if(!e){t.innerHTML=`

            <div class="message">

                <h3>
                    No article available
                </h3>

            </div>

        `;return}t.innerHTML=`

        <a
            href="${escapeHtml(e.url)}"
            class="featured-image"
        >

            ${e.image?`
                <img
                    src="${escapeHtml(e.image)}"
                    alt="${escapeHtml(e.title)}"
                    loading="eager"
                >
                `:`
                <div class="message">
                    No image available
                </div>
                `}

        </a>


        <div class="featured-content">

            <div class="featured-label">
                Featured Guide
            </div>


            ${e.date?`
                <div class="article-date">
                    ${formatDate(e.date)}
                </div>
                `:""}


            <h2 class="featured-title">

                ${escapeHtml(e.title)}

            </h2>


            ${e.description?`
                <p class="featured-description">

                    ${escapeHtml(e.description)}

                </p>
                `:""}


            <a
                href="${escapeHtml(e.url)}"
                class="read-button"
            >

                Read Article

                <span>→</span>

            </a>

        </div>

    `}function renderPagination(e){let t=document.getElementById("articlesPagination"),r=Math.ceil(e/6);if(r<=1){t.innerHTML="";return}let a="";a+=`

        <button
            class="pagination-button pagination-arrow ${1===currentPage?"disabled":""}"
            data-page="${currentPage-1}"
            aria-label="Previous page"
            ${1===currentPage?"disabled":""}
        >
            ←
        </button>

    `;for(let l=1;l<=r;l++)a+=`

            <button
                class="pagination-button ${l===currentPage?"active":""}"
                data-page="${l}"
                aria-label="Page ${l}"
                ${l===currentPage?'aria-current="page"':""}
            >

                ${l}

            </button>

        `;a+=`

        <button
            class="pagination-button pagination-arrow ${currentPage===r?"disabled":""}"
            data-page="${currentPage+1}"
            aria-label="Next page"
            ${currentPage===r?"disabled":""}
        >
            →
        </button>

    `,t.innerHTML=a,t.querySelectorAll(".pagination-button:not(.disabled)").forEach(e=>{e.addEventListener("click",function(){let e=Number(this.dataset.page);e&&e!==currentPage&&(currentPage=e,renderArticles(),document.getElementById("articlesGrid").scrollIntoView({behavior:"smooth",block:"start"}))})})}function renderArticles(){let e=document.getElementById("articlesGrid"),t=document.getElementById("articleSearch").value.toLowerCase().trim(),r=allArticles.filter(e=>e.title.toLowerCase().includes(t)||e.description.toLowerCase().includes(t));if(document.getElementById("resultsText").textContent=r.length+(1===r.length?" article found":" articles found"),t?document.getElementById("featuredArticle").style.display="none":(renderFeatured(allArticles[0]),document.getElementById("featuredArticle").style.display="grid"),0===r.length){e.innerHTML=`

            <div class="message">

                <h3>
                    No articles found
                </h3>

                <p>
                    Try another search term.
                </p>

            </div>

        `,document.getElementById("articlesPagination").innerHTML="";return}let a=t?r:r.slice(1),l=Math.max(1,Math.ceil(a.length/6));currentPage>l&&(currentPage=l);let i=(currentPage-1)*6,n=a.slice(i,i+6);0===n.length?e.innerHTML="":e.innerHTML=n.map(e=>`

                <article class="article-card">


                    <a
                        href="${escapeHtml(e.url)}"
                        class="article-image"
                    >

                        ${e.image?`
                            <img
                                src="${escapeHtml(e.image)}"
                                alt="${escapeHtml(e.title)}"
                                loading="lazy"
                            >
                            `:`
                            <div class="message">
                                No image
                            </div>
                            `}

                    </a>


                    <div class="article-content">


                        <div class="article-meta">

                            ${e.date?formatDate(e.date):"Electrolix Guide"}

                        </div>


                        <h2 class="article-title">

                            <a
                                href="${escapeHtml(e.url)}"
                            >

                                ${escapeHtml(e.title)}

                            </a>

                        </h2>


                        ${e.description?`
                            <p class="article-description">

                                ${escapeHtml(e.description)}

                            </p>
                            `:""}


                        <a
                            href="${escapeHtml(e.url)}"
                            class="article-read"
                        >

                            Read Article

                            <span>→</span>

                        </a>


                    </div>


                </article>

            `).join(""),renderPagination(a.length)}function escapeHtml(e){let t=document.createElement("div");return t.textContent=e||"",t.innerHTML}document.getElementById("articleSearch").addEventListener("input",function(){currentPage=1,renderArticles()}),loadArticles();

