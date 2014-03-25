function fh_login() {
    //    $.ajax(
    //      {url: 'http://www.google.com', 
    //     type:'GET', dataType:'text', 
    //     error: function(){alert('error!');}, 
    //   success: function(data){$("#testbutton").text(data);}//alert('success! ' + data);}
    // }
    //    )
    $.getJSON(
        'http://192.168.1.100/json_read_test.php',
        'testSEND',
        function (data) {
            $('#removeme').text("");
            $.each(data, function (i, item) {
                $('#testtext').append('<li>' + item + '</li>');
            })
        });


    //.get("http://192.168.1.100/json_read_test.php",function(data){$("#testtext").text(data);});
}