const selectSort = document.getElementById("sort");
const cardsDisplay = document.getElementsByClassName("main");

let storedArticlesId = Object.keys(localStorage);
let storedArticlesCount = localStorage.length;


window.addEventListener("click", (event) => {
    // Function to check if the article has already been added to the library > 
    // saves or removes the article depending on the state of the star icon (checks if it has a "star-fill" class)
    const addedClasses = event.target.classList;
    const targetId = event.target.id;
    if (addedClasses.contains("star")) {
        if (addedClasses.contains("star-fill") && Object.keys(localStorage).includes(targetId)) {
            console.log(targetId);
            localStorage.removeItem(`${targetId}`);
            console.log("Article REMOVED FROM LIBRARY");
            event.target.classList.toggle("star-fill");
        } else if (!addedClasses.contains("star-fill") && !Object.keys(localStorage).includes(targetId)) {
            console.log(targetId);
            event.target.classList.toggle("star-fill");
            localStorage.setItem(`${event.target.id}`, `${event.target.id}`);
            (console.log("Article SAVED IN LIBRARY"));
        }
        else {
            console.log("Something went wrong");
        }
    }
});


const displayTotalSavedArticles = () => {
    // Function checking number of ids in localStorage and displaying this number above the articles
    const totalSavedArticles = document.getElementById("total-saved-articles");
    totalSavedArticles.innerText = storedArticlesCount;
};


selectSort.addEventListener("change", (event) => {
    // Function changing the order of articles on the page depending on selected sort type (default: Publish Date descending)
    selectedSort = event.target.value;
    cardsDisplay[0].remove();
    const body = document.getElementsByTagName("BODY")[0];
    const newMain = document.createElement("div");
    newMain.classList.add("main");
    body.append(newMain);

    if (selectedSort === "date-asc") {
        displayArticles("publishedAt:asc");
    }
    else if (selectedSort === "date-desc") {
        displayArticles("publishedAt:desc");
    }
    else if (selectedSort === "title") {
        displayArticles("title");
    }
    else {
        console.log("something went wrong");
    }
});

const getSavedArticles = async (sortType) => {
    // Function fetching articles saved in the library
    let url = `https://api.spaceflightnewsapi.net/v3/articles?`;
    try {
        for (let article of storedArticlesId) {
            newUrl = url.concat(`id_in=${article}&`);
            url = newUrl
        }
        url = url.concat(`_sort=${sortType}`);
        const res = await fetch(url);
        const data = await res.json();
        return data
    } catch (err) {
        console.log("ERROR :( ", err);
    }
};


const displayArticles = async (sortType) => {
    // Function displaying fetched articles on the website
    const fetchedArticles = await getSavedArticles(sortType);
    for (let i = 0; i < storedArticlesCount; i++) {
        const newCard = document.createElement("article");
        newCard.classList.add("card");
        const newStar = document.createElement("img");
        if (storedArticlesId.includes(`${fetchedArticles[i].id}`)) {
            // checking if article was saved as favourite - adding filled star icon (otherwise > empty star)
            newStar.classList.add("star", "star-fill");
        }
        else {
            newStar.classList.add("star");
        }
        newStar.setAttribute("src", "./photos/star.svg");
        newStar.setAttribute("id", `${fetchedArticles[i].id}`);

        const newImg = document.createElement("img");
        newImg.src = fetchedArticles[i].imageUrl;
        newImg.classList.add("article-image")
        const newTitle = document.createElement("h3");
        newTitle.innerText = fetchedArticles[i].title;
        newTitle.classList.add("article-title");
        const newSummary = document.createElement("p");
        let summaryText = fetchedArticles[i].summary;
        if (summaryText.length > 200) {
            // checking if summary is over 200 characters - deleting more characters and adding ""...""
            summaryText = `${summaryText.slice(0, 200)} [...]`
        }
        newSummary.innerText = summaryText
        newSummary.classList.add("article-summary");
        const newLink = document.createElement("a");
        newLink.setAttribute("id", "full-article-link");
        newLink.setAttribute("href", `${fetchedArticles[i].url}`);
        newLink.setAttribute("target", "_blank");
        newLink.text = "Read more";
        const newFooter = document.createElement("footer");
        const newParagraph = document.createElement("p");
        const publishDate = fetchedArticles[i].publishedAt.split("T")[0];
        const day = publishDate.split("-")[2];
        const month = publishDate.split("-")[1];
        const year = publishDate.split("-")[0];
        const newsSite = fetchedArticles[i].newsSite;
        newParagraph.innerHTML = `<b>${newsSite}</b>&nbsp;&nbsp;${day}.${month}.${year}`;
        // changing how date is displayed to day.month.year
        newFooter.append(newParagraph);
        newCard.append(newImg, newStar, newTitle, newSummary, newLink, newFooter);
        const cardsDisplay = document.getElementsByClassName("main");
        cardsDisplay[0].append(newCard);

    }
    if (storedArticlesCount >= 10) {
        // Adding button to the bottom of the page (if there are over 10 articles in the library)
        // Unfortunately button is not working and page is fetching only up to 10 articles :(
        // But I'll add this functionality later :) 
        const body = document.getElementsByTagName("BODY")[0];
        const newDiv = document.createElement("div");
        newDiv.classList.add("button-container");
        const newButton = document.createElement("button");
        newButton.setAttribute("id", "more-articles");
        const newButtonLink = document.createElement("a");
        newButtonLink.innerText = "More articles";
        newButton.append(newButtonLink);
        newDiv.append(newButton);
        body.append(newDiv);
    }
};

displayTotalSavedArticles();

window.onload = (event) => {
    displayArticles("publishedAt:desc");
};

console.log("HELLO FROM THE LIBRARY SCRIPT!");

