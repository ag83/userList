var addUser = require('./list');

module.exports = function() {

    //set local storage or get users from it
    if (!localStorage.userlist) {
        localStorage.setItem('userlist', '[]');
    } else {
        usersArr = JSON.parse(localStorage.getItem('userlist'));
    }
    console.log('userarr', usersArr);
    //set id for new users
    var maxId = 0;
    if (usersArr.length > 0)  {
        for (var i = 0; i < usersArr.length; i++) {
            if (usersArr[i].userId > maxId) {
                maxId = usersArr[i].userId;
            }
        }
    }
    idUser = maxId;

    //list present users
    $.each(usersArr, function(index, value) {
        addUser(value);
    });

    //inut tooltip
    $('[data-toggle="tooltip"]').tooltip();

};
