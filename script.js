// https://developers.zomato.com/documentation#!/common/cuisines

"use strict";

var selectionArr = [];
var inOutFilter = ''

// making div:active stick
function selectCuisine() {
  $('.cuisineSelection').on('click', '.cuisineOptions', function(event) {
      selectionArr.push($(event.target).text());
      console.log(selectionArr);
  });
}

function whereToEat() {
  $('.inOrOut').on('click', '.whereToEat', function(event) {
		inOutFilter = $(event.target).text();
		console.log(inOutFilter);
  });
}

function watchForm(){
  $('form').submit(event => {
		event.preventDefault();
	})
}

$(selectCuisine());
$(whereToEat());