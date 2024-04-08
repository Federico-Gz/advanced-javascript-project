// Import Axios for HTTP requests
import axios from 'axios';

// Import Lodash 
import _ from 'lodash';

// Import CSS file
import '../../assets/css/style.css';

// Start execution when DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get references to the DOM elements
    const newsBoxes = document.getElementById("news-boxes");
    const loadMoreBtn = document.getElementById("load-more-btn");
    let startIndex = 0;
    let endIndex = 10;

    // Function to fetch news details for a given news ID
    function fetchNewsDetails(newsId) {
        return axios.get(`${process.env.API_URL}/item/${newsId}.json`);
    }

    // Function to create news box
    function createNewsBox(news) {
        // Create HTML element to display the news with details
        const newsBox = document.createElement('div');
        const newsBoxTitle = document.createElement('div');
        const newsBoxTime = document.createElement('div');
        const newsBoxLink = document.createElement('a');
    
        // Add class, attributes and append the elements
        newsBox.classList.add('news-box', 'quicksand-2');
        newsBoxTitle.classList.add('box-title');
        newsBoxTitle.textContent = _.get(news, 'title', 'Untitled');
        newsBoxTime.classList.add('box-time');
        newsBoxTime.textContent = new Date(_.get(news, 'time', 0) * 1000).toLocaleString();
        newsBoxLink.classList.add('box-link', 'quicksand-1');
        newsBoxLink.textContent = "Read More";
        newsBoxLink.href = _.get(news, 'url', '#');
        newsBoxLink.target = "_blank";
    
        newsBox.appendChild(newsBoxTitle);
        newsBox.appendChild(newsBoxTime);
        newsBox.appendChild(newsBoxLink);
    
        return newsBox;
    }
    
    // Function to load news stories
    function loadNewsStories() {
        // GET request to fetch news IDs
        axios.get(`${process.env.API_URL}/newstories.json`)
            .then(response => {
                // Extract the news IDs
                const newsIds = _.slice(response.data, startIndex, endIndex);
                // Create an array of promises for fetching news details
                const promises = _.map(newsIds, newsId => fetchNewsDetails(newsId));
                // Wait for all promises to resolve using Promise.all
                return Promise.all(promises);
            })
            .then(newsResponses => {
                // Process each news detail response
                _.forEach(newsResponses, response => {
                    const news = response.data;
                    // Create news box HTML element
                    const newsBox = createNewsBox(news);
                    // Append the news box to the container
                    newsBoxes.appendChild(newsBox);
                });
            })
            .catch(error => console.error('Error during news loading:', error));
    }
    

    // Initial loading of news stories when the page loads
    loadNewsStories();

    // Event listener for the "Load More" button
    loadMoreBtn.addEventListener('click', () => {
        // Increment start and end index to load next ten news
        startIndex += 10;
        endIndex += 10;
        // Load new news
        loadNewsStories();
    });
});
