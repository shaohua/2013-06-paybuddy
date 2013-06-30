$(function(){

  var formHandler = function(event){
    console['log']("submitted"); // fixme: validate form here

    var data = $('form :input');
    var da = data.serializeArray();
    console.log(data, da);

    event['preventDefault'](); // prevents the page from reloading
  };

  $("form")['submit'](formHandler); // register a callback

});
