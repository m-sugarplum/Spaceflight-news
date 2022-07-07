// const articlesUrl = "https://api.spaceflightnewsapi.net/v3/articles";
// const getAnother15url = "https://api.spaceflightnewsapi.net/v3/articles?_start=15&_limit=15";
// const get15Articles = "https://api.spaceflightnewsapi.net/v3/articles?pagination[start]=1&pagination[limit]=15";
// const countUrl = "https://api.spaceflightnewsapi.net/v3/articles/count";
// const get15url = "https://api.spaceflightnewsapi.net/v3/articles?_start=0&_limit=15";


let defaultNumber = 15;

const slider = document.getElementById("num-of-articles");

const cardsDisplay = document.getElementsByClassName("main");


slider.addEventListener("change", (event) => {
    const selectedValueDisplay = document.getElementById("selected-value");
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
    let articlesTotal = null;
    const fetchedCount = await getArticlesCount()
    articlesTotal = fetchedCount;
    const countDisplay = document.getElementById("count");
    countDisplay.innerText = articlesTotal;
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


const displayArticles = async (numOfArticles) => {
    const fetchedArticles = await getArticles(0, numOfArticles);
    console.log(fetchedArticles);
    for (let i = 0; i < numOfArticles; i++) {

        const newCard = document.createElement("article");
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

        const newFooter = document.createElement("footer");
        const newParagraph = document.createElement("p");
        // console.log(fetchedArticles[i].publishedAt.getMonth())
        const publishDate = fetchedArticles[i].publishedAt.split("T")[0];
        const day = publishDate.split("-")[2];
        const month = publishDate.split("-")[1];
        const year = publishDate.split("-")[0];
        const newsSite = fetchedArticles[i].newsSite;
        newParagraph.innerHTML = `<b>${newsSite}</b>   ${day}.${month}.${year}`;
        newFooter.append(newParagraph);
        newCard.append(newImg, newTitle, newSummary, newFooter);

        const cardsDisplay = document.getElementsByClassName("main");
        cardsDisplay[0].append(newCard);
    }
}

window.onload = (event) => {
    displayArticles(defaultNumber);
};

displayArticlesCount();


console.log("HELLO FROM THE SCRIPT!");

