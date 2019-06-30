"use strict";

const youtubeApiKey = "";
const zomatoApiKey = "";

const youtubeSearchUrl = "https://www.googleapis.com/youtube/v3/search";
const zomatoSearchUrl = "https://developers.zomato.com/api/v2.1/search";

var selectionArr = [];
var inOutFilter = '';

function getYoutubeVideos(searchTerm, maxResults = 5){
	for (let i = 0; i < searchTerm.length; i++){
		const params = {
		  key: youtubeApiKey,
		  q: searchTerm[i] + 'food recipe',
		  part: "snippet",
		  maxResults: maxResults,
		  type: "video"
		};

	  let queryString = $.param(params);
	  console.log("query Stringified", queryString);
	  const url = youtubeSearchUrl + "?" +queryString;
	  console.log("url", url);

	  fetch(url).then(response => {
	    if(response.ok) {
	      return response.json();
	    }
	    throw new Error(response.statusText);
	  }).then(responseJson => displayVidResults(responseJson))
	  .catch(err=> {
	    $('#js-error-message').text(`Something Failed ${err.message}`);
		})
	}
}

function displayVidResults(responseJson){
  console.log(responseJson);

  for (let i=0; i<responseJson.items.length; i++){
    $('.video-results').append(
      `<li>
      <h3>${responseJson.items[i].snippet.title}</h3>
      <p>${responseJson.items[i].snippet.description}</p>
      <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
      </li>`
    )
  };
  $("#results").removeClass("hidden");
}

function getZomatoRest(searchTerm, zip, maxResults = 5){
	for (let i = 0; i < searchTerm.length; i++){
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
	  const url = zomatoSearchUrl +  +queryString;
	  console.log("url", url);

	  fetch(url, options).then(response => {
	    if(response.ok) {
	      return response.json();
	    }
	    throw new Error(response.statusText);
	  }).then(responseJson => displayRestResults(responseJson))
	  .catch(err=> {
	    $('#js-error-message').text(`Something Failed ${err.message}`);
		})
	}
}

function displayRestResults(responseJson){
  console.log(responseJson);

  for (let i=0; i<responseJson.items.length; i++){
    $('.rest-results').append(
      `<li>
      <h3>${responseJson.restaurants[i].name}</h3>
      <a href='${responseJson.restaurants[i].url}'></a>
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
		console.log(inOutFilter);
  });
}

function determineSearch(searchTerm, inOrOut, zip){
	if (inOrOut == 'Cook it myself') {
		//use only the youtube endpoint
		getYoutubeVideos(searchTerm);
	}
	else if (inOrOut == 'Show all options') {
		//use the zomato and youtube endpoint
		getYoutubeVideos(searchTerm);
		getZomatoRest(searchTerm,zip);

	}
	else if (inOrOut == 'Dine out') {
		//use only the zomato endpoint
		getZomatoRest(searchTerm,zip);
	};
}

function gatherActive(){
	$('div.cuisineOptions.active').each(function(){
		selectionArr.push($(this).text());
	});
}

function reset(){
	$('.resetButton').on('click', function(){
		$('.video-results').empty();
		$('.rest-results').empty();
		$("#results").addClass("hidden");
		selectionArr = [];
		inOutFilter = '';
		$('.cuisineOptions').removeClass('active');
		$('.whereToEat').removeClass('active');
	})
}

function watchForm(){
  $('form').submit(event => {
		event.preventDefault();
		let zip = $('#zip').val();
		gatherActive();
		determineSearch(selectionArr, inOutFilter, zip);
		console.log(selectionArr);
	})
}

$(selectCuisine());
$(whereToEat());
$(watchForm());
$(reset());