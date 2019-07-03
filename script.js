"use strict";

<<<<<<< HEAD
// youtube API key
const youtubeApiKey = "AIzaSyDbKrwOykXq2mbJnXNSdNjmLtp1CHdEGDw";
// zomato API Key
const zomatoApiKey = "1b846e38e472c1df18930120556caa69";
=======
// HERO SLIDESHOW
function carousel() {
    let i;
    let x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) { slideIndex = 1 }
    x[slideIndex - 1].style.display = "block";
    setTimeout(carousel, 2000);
}

const youtubeApiKey = "";
const zomatoApiKey = "";
>>>>>>> 7664ea87fccfe33b2cd4c8c6796bde9f6277740e

// youtube search API
const youtubeSearchUrl = "https://www.googleapis.com/youtube/v3/search";
// zomato API
const zomatoUrl = "https://developers.zomato.com/api/v2.1";

// Array to store the cuisine selections
var selectionArr = [];
// variable to store the dining option
var inOutFilter = '';
<<<<<<< HEAD
// hero slideshow
var slideIndex = 0; 

// Hard coded data from the Zomato endpoint. I could have used the GET API endpoint to fetch it
// since there's only 6 options i decided to hardcode it. The nested api calls were becomeing difficult. 
var cuisineData = [
  {
    id: 60,
    cuisine: 'JAPANESE'
  },
  {
    id: 1,
    cuisine: 'AMERICAN'
  },
  {
    id: 55,
    cuisine: 'ITALIAN'
  },
  {
    id: 73,
    cuisine: 'MEXICAN'
  },
  {
    id: 67,
    cuisine: 'KOREAN'
  },
  {
    id: 89,
    cuisine: 'SPANISH'
  }
]

// HERO SLIDESHOW
function carousel() {
  let i;
  let x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) { slideIndex = 1 }
  x[slideIndex - 1].style.display = "block";
  setTimeout(carousel, 2000);
}

// Calls the youtube search API and gets a list of videos 
function getYoutubeVideos(searchTerm, maxResults = 5) {
    for (let i = 0; i < searchTerm.length; i++) {
        const params = {
            key: youtubeApiKey,
            q: searchTerm[i] + 'food recipe',
            part: "snippet",
            maxResults: maxResults,
            type: "video"
        };

        let queryString = $.param(params);
        const url = youtubeSearchUrl + "?" + queryString;

        fetch(url).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).then(responseJson => displayVidResults(responseJson))
            .catch(err => {
                $('#js-error-message').text(`Something Failed ${err.message}`);
            })
    }
}

// Adds html to display the youtube videos that were retrieved in the getYoutubeVideos function
function displayVidResults(responseJson) {
=======
var slideIndex = 0; //hero slideshow

function getYoutubeVideos(searchTerm, maxResults = 5) {
    for (let i = 0; i < searchTerm.length; i++) {
        const params = {
            key: youtubeApiKey,
            q: searchTerm[i] + 'food recipe',
            part: "snippet",
            maxResults: maxResults,
            type: "video"
        };

        let queryString = $.param(params);
        console.log("query Stringified", queryString);
        const url = youtubeSearchUrl + "?" + queryString;
        console.log("url", url);

        fetch(url).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).then(responseJson => displayVidResults(responseJson))
            .catch(err => {
                $('#js-error-message').text(`Something Failed ${err.message}`);
            })
    }
}

function displayVidResults(responseJson) {
    console.log(responseJson);

>>>>>>> 7664ea87fccfe33b2cd4c8c6796bde9f6277740e
    for (let i = 0; i < responseJson.items.length; i++) {
        $('.video-results').append(
            `<li>
      <h3>${responseJson.items[i].snippet.title}</h3>
      <p>${responseJson.items[i].snippet.description}</p>
      <a href="https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}">
      <img src='${responseJson.items[i].snippet.thumbnails.high.url}'>
      </a>
      </li>`
        )
    };
    $("#results").removeClass("hidden");
}

<<<<<<< HEAD
// Gets the ID of the cuisine that was selected by the user from the hardcoded data object
function getZomatoCuisineId(searchTerm){
  for (let i = 0; i < cuisineData.length; i++) {
    if(searchTerm == cuisineData[i].cuisine){
      return cuisineData[i].id;
    }
  }
}

// Gets the Zomato city id from the zomato cities API 
// and then called the getzomato restaraunt function to retrieve the list of restaurants
function getZomatoCityId(searchTerm, city){
  const options = {
    headers: new Headers({
        'user-key': zomatoApiKey
    })
  };

  const params = {
      q: city
  };

  let queryString = $.param(params);
  const url = zomatoUrl + '/cities?' +queryString;

  fetch(url, options).then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
      })
      .then(responseJson => getZomatoRest(searchTerm, responseJson.location_suggestions[0].id))
}

