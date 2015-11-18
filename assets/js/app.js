$(document).ready(function(){

    var idUser;
    var usersArr = [];
    init();


    //create
    $('#create-user').submit(function(event) {
        event.preventDefault();
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
        //console.log(newUser);
    });

    //delete
   $(document).on('click', '.delete-user', function() {
        var idDel = $(this).parents('.user-in-list').attr('id');
        $('#' + idDel).parent('.list-group-item').remove();
        var idUser = +idDel.slice(2);
        deleteUserArr(usersArr, idUser);
        localStorage.setItem('userlist', JSON.stringify(usersArr));
    });

    //update
   $(document).on('click', '.update-user', function() {
        var idUpd = $(this).parents('.user-in-list').attr('id');  
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
    });

    $('#delete-all').click(function() {
        $('.list-group-item').remove();
        localStorage.removeItem('userlist');
    });

    $(document).on('click', '.user-in-list', function() {
        $(this).find('.user-details').toggle('slow');
    });

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

    function addUser(userObj) {
        if ($('#id'+userObj.userId).length == 0) {
            //console.log(useObj);
            var userAddress = '';
            if (userObj.userStreet) {
                userAddress = userObj.userStreet;
            }
            if (userObj.userCity && userAddress.length > 0) {
                userAddress += ' , ' + userObj.userCity;
            } else if (userObj.userCity) {
                userAddress += userObj.userCity;
            }
            if (userObj.userState && userAddress.length > 0) {
                userAddress += ' , ' + userObj.userState;
            } else if (userObj.userState) {
                userAddress += userObj.userState;
            }
            if (userObj.userZip && userAddress.length > 0) {
                userAddress += ' , ' + userObj.userZip;
            } else if (userObj.userZip) {
                userAddress += userObj.userZip;
            }
            /* var userRow = '<tr id = "id'+ userObj.userId + '">'
                        +'<td>' + userObj.userName + '</td>'
                        +'<td>' + userObj.userEmail + '</td>'
                        +'<td>' + userObj.userTelephone + '</td>'
                        +'<td>' + userAddress + '</td>'
                        +'<td><button class="update-user">Update user</button></td>'
                        +'<td><button class="delete-user">Delete user</button></td>'
                        + '</tr>'; */
            var userHTML = '<li class="list-group-item"><div class = "user-in-list", id = "id'+ userObj.userId + 
                        '" data-toggle="tooltip" data-placement="top" title="Click to see details">' +
                        '<div> <h4> '+ userObj.userName +'</h4></div>' +
                        '<div class="user-details"><div> Email: '+ userObj.userEmail +'</div>';
            if (userObj.userTelephone) {
                userHTML += '<div> Telephone: '+ userObj.userTelephone +'</div>';
            }
            if (userAddress.length > 0) {
              userHTML += '<div>Address: '+ userAddress +'</div>'
            }
            userHTML += '<button class="update-user btn btn-default btn-sm">Update user</button>  '+
                        '<button class="delete-user btn btn-danger btn-sm">Delete user</button></div></div></li>';
            
            $('#users-list').append(userHTML);
        } else {
            //console.log('present', userObj.userId)
        }
    }

    function init() {
        //set local storage or get users from it
        if (!localStorage['userlist']) {
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
    }


});
