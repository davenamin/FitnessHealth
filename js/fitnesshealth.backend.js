// don't trigger js hint errors on the jquery object or "const" keyword
/*jshint esnext:true */
/*global $:false */

// ip or website!
const WEB_ADDRESS = 'http://192.168.1.103/';
// php pages
const LOGIN_PAGE = WEB_ADDRESS + 'connectClient.php'; //'login.php';
const REGISTER_PAGE = WEB_ADDRESS + 'createOrUpdate.php';
const GET_WORKOUT_PAGE = WEB_ADDRESS + 'getWorkoutsForUser.php';
const CREATE_WORKOUT_PAGE = WEB_ADDRESS + 'addWorkout.php';
const UPDATE_USER_PAGE = WEB_ADDRESS + 'update_user.php';
const GET_USERS_PAGE = WEB_ADDRESS + 'get_users.php';
const ADD_TRAINER_PAGE = WEB_ADDRESS + 'add_trainer.php';
const GET_VALIDATABLE_WORKOUTS_PAGE = WEB_ADDRESS + 'get_validatable_workouts.php';



// global constants
const USERNAME_HTML = "#username";
const PASSWORD_HTML = "#password";
var sessionid;

// login and register constants

function login() {
    if (checkUsernameValid() && checkPasswordValid()) {
        var sending = {
            username: $(USERNAME_HTML).val(),
            password: $(PASSWORD_HTML).val()
        };
        console.log(LOGIN_PAGE);
        console.log(sending);
        $.getJSON(
            LOGIN_PAGE,
            sending,
            function (data) {
                handleLogin(data);
            });
    }
}

function testlogin() {
    console.log("login!!!");
    location.href = "#page_5";
}


function handleLogin(response) {
    console.log(response);


    if (response == "Invalid_Data") {
        $.ui.popup("BAD REQUEST");
    } else if (response == "No_User_Data") {
        $.ui.popup("NO USER");
    } else {

        sessionid = response;
        $.ui.popup("Login successful!");
        injectUserInformation(sessionid);
        $.ui.loadContent("#page_5");
        //window.location.href = "#page_5";
    }
}

function handleRegister(response) {
    console.log(response);


    if (response == "User_Exists") {
        $.ui.popup("Exists!");
    } else if (response == "User_Added") {
        $.ui.popup("User Added! Please log in");
        $.ui.loadContent("#main");
    } else {
        $.ui.popup(response);
    }
}

function checkUsernameValid() {
    return true;
}

function checkPasswordValid() {
    return true;
}



// get workouts constants
const CURRENTDATE = "currentdate";
const CURRENTDATE_HTML = "#currentdate";
const NUMBERWEEKS = "numberweeks";
const NUMBERWEEKS_HTML = "#numberweeks";

function getWorkouts() {
    var sending = {
        USERNAME: $(USERNAME_HTML).get(),
        PASSWORD: $(PASSWORD_HTML).get(),
        SESSION: sessionid,
        CURRENTDATE: $(CURRENTDATE_HTML).get(),
        NUMBERWEEKS: $(NUMBERWEEKS_HTML).get()
    };

    $.getJSON(
        GET_WORKOUT_PAGE,
        sending,
        function (data) {
            updateWorkoutsHTML(data);
        });
}

function updateWorkoutsHTML(updatez) {
    // TODO   
}
// workout submission constants
const STARTDATE_HTML = "#startDate";
const ENDDATE_HTML = "#endDate";
const FREQUENCY_HTML = "#Frequency";
const METRIC_HTML = "#Metric";
//const QUANTITY_HTML = "#quantity";
const DESCRIPTION_HTML = "#Description";

function createWorkout() {

    if (checkWorkoutValid()) {
        var sending = {
            userID: $(USERNAME_HTML).val(),
            //PASSWORD: $(PASSWORD_HTML).val(),
            //SESSION: sessionid,
            StartDate: $(STARTDATE_HTML).val(),
            EndDate: $(ENDDATE_HTML).val(),
            Frequency: $(FREQUENCY_HTML).val(),
            Metric: $(METRIC_HTML).val(),
            //QUANTITY: $(QUANTITY_HTML).val(),
            Description: $(DESCRIPTION_HTML).val()
        };

        $.getJSON(
            CREATE_WORKOUT_PAGE,
            sending,
            function (data) {
                createWorkoutResponse(data);
            });
    }
}

function createWorkoutResponse(response) {
    //TODO
    $.ui.popup(response);
}

function checkWorkoutValid() {
    return true;
}

// update user information constants
const DOB_HTML = "#dob";
const HEIGHT_HTML = "#height";
const WEIGHT_HTML = "#weight";
const EMAIL_HTML = "#email";
const NAME_HTML = "#name";
const ADDRESS_HTML = "#address";
const BALANCE_HTML = "#balance";
const BALANCE_USER_HTML = "#balance_user";
const USER_HTML = "#LoginID";
const PASS_HTML = "#change_password";

const REG_DOB_HTML = "#regdob";
const REG_HEIGHT_HTML = "#regheight";
const REG_WEIGHT_HTML = "#regweight";
const REG_EMAIL_HTML = "#regemail";
const REG_NAME_HTML = "#regname";
const REG_ADDRESS_HTML = "#regaddress";
const REG_USER_HTML = "#reguser";
const REG_PASS_HTML = "#regpass";