// uses the zomato search api to find restaraunt suggestions then calls the function to display them in html
function getZomatoRest(searchTerm, city_id, maxResults = 5) {
    for (let i = 0; i < searchTerm.length; i++) {
        const options = {
            headers: new Headers({
                'user-key': zomatoApiKey
            })
        };

        const params = {
            entity_id: city_id,
            entity_type: 'city',
            cuisines: getZomatoCuisineId(searchTerm[i]),
            radius: 16095,
            count: maxResults
        };

        let queryString = $.param(params);
        const url = zomatoUrl + '/search?' +queryString;

        fetch(url, options).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).then(responseJson => displayRestResults(responseJson))
            .catch(err => {
                $('#js-error-message').text(`Something Failed ${err.message}`);
            })
    }
}

// creates html to display the restaraunt recommendations
function displayRestResults(responseJson) {
    for (let i = 0; i < responseJson.restaurants.length; i++) {
        $('.rest-results').append(`<li>
        <h3>${responseJson.restaurants[i].restaurant.name}</h3>
        <a href='${responseJson.restaurants[i].restaurant.url}'>${responseJson.restaurants[i].restaurant.url}</a>
        </li>`
=======
function getZomatoRest(searchTerm, zip, maxResults = 5) {
    for (let i = 0; i < searchTerm.length; i++) {
        const options = {
            headers: new Headers({
                'user-key': zomatoApiKey,
                'Content-Type': 'application/json'
            })
        };

        const params = {
            entity_id: zip,
            q: searchTerm[i],
            count: maxResults
        };

        let queryString = $.param(params);
        console.log("query Stringified", queryString);
        const url = zomatoSearchUrl + +queryString;
        console.log("url", url);

        fetch(url, options).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).then(responseJson => displayRestResults(responseJson))
            .catch(err => {
                $('#js-error-message').text(`Something Failed ${err.message}`);
            })
    }
}

function displayRestResults(responseJson) {
    console.log(responseJson);

    for (let i = 0; i < responseJson.items.length; i++) {
        $('.rest-results').append(
            `<li>
      <h3>${responseJson.restaurants[i].name}</h3>
      <a href='${responseJson.restaurants[i].url}'></a>
      </li>`
>>>>>>> 7664ea87fccfe33b2cd4c8c6796bde9f6277740e
        )
    };
    $("#results").removeClass("hidden");
}

// toggles the selection highlight for the cuisines
function selectCuisine() {
    $('.cuisineSelection').on('click', '.cuisineOptions', function(event) {
        $(event.target).toggleClass('active');
    });
}

// toggles the selection highlight for the Staying In or Going Out option
function whereToEat() {
    $('.inOrOut').on('click', '.whereToEat', function(event) {
        inOutFilter = $(event.target).text();
        $(event.target).toggleClass('active');
<<<<<<< HEAD
    });
}

// determines which search to use
// I split them up since if you're going out it doesn't make sense to search through youtube to find recipes
function determineSearch(searchTerm, inOrOut, city_id) {
    if (inOrOut == 'Home-cook') {
=======
        console.log(inOutFilter);
    });
}

function determineSearch(searchTerm, inOrOut, zip) {
    if (inOrOut == 'Cook it myself') {
>>>>>>> 7664ea87fccfe33b2cd4c8c6796bde9f6277740e
        //use only the youtube endpoint
        getYoutubeVideos(searchTerm);
    } else if (inOrOut == 'Show all options') {
        //use the zomato and youtube endpoint
        getYoutubeVideos(searchTerm);
<<<<<<< HEAD
        getZomatoCityId(searchTerm, city_id);

    } else if (inOrOut == 'Dine out') {
        //use only the zomato endpoint
        getZomatoCityId(searchTerm, city_id);
    };
}

// this finds all the selected cuisine options and appends them to an array to use later
=======
        getZomatoRest(searchTerm, zip);

    } else if (inOrOut == 'Dine out') {
        //use only the zomato endpoint
        getZomatoRest(searchTerm, zip);
    };
}

>>>>>>> 7664ea87fccfe33b2cd4c8c6796bde9f6277740e
function gatherActive() {
    $('div.cuisineOptions.active').each(function() {
        selectionArr.push($(this).text());
    });
}

<<<<<<< HEAD
// empties the results section, hides results, clears selections
=======
>>>>>>> 7664ea87fccfe33b2cd4c8c6796bde9f6277740e
function reset() {
    $('.resetButton').on('click', function() {
        $('.video-results').empty();
        $('.rest-results').empty();
        $("#results").addClass("hidden");
        selectionArr = [];
        inOutFilter = '';
        $('.cuisineOptions').removeClass('active');
        $('.whereToEat').removeClass('active');
    })
}

<<<<<<< HEAD
// watches for the form submit to happen then kicks everything off
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let city = $('#city').val();
        gatherActive();
        determineSearch(selectionArr, inOutFilter, city);
    })
}

// all the necessary function calls for functions with event listeners. 
$(carousel()); 
=======
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let zip = $('#zip').val();
        gatherActive();
        determineSearch(selectionArr, inOutFilter, zip);
        console.log(selectionArr);
    })
}

$(carousel()); //hero carousel
>>>>>>> 7664ea87fccfe33b2cd4c8c6796bde9f6277740e
$(selectCuisine());
$(whereToEat());
$(watchForm());
$(reset());