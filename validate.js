$(function(){

  //validation functions
  var check_cc = function(cc){
    var valid_or_not = false;
    //expect cc as a {}
    //return true or false

    // console.log(cc);


    //match credit card number
    //16 digits
    var number_re = /^\d{16}$/;
    var number_flag = !!cc.number.match(number_re);


    //match credit card ccv
    //3 or 4 digits
    var ccv_re = /^\d{3,4}$/;
    var ccv_flag = !!cc.ccv.match(ccv_re);

    //match credit card expiration date
    //expect ddmm
    //expect 4 digits
    var exp_re = /^\d{4}$/;
    var exp_flag = !!cc.exp.match(exp_re);
    //expect the first two digits between 1 and 12
    var month_re = /^(\d{2})/;
    var exp_month = !!cc.exp.match(month_re);
    if(exp_month){
      var month = exp_month[0];
      console.log(month);
      if(month>0 && month<13){
        exp_flag = exp_flag && true;
      } else {
        exp_flag = false;
      }
    } else {
      exp_flag = false;
    }

    //match credit card carholder name
    //expect a string with length > 1
    var name_re = /^.+$/;
    var name_flag = !!cc.name.match(name_re);

    //match credit card billing address
    //expect a string with length > 1
    var address_re = /^.+$/;
    var address_flag = !!cc.address.match(address_re);

    console.log(
      'number_flag: ', number_flag,
      '\nccv_flag: ', ccv_flag,
      '\nexp_flag: ', exp_flag,
      '\nname_flag: ', name_flag,
      '\naddress_flag: ', address_flag
    );


    if(number_flag && ccv_flag){
      valid_or_not = true;
    }
    return valid_or_not;
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
        cc.number = cc.number.split(' ').join(''); //trim all white space
      }
      if(data[i].name === 'ccv'){
        cc.ccv = data[i].value;
        cc.ccv = cc.ccv.split(' ').join('');
      }
      if(data[i].name === 'exp'){
        cc.exp = data[i].value;
        cc.exp = cc.exp.split(' ').join('');
        cc.exp = cc.exp.split('/').join(''); //remove '/'
      }
      if(data[i].name === 'name'){
        cc.name = data[i].value;
        cc.name = cc.name.split(' ').join('');
      }
      if(data[i].name === 'address'){
        cc.address = data[i].value;
        cc.address = $.trim(cc.address);
      }
    }

    console.log(cc);
    check_cc(cc);

    // if(!check_cc(cc)){
      //toggle_error('Credit card error.');
    // }

    event['preventDefault'](); // prevents the page from reloading
  };

  $("form")['submit'](formHandler); // register a callback

});
