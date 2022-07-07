// const articlesUrl = "https://api.spaceflightnewsapi.net/v3/articles";
const articlesCountUrl = "https://api.spaceflightnewsapi.net/v3/articles/count";
const get15url = "https://api.spaceflightnewsapi.net/v3/articles?_start=0&_limit=15";
// const getAnother15url = "https://api.spaceflightnewsapi.net/v3/articles?_start=15&_limit=15";
// const get15Articles = "https://api.spaceflightnewsapi.net/v3/articles?pagination[start]=1&pagination[limit]=15";
const cardsDisplay = document.querySelector(".show-articles");
const numOfArticles = 15;

const get15Articles = async () => {
    try {
        const res = await fetch(get15url);
        const data = await res.json();
        // console.log(data);
        // console.log(data[0].summary);
        return data
    } catch (err) {
        console.log("ERROR :( ", err);
    }
};



const displayArticles = async () => {
    const fetchedArticles = await get15Articles();
    console.log(fetchedArticles);

    for (let i = 0; i < numOfArticles; i++) {

        const newCard = document.createElement("div");
        newCard.classList.add("card")
        const newImg = document.createElement("img");

        newImg.src = fetchedArticles[i].imageUrl;
        newImg.classList.add("article-image")
        const newTitle = document.createElement("h3");
        newTitle.innerText = fetchedArticles[i].title;
        const newSummary = document.createElement("p");
        newSummary.innerText = fetchedArticles[i].summary;
        newCard.append(newImg, newTitle, newSummary);
        cardsDisplay.appendChild(newCard);
    }
}

displayArticles();



// const articles = get15Articles();
// console.log(articles)

// fetch(get15Articles)
//     .then((res) => {
//         return res.json();
//     })
//     .then((articles) => {
//         console.log(articles)
//     })
//     .catch((err) => {
//         console.log("ERROR :( ", err);
//     });


// fetch(getAnother15Articles)
//     .then((res) => {
//         return res.json();
//     })
//     .then((articles) => {
//         console.log(articles)
//     })
//     .catch((err) => {
//         console.log("ERROR :( ", err);
//     });

console.log("HELLO FROM THE SCRIPT!");

