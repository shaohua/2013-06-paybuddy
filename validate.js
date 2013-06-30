$(function(){

  //validation functions
  var check_cc = function(cc){
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
    var exp_month = cc.exp.match(month_re); // do NOT convert to boolean

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

    var valid_flags = {
      'number_flag': number_flag,
      'ccv_flag': ccv_flag,
      'exp_flag': exp_flag,
      'name_flag': name_flag,
      'address_flag': address_flag,
      'final_flag': false //default
    };


    if(number_flag && ccv_flag && exp_flag && name_flag && address_flag){
      valid_flags.final_flag = true;
    }

    return valid_flags;
  };

  var toggle_error = function(msg){
    $('.error span').html(msg);
    $('.error').show();
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

    var flags = check_cc(cc);
    if(!flags.final_flag){
      var error_msg = 'Credit card error.<br>';
      for(var key in flags){
        if(!flags[key] && key !== 'final_flag') {
          error_msg += key + '<br>';
        }
      }
      toggle_error(error_msg);
    }

    if(flags.final_flag){
      $('.success').show();
      $('.error').hide();
      $('form')[0].reset();
    }
    console.log(flags);
    // if(!check_cc(cc)){
      //toggle_error('');
    // }

    event['preventDefault'](); // prevents the page from reloading
  };

  $("form")['submit'](formHandler); // register a callback

});
