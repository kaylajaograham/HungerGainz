// https://developers.zomato.com/documentation#!/common/cuisines

"use strict";

const youtubeApiKey = "";
const zomatoApitKey = "";

const youtubeSearchUrl = "https://www.googleapis.com/youtube/v3/search";
const zomatoSearchUrl = "https://developers.zomato.com/api/v2.1/search";

var selectionArr = [];
var inOutFilter = ''

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

function determineSearch(inOrOut){
	if (inOrOut == 'Cook it myself') {
		//use only the youtube endpoint
	}
	else if (inOrOut == 'Show all options') {
		//use the zomato and youtube endpoint
	}
	else if (inOrOut == 'Dine out') {
		//use only the zomato endpoint
	};
}

function gatherActive(){
	$('div.cuisineOptions.active').each(function(){
		selectionArr.push($(this).text());
	});
}


function watchForm(){
  $('form').submit(event => {
		event.preventDefault();
		let zip = $('#zip').val();
		gatherActive();
		console.log(selectionArr);
	})
}

$(selectCuisine());
$(whereToEat());
$(watchForm());