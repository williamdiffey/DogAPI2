'use strict';

function eventListener() {
  $('#dog-form').on('submit', function(event) {
    $('.dog-image-results').empty();
    event.preventDefault();
    let breedValue = $('#dog-input').val();
    getImages(breedValue);
  });
}

function getImages(breedValue) {
  fetch(`https://dog.ceo/api/breed/${breedValue}/images/random`)
      .then(response => {
      return response.json();
      })
      .then(responseJSON => {
      if (responseJSON.status == "error") {
      return errorImg();
      } else if (responseJSON.status == "success") {
      return showDogs(responseJSON);
      } else {
      alert("Dead end.");
      }
      })
     .catch(error => console.log(error));
}

function showDogs(responseJSON) {
    $('.dog-image-results').append(`<img src="${responseJSON.message}">`);
}

function errorImg() {
    fetch(`https://dog.ceo/api/breeds/image/random/1`)
    .then(response => response.json())
    .then(responseJson => {
         errorMessage(responseJson);
      })
    .catch(error => alert("Something went wrong"));
}

function errorMessage(responseJson) {
   $('.result-notes').html(`We can't find that breed right now. How about this one?`);
   return $('.dog-image-results').append(`<img src="${responseJson.message}">`);
}

$(function() {
  eventListener();
}
);