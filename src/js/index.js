import axios from 'axios';
import '../css/style.css';

document.addEventListener("DOMContentLoaded", function() {
    const newsSection = document.getElementById("news-section");
    const newsBoxes = document.getElementById("news-boxes");
    const loadMoreBtn = document.getElementById("load-more-btn");
    let startIndex = 0;
    let endIndex = 10;

    
    function loadNewsStories(){
        axios.get(`${process.env.API_URL}/newstories.json`)
            .then(response => {
                const newsIds = response.data.slice(startIndex, endIndex);
                loadNewsDetails(newsIds);
            })
            .catch(error => console.error('Errore nel recupero degli ID', error));
    }

    loadNewsStories();

    
    function loadNewsDetails(newsIds){
        newsIds.forEach(newsId => {
            axios.get(`${process.env.API_URL}/item/${newsId}.json`)
                .then(response => {
                    const news = response.data;
                    const newsBox = document.createElement('div');
                    const newsBoxTitle = document.createElement('div');
                    const newsBoxTime = document.createElement('div');
                    const newsBoxLink = document.createElement('a'); 
    
                    newsBox.classList.add('news-box', 'quicksand-2');
    
                    newsBoxTitle.classList.add('box-title');
                    newsBoxTitle.textContent = news.title;
    
                    newsBoxTime.classList.add('box-time');
                    newsBoxTime.textContent = new Date(news.time * 1000).toLocaleString(); 
    
                    newsBoxLink.classList.add('box-link', 'quicksand-1');
                    newsBoxLink.textContent = "Read More";
                    newsBoxLink.href = news.url; 
                    newsBoxLink.target = "_blank"; 
    
                    newsBox.appendChild(newsBoxTitle);
                    newsBox.appendChild(newsBoxTime);
                    newsBox.appendChild(newsBoxLink);
    
                    newsBoxes.appendChild(newsBox);
                })
                .catch(error => console.error('Errore nel recupero dei dettagli della notizia:', error));
        });
    }

    loadMoreBtn.addEventListener('click', ()=>{
        startIndex += 10;
        endIndex += 10;
        loadNewsStories();
    })
});