function fh_register() {
    if (checkUsernameValid() && checkPasswordValid()) {
        var sending = {
            DOB: $(REG_DOB_HTML).val(),
            userID: $(REG_USER_HTML).val(),
            Height: $(REG_HEIGHT_HTML).val(),
            Weight: $(REG_WEIGHT_HTML).val(),
            Password: $(REG_PASS_HTML).val(),
            EmailAddress: $(REG_EMAIL_HTML).val(),
            Address: $(REG_ADDRESS_HTML).val(),
            CCNum: "1",
            Name: $(REG_NAME_HTML).val(),
            Type: "5",
            transID: "12",
            LoginID: "55", //$(REG_USER_HTML).val(),
            Balance: "1"

        };
        console.log(sending);
        $.getJSON(
            REGISTER_PAGE,
            sending,
            function (data) {
                handleRegister(data);
            });
    }
}

function injectUserInformation(info) {
    $(USER_HTML).val(info.userID);
    $(PASS_HTML).val(info.Password);
    $(HEIGHT_HTML).val(info.Height);
    $(WEIGHT_HTML).val(info.Weight);
    $(EMAIL_HTML).val(info.EmailAddress);
    $(NAME_HTML).val(info.Name);
    $(DOB_HTML).val(info.DOB);
    $(ADDRESS_HTML).val(info.Address);
    $(BALANCE_HTML).val(info.Balance);
    $(BALANCE_USER_HTML).val(info.Balance);
    injectUserWorkouts(info.Activity);
    injectUserTrainers(info.user_Trainers);
}

function injectUserWorkouts(data) {
    console.log(data);
    tempdata = $.parseJSON(data);
    $('#workout_list').text("");
    $.each(tempdata, function (i, item) {
        console.log(item);
        $('#workout_list').append('<li>' + item + '</li>');
    });
}

function injectUserTrainers(data) {
    console.log(data);
    tempdata = $.parseJSON(data);
    $('#trainers_list').text("");
    $.each(tempdata, function (i, item) {
        $('#trainers_list').append('<li>' + item + '</li>');
    });
}

function updateUserInformation() {
    var sending = {
        USERNAME: $(USERNAME_HTML).val(),
        PASSWORD: $(PASSWORD_HTML).val(),
        SESSION: sessionid,
        DOB: $(DOB_HTML).val(),
        HEIGHT: $(HEIGHT_HTML).val(),
        WEIGHT: $(WEIGHT_HTML).val(),
        EMAIL: $(EMAIL_HTML).val(),
        NAME: $(NAME_HTML).val(),
        ADDRESS: $(ADDRESS_HTML).val()
    };

    $.getJSON(
        UPDATE_USER_PAGE,
        sending,
        function (data) {
            handleUserUpdateResponse(data);
        });
}

function handleUserUpdateResponse(response) {}


// add trainer constants
const TRAINER = "trainer";
const TRAINER_HTML = "#trainer";

function getAllUsers() {
    var sending = {
        USERNAME: $(USERNAME_HTML).get(),
        PASSWORD: $(PASSWORD_HTML).get(),
        SESSION: sessionid
    };

    $.getJSON(
        GET_USERS_PAGE,
        sending,
        function (data) {
            handleGetUsers(data);
        });
}

function addValidatedUser() {
    var sending = {
        USERNAME: $(USERNAME_HTML).get(),
        PASSWORD: $(PASSWORD_HTML).get(),
        SESSION: sessionid,
        TRAINER: $(TRAINER_HTML).get()
    };

    $.getJSON(
        ADD_TRAINER_PAGE,
        sending,
        function (data) {
            handleAddTrainerResponse(data);
        });
}

function handleGetUsers(response) {}

function handleAddTrainerResponse(response) {}



function getValidatableWorkouts() {
    var sending = {
        USERNAME: $(USERNAME_HTML).get(),
        PASSWORD: $(PASSWORD_HTML).get(),
        SESSION: sessionid
    };

    $.getJSON(
        GET_VALIDATABLE_WORKOUTS_PAGE,
        sending,
        function (data) {
            handleValidatableWorkouts(data);
        });
}

function handleValidatableWorkouts(response) {}



function test1() {
    //    $.ajax(
    //      {url: 'http://www.google.com', 
    //     type:'GET', dataType:'text', 
    //     error: function(){alert('error!');}, 
    //   success: function(data){$("#testbutton").text(data);}//alert('success! ' + data);}
    // }
    //    )
    //$.getJSON(
    //  'http://192.168.1.103/json_read_test.php',
    //'testSEND',
    //    function (data) {
    //        $('#removeme').text("");
    //        $.each(data, function (i, item) {
    //            $('#testtext').append('<li>' + item + '</li>');
    //        })
    //    });

    var sending = {
        USERNAME: 'value',
        PASSWORD: 'value2'
    };
    //        JSON = JSON.stringify(data);

    //var data = "[something, something2]";

    $.getJSON(
        'http://192.168.1.103/json_read_test.php',
        sending,
        function (data) {
            $('#removeme').text("");
            $.each(data, function (i, item) {
                $('#testtext').append('<li>' + item + '</li>');
            });
        });


    //$.ajax({
    //  url: 'http://192.168.1.103/json_read_test.php',
    //  type: 'GET',
    //    data: sending,
    //    success: function (data) {
    //       $('#testtext').append(data);
    //    }
    //    });

    //.get("http://192.168.1.100/json_read_test.php",function(data){$("#testtext").text(data);});
}