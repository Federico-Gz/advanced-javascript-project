document.addEventListener("DOMContentLoaded", function() {
    const newsSection = document.getElementById("news-section");
    const newsBoxes = document.getElementById("news-boxes");
    const loadMoreBtn = document.getElementById("load-more-btn");
    let startIndex = 0;
    let endIndex = 10;
    let newsIds = [];

    // Funzione che chiama l'API per caricare le notizie
    function loadNewsStories(){
        fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
            .then(response => response.json())
            .then(data => {
                newsIds = data.slice(startIndex, endIndex);
                loadNewsDetails(newsIds);
            })
            .catch(error => console.error('Errore nel recupero degli ID', error));
    }

    loadNewsStories();


    // Funzione che chiama l'API per caricare i dettagli delle notizie
    function loadNewsDetails(newsIds){
        newsIds.forEach(newsId => {
            fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`)
                .then(response => response.json())
                .then(news => {
                    let newsBox = document.createElement('div');
                    let newsBoxTitle = document.createElement('div');
                    let newsBoxTime = document.createElement('div');
                    let newsBoxLink = document.createElement('a'); // Utilizziamo <a> per il link
    
                    newsBox.classList.add('news-box');
    
                    newsBoxTitle.classList.add('box-title');
                    newsBoxTitle.textContent = news.title;
    
                    newsBoxTime.classList.add('box-time');
                    newsBoxTime.textContent = new Date(news.time * 1000).toLocaleString(); // Converti il timestamp in una data leggibile
    
                    newsBoxLink.classList.add('box-link');
                    newsBoxLink.textContent = "Read More";
                    newsBoxLink.href = news.url; 
                    newsBoxLink.target = "_blank"; 
    
                    newsBox.appendChild(newsBoxTitle);
                    newsBox.appendChild(newsBoxTime);
                    newsBox.appendChild(newsBoxLink);
    
                    newsBoxes.appendChild(newsBox); // Aggiungi il newsBox all'elemento newsBoxes
                })
                .catch(error => console.error('Errore nel recupero dei dettagli della notizia:', error));
        });
    }
    
});
