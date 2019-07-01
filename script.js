"use strict";

// youtube API key
const youtubeApiKey = "";
// zomato API Key
const zomatoApiKey = "";


// youtube search API
const youtubeSearchUrl = "https://www.googleapis.com/youtube/v3/search";
// zomato API
const zomatoUrl = "https://developers.zomato.com/api/v2.1";

// Array to store the cuisine selections
var selectionArr = [];
// variable to store the dining option
var inOutFilter = '';
// hero slideshow
var slideIndex = 0; 

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

function displayVidResults(responseJson) {
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

function getCuisineId(searchTerm){
  for (let i = 0; i < cuisineData.length; i++) {
    if(searchTerm == cuisineData[i].cuisine){
      return cuisineData[i].id;
    }
  }
}

function getCityId(searchTerm, city){
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
            cuisines: getCuisineId(searchTerm[i]),
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

function displayRestResults(responseJson) {
    for (let i = 0; i < responseJson.restaurants.length; i++) {
        $('.rest-results').append(`<li>
        <h3>${responseJson.restaurants[i].restaurant.name}</h3>
        <a href='${responseJson.restaurants[i].restaurant.url}'>${responseJson.restaurants[i].restaurant.url}</a>
        </li>`
        )
    };
    $("#results").removeClass("hidden");
}

function selectCuisine() {
    $('.cuisineSelection').on('click', '.cuisineOptions', function(event) {
        $(event.target).toggleClass('active');
    });
}

function whereToEat() {
    $('.inOrOut').on('click', '.whereToEat', function(event) {
        inOutFilter = $(event.target).text();
        $(event.target).toggleClass('active');
    });
}

function determineSearch(searchTerm, inOrOut, city_id) {
    if (inOrOut == 'Home-cook') {
        //use only the youtube endpoint
        getYoutubeVideos(searchTerm);
    } else if (inOrOut == 'Show all options') {
        //use the zomato and youtube endpoint
        getYoutubeVideos(searchTerm);
        getZomatoRest(searchTerm, city_id);

    } else if (inOrOut == 'Dine out') {
        //use only the zomato endpoint
        getCityId(searchTerm, city_id);
    };
}

function gatherActive() {
    $('div.cuisineOptions.active').each(function() {
        selectionArr.push($(this).text());
    });
}

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

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let city = $('#city').val();
        gatherActive();
        determineSearch(selectionArr, inOutFilter, city);
    })
}

$(carousel()); //hero carousel
$(selectCuisine());
$(whereToEat());
$(watchForm());
$(reset());
