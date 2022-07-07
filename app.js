// const articlesUrl = "https://api.spaceflightnewsapi.net/v3/articles";
// const getAnother15url = "https://api.spaceflightnewsapi.net/v3/articles?_start=15&_limit=15";
// const get15Articles = "https://api.spaceflightnewsapi.net/v3/articles?pagination[start]=1&pagination[limit]=15";
const countUrl = "https://api.spaceflightnewsapi.net/v3/articles/count";
const get15url = "https://api.spaceflightnewsapi.net/v3/articles?_start=0&_limit=15";

let numOfArticles = 100;
let limitNumber = 15;
let startNumber = 0;
const slider = document.getElementById("num-of-articles");
const selectedValueDisplay = document.getElementById("selected-value");
// console.log(slider.value, selectedValue.innerText);
// const mainDiv = document.getElementsByClassName("main");
const cardsDisplay = document.getElementsByClassName("main");


slider.addEventListener("change", (event) => {
    const newNum = event.target.value;
    console.log(newNum);
    selectedValueDisplay.innerText = newNum;
    cardsDisplay[0].remove();
    const body = document.getElementsByTagName("BODY")[0];
    const newMain = document.createElement("div");
    newMain.classList.add("main");
    body.append(newMain);
    displayArticles(newNum);
})


const getArticlesCount = async () => {
    try {
        const res = await fetch("https://api.spaceflightnewsapi.net/v3/articles/count");
        const data = await res.json();
        return data
    } catch (err) {
        console.log("ERROR :( ", err);
    }
};


const displayArticlesCount = async () => {
    const fetchedCount = await getArticlesCount()
    numOfArticles = fetchedCount;
    const countDisplay = document.getElementById("count");
    countDisplay.innerText = numOfArticles;
}


const getArticles = async (startNumber, limitNumber) => {
    try {
        const res = await fetch(`https://api.spaceflightnewsapi.net/v3/articles?_start=${startNumber}&_limit=${limitNumber}`);
        const data = await res.json();
        return data
    } catch (err) {
        console.log("ERROR :( ", err);
    }
};


const displayArticles = async (num) => {
    // const displayNumber = selectedNum + articlesToAdd;
    const fetchedArticles = await getArticles(startNumber, num);
    console.log(fetchedArticles);
    const cardsDisplay = document.getElementsByClassName("main");

    for (let i = 0; i < numOfArticles; i++) {

        const newCard = document.createElement("div");
        newCard.classList.add("card")
        const newImg = document.createElement("img");
        newImg.src = fetchedArticles[i].imageUrl;
        newImg.classList.add("article-image")
        const newTitle = document.createElement("h3");
        newTitle.innerText = fetchedArticles[i].title;
        newTitle.classList.add("article-title");
        const newSummary = document.createElement("p");
        newSummary.innerText = fetchedArticles[i].summary;
        newSummary.classList.add("article-summary");
        newCard.append(newImg, newTitle, newSummary);
        const cardsDisplay = document.getElementsByClassName("main");
        cardsDisplay[0].append(newCard);
    }
}

window.onload = (event) => {
    displayArticles(limitNumber);
};

displayArticlesCount();





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

