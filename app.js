const articlesUrl = "https://api.spaceflightnewsapi.net/v3/articles";
const articlesCountUrl = "https://api.spaceflightnewsapi.net/v3/articles/count";

const get15url = "https://api.spaceflightnewsapi.net/v3/articles?_start=0&_limit=15";
const getAnother15url = "https://api.spaceflightnewsapi.net/v3/articles?_start=15&_limit=15";


// const get15Articles = "https://api.spaceflightnewsapi.net/v3/articles?pagination[start]=1&pagination[limit]=15";

const get15Articles = async () => {
    try {
        const res = await fetch(get15url);
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log("ERROR :( ", err);
    }
};

console.log(get15Articles());

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

