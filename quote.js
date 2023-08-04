document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById("main"); // Get the element with id="main" (quote container)
    const fetchQuotesBtn = document.getElementById("fetchQuotesBtn"); // Get the "Fetch Quotes" button

    // Attach event listener to the "Fetch Quotes" button

    document.getElementById("fetchQuotesBtn").addEventListener("click", () => {
        console.log("Button clicked!"); // Check if the button click event is being triggered
    });
    


    // Initial call with default category "happiness" when the page loads
    const API = `https://api.api-ninjas.com/v1/quotes?category=happiness`; // Create the API URL with the default category
    const API_KEY = 'v2hJOyPevHMghW7qabWIMA==mnQdPqFAlHJ39vlu'; // Replace 'YOUR_API_KEY' with your actual API key
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
            console.log(quoteData); // Log the fetched data to the console
    
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
                <div class="quote-box">
                    <p>${quote}</p>
                    <span>~Author: ${author}</span>
                    <a href="twitter.com/intent/tweet" target="_top" id="tweet-quote"><i>WhatsApp</i></a>
                    <a href=""><i>Facebook</i></a>
                    <button id="fetchQuotesBtn"  class="btn btn-primary">New Quote</button>
                </div>       
            `;
    

            const header = document.getElementById("header");
            header.innerHTML = `
                <h2>Quote on ${category}</h2>
            `;
            // Append the quote element to the main container
            console.log("Appending quote to main:", quoteEl);
            main.appendChild(quoteEl);
            
        });
    }    
});
