var init = require('./init');
var crud = require('./crud');

$(document).ready(function(){
    console.log('app');

    var idUser;
    var usersArr = [];
    init();


    //create
    $('#create-user').submit(function(event) {
        crud.createUser(event);
    });

    //delete
    $(document).on('click', '.delete-user', function(event) {
        crud.deleteUser(event);
    });

    //update
    $(document).on('click', '.update-user', function(event) {
        crud.updateUser(event);
    });

    //delete all
    $('#delete-all').click(function() {
        $('.list-group-item').remove();
        localStorage.setItem('userlist', '[]');
        //localStorage.removeItem('userlist');
        usersArr = [];
    });

    //toggle user
    $(document).on('click', '.user-in-list', function() {
        $(this).find('.user-details').toggle('slow');
    });

});
