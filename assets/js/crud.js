var addUser = require('./list');


function deleteUserArr(arr, id) {
    var userIndex;
    for (var i=0; i < arr.length; i++) {
        if (arr[i].userId == id) {
            userIndex = i;
        }
    }
    var deleted = usersArr.splice(userIndex, 1);
    return deleted;
}

var createUser = function(evt) {
    evt.preventDefault();
    var userName = $('#user-name').val(),
        userEmail = $('#user-email').val(),
        userTelephone = $('#user-telephone').val(),
        userStreet = $('#user-street').val(),
        userCity = $('#user-city').val(),
        userState = $('#user-state').val(),
        userZip = $('#user-zip').val()
        userId = $('#user-id').val() || ++idUser;

    var newUser = {userName: userName, 
                    userEmail: userEmail,
                    userTelephone: userTelephone,
                    userStreet: userStreet,
                    userCity: userCity,
                    userState: userState,
                    userZip: userZip,
                    userId: userId
                };
    usersArr.push(newUser);
    addUser(newUser);
    localStorage.setItem('userlist', JSON.stringify(usersArr));
    $(':input').val('');
};

var deleteUser = function(evt) {
    var idDel = $(evt.target).parents('.user-in-list').attr('id');
    $('#' + idDel).parent('.list-group-item').remove();
    var idUser = +idDel.slice(2);
    deleteUserArr(usersArr, idUser);
    localStorage.setItem('userlist', JSON.stringify(usersArr));
};

var updateUser = function(evt) {
    var idUpd = $(evt.target).parents('.user-in-list').attr('id');  
    var idUser = +idUpd.slice(2);      
    var editedUser = deleteUserArr(usersArr, idUser)[0];
    localStorage.setItem('userlist', JSON.stringify(usersArr));
    $('#' + idUpd).parent('.list-group-item').remove();

    $('#user-name').val(editedUser.userName),
    $('#user-email').val(editedUser.userEmail),
    $('#user-telephone').val(editedUser.userTelephone),
    $('#user-street').val(editedUser.userStreet),
    $('#user-city').val(editedUser.userCity),
    $('#user-state').val(editedUser.userState),
    $('#user-zip').val(editedUser.userZip)
    $('#user-id').val(editedUser.userId)
};

exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;


