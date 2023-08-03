var category = 'happiness';
const API_KEY = 'v2hJOyPevHMghW7qabWIMA==mnQdPqFAlHJ39vlu';

$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
    headers: { 'X-Api-Key': API_kEY},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Your JavaScript code here
      const APIURL = 'https://api.api-ninjas.com/v1/quotes?category=&api_key=v2hJOyPevHMghW7qabWIMA==mnQdPqFAlHJ39vlu';
      const IMGPATH = "https://image.tmdb.org/t/p/w1280";
      const SEARCHAPI = 'https://api.api-ninjas.com/v1/quotes?category=';
  
      const main = document.getElementById("main");
      const form = document.getElementById("form");
      const search = document.getElementById("search");
  
      // ... Rest of your code ...
  
      //Initial Call 
      getMovies(APIURL);
  
      async function getMovies(url){
          const resp = await fetch(url);
          const respData = await resp.json(); 
  
          console.log(respData);
  
          showMovies(respData.results);
      }
  
      function showMovies(movies) {
          // clears main
          main.innerHTML = "";
  
          movies.forEach(movie => {
              const { poster_path, title, vote_average, overview } = movie;
  
              const movieEl = document.createElement("div");
              movieEl.classList.add("movie");
  
              // Conditional check for poster_path
              const posterSrc = poster_path ? IMGPATH + poster_path : 'path/to/placeholder-image.jpg';
  
              movieEl.innerHTML = `
                  <img 
                      src="${posterSrc}"
                      alt="${title}"
                  />  
                  <div class="movie-info">
                      <h3>${title}</h3>
                      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                  </div>    
              `;
  
              main.appendChild(movieEl);
          });
      }
  
  
      function getClassByRate(vote) {
          if(vote >= 8){
              return "blue";
          } else if(vote >= 5){
              return "green";
          } else if (vote >= 0) {
              return "red";
          }
      }
  
      form.addEventListener('submit', (e) =>{
          e.preventDefault();
  
          const searchTerm = search.value;
  
          if (searchTerm) {
              
              getMovies(SEARCHAPI + searchTerm);
          
              search.value = '';
          }
      });
  
  });