// don't trigger js hint errors on the jquery object or "const" keyword
/*jshint esnext:true */
/*global $:false */

// ip or website!
const WEB_ADDRESS = 'http://192.168.1.103/';
// php pages
const LOGIN_PAGE = WEB_ADDRESS + 'redirect.php'; //'login.php';
const REGISTER_PAGE = WEB_ADDRESS + 'register.php';
const GET_WORKOUT_PAGE = WEB_ADDRESS + 'get_workouts.php';
const CREATE_WORKOUT_PAGE = WEB_ADDRESS + 'create_workout.php';
const UPDATE_USER_PAGE = WEB_ADDRESS + 'update_user.php';
const GET_USERS_PAGE = WEB_ADDRESS + 'get_users.php';
const ADD_TRAINER_PAGE = WEB_ADDRESS + 'add_trainer.php';
const GET_VALIDATABLE_WORKOUTS_PAGE = WEB_ADDRESS + 'get_validatable_workouts.php';



// global constants
const USERNAME_HTML = "#username"; // TODO
const PASSWORD_HTML = "#password"; // TODO
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


function register() {
    if (checkUsernameValid() && checkPasswordValid()) {
        var sending = {
            USERNAME: $(USERNAME_HTML).get(),
            PASSWORD: $(PASSWORD_HTML).get()
        };

        $.getJSON(
            REGISTER_PAGE,
            sending,
            function (data) {
                handleLogin(data);
            });
    }
}

function handleLogin(response) {
    if (response == "Invalid_Data") {
        alert("BAD REQUEST");
    } else if (response == "No_User_Data") {
        alert("NO USER");
    } else {

        sessionid = response;
        alert(response.Address);
    }
    console.log(response);
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
const STARTDATE = "start";
const STARTDATE_HTML = "#start";
const ENDDATE = "end";
const ENDDATE_HTML = "#end";
const FREQUENCY = "frequency";
const FREQUENCY_HTML = "#frequency";
const METRIC = "metric";
const METRIC_HTML = "#metric";
const QUANTITY = "quantity";
const QUANTITY_HTML = "#quantity";
const DESCRIPTION = "description";
const DESCRIPTION_HTML = "#description";

function createWorkout() {

    if (checkWorkoutValid()) {
        var sending = {
            USERNAME: $(USERNAME_HTML).get(),
            PASSWORD: $(PASSWORD_HTML).get(),
            SESSION: sessionid,
            STARTDATE: $(STARTDATE_HTML).get(),
            ENDDATE: $(ENDDATE_HTML).get(),
            FREQUENCY: $(FREQUENCY_HTML).get(),
            METRIC: $(METRIC_HTML).get(),
            QUANTITY: $(QUANTITY_HTML).get(),
            DESCRIPTION: $(DESCRIPTION_HTML).get()
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
}

function checkWorkoutValid() {}

// update user information constants
const DOB = "dob";
const DOB_HTML = "#dob";
const HEIGHT = "height";
const HEIGHT_HTML = "#height";
const WEIGHT = "weight";
const WEIGHT_HTML = "#weight";
const EMAIL = "email";
const EMAIL_HTML = "#email";
const NAME = "name";
const NAME_HTML = "#name";
const ADDRESS = "address";
const ADDRESS_HTML = "#address";

function updateUserInformation() {
    var sending = {
        USERNAME: $(USERNAME_HTML).get(),
        PASSWORD: $(PASSWORD_HTML).get(),
        SESSION: sessionid,
        DOB: $(DOB_HTML).get(),
        HEIGHT: $(HEIGHT_HTML).get(),
        WEIGHT: $(WEIGHT_HTML).get(),
        EMAIL: $(EMAIL_HTML).get(),
        NAME: $(NAME_HTML).get(),
        ADDRESS: $(ADDRESS_HTML).get()
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