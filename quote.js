document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById("main"); // Get the element with id="main" (quote container)

    // Attach a single event listener to the parent element that contains the button
    document.body.addEventListener("click", (event) => {
        if (event.target.id === "fetchQuotesBtn") {
            // Call the function to generate and set a new background color, text color, and button color
            setRandomStyles();
            
            // Call the function to fetch new quotes when the button is clicked
            getQuotes(APIURL, API_KEY);
        }
    });   

    // Initial call with default category "happiness" when the page loads
    const API = `https://api.api-ninjas.com/v1/quotes?category=`;
    const API_KEY = 'v2hJOyPevHMghW7qabWIMA==mnQdPqFAlHJ39vlu';
    const APIURL = API;
    getQuotes(APIURL, API_KEY); // Call the function to fetch quotes for the default category

    // Function to fetch quotes from the API
    async function getQuotes(url, apiKey) {
        try {
            const response = await fetch(url, {
                headers: {
                    'X-Api-Key': apiKey,
                    'Content-Type': 'application/json'
                }
            });
            const quoteData = await response.json(); // Parse the response to JSON format
    
            if (quoteData) {
                showQuotes(quoteData); // Call the function to display quotes on the webpage
            } else {
                console.error('No quotes found in the API response.');
                // Optionally, you can add a message to the main container to inform the user that no quotes were found.
                main.innerHTML = "<p>No quotes found.</p>";
            }
        } catch (error) {
            console.error('Error fetching quotes: ', error); // Log any errors that occur during fetching
        }
    }
    
    // Function to display quotes on the webpage
    function showQuotes(quotes) {
        // Clear the previous content of the quote container
        main.innerHTML = "";
    
        // Loop through each quote and display it on the webpage
        quotes.forEach(quoteItem => {
            const { category, author, quote } = quoteItem; // Use a different variable name for the quote property
    
            // Create a new div element to represent the quote
            const quoteEl = document.createElement("div");
            quoteEl.classList.add("quote"); // Add a CSS class to the quote element for styling
    
            // Populate the quote element with the quote text and author name
            quoteEl.innerHTML = ` 
                <div class="quote-box" id="quote-box">
                    <p id="quote">${quote}</p>
                    <span id=author>~Author: ${author}</span>
                    <p>
                        <a href="twitter.com/intent/tweet" target="_top" id="tweet-quote"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg></a>
                        <span><a href="whatsapp.com"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-whatsapp" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg></a></span>
                    </p>
                    <button id="fetchQuotesBtn" class="btn btn-primary">New Quote</button> 
                </div>       
            `;
    
            const header = document.getElementById("header");
            header.innerHTML = `
                <h2>Quote on ${category}</h2>
            `;
            
            main.appendChild(quoteEl);
        });
    }

    // Function to generate and set a random background color, text color, and button color
    function setRandomStyles() {
        const randomBgColor = getRandomColor();
        document.body.style.backgroundColor = randomBgColor;
        const button = document.getElementById("fetchQuotesBtn");
        button.style.backgroundColor = randomBgColor;
        const textColor = randomBgColor[1] === '1' ? 'white' : 'black';
        document.body.style.color = textColor;
        button.style.color = textColor;
    }

    // Function to generate a random hex color code
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
