// Import axios for HTTP requests 
import axios from 'axios';

// Impotr CSS file
import '../css/style.css';

// Start execution when DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    //Get references to the DOM elements
    const newsSection = document.getElementById("news-section");
    const newsBoxes = document.getElementById("news-boxes");
    const loadMoreBtn = document.getElementById("load-more-btn");
    let startIndex = 0;
    let endIndex = 10;

    // Function which calls API to get first ten news
    function loadNewsStories(){
        //GET request to the API
        axios.get(`${process.env.API_URL}/newstories.json`)
            .then(response => {
                //Extract the news IDs
                const newsIds = response.data.slice(startIndex, endIndex);
                loadNewsDetails(newsIds);
            })
            .catch(error => console.error('Errore getting ID', error));
    }

    //Initial loading of news stories when the page loads
    loadNewsStories();

    // Function which calls API to get news details and  appends them to the page
    function loadNewsDetails(newsIds){
        // iterate for each news ID
        newsIds.forEach(newsId => {
            //GET request to the API for the news details
            axios.get(`${process.env.API_URL}/item/${newsId}.json`)
                .then(response => {
                    const news = response.data;
                    //create HTML element to display the news with details
                    const newsBox = document.createElement('div');
                    const newsBoxTitle = document.createElement('div');
                    const newsBoxTime = document.createElement('div');
                    const newsBoxLink = document.createElement('a'); 
                    
                    // Add class, attributes and append the elements
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
                .catch(error => console.error('Error getting news details:', error));
        });
    }

    //Event listener for the "Load More" button
    loadMoreBtn.addEventListener('click', ()=>{
        //Increment start and end index to load tnext ten news
        startIndex += 10;
        endIndex += 10;
        //Load new news
        loadNewsStories();
    })
});
