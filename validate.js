$(function(){

  //validation functions
  var check_cc = function(cc){
    //expect cc as a {}
    //return true or false
    return false;
  };

  var toggle_error = function(msg){
    $('.error span').text(msg);
    $('.error').toggle();
  };

  var formHandler = function(event){
    console['log']("submitted"); // fixme: validate form here

    var data = $('form :input').serializeArray();

    var cc = {};
    for(var i = 0; i < data.length; i++){
      if(data[i].name === 'number'){
        cc.number = data[i].value;
      }
      if(data[i].name === 'ccv'){
        cc.ccv = data[i].value;
      }
      if(data[i].name === 'exp'){
        cc.exp = data[i].value;
      }
      if(data[i].name === 'name'){
        cc.name = data[i].value;
      }
      if(data[i].name === 'address'){
        cc.address = data[i].value;
      }
    }

    console.log(cc);

    if(!check_cc(cc)){
      toggle_error('Credit card error.');
    }

    event['preventDefault'](); // prevents the page from reloading
  };

  $("form")['submit'](formHandler); // register a callback

});
