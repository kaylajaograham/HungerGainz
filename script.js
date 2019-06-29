"use strict";


// making div:active stick

$('.cuisineSelection').click(function(event) {
    var $target = $(event.target); // the element that fired the original click event
    if ($target.is('div.click')) {
        window.location.href = $target.find('a').attr('href');
    }
});