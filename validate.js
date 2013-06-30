$(function(){

  var formHandler = function(event){
    console['log']("submitted"); // fixme: validate form here

    var data = $('form :input').serializeArray();

    event['preventDefault'](); // prevents the page from reloading
  };

  $("form")['submit'](formHandler); // register a callback

});
