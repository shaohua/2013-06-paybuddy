$(document).ready(function(){
  $("form").submit(function(event){
    console.log("submitted"); // fixme: validate form here
    event.preventDefault(); // prevents the page from reloading
  });
});