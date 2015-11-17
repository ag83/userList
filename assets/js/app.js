$(document).ready(function(){

    var idUser = 0;
    var usersArr = [];

    $('#update-user').click(function(event) {
        $('.users-update').show();
    });


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
            userId = idUser++;

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
        console.log('newUser');
    });

    //list
    $('#list-users').click(function(event) {
        $('.users-list').show();
        $('.users-update').hide();
        console.log('LIST', usersArr);
        $.each(usersArr, function(index, value) {
            if ($('#id'+value.userId).length == 0) {
                //console.log(value);
                var userHTML = '<div class = "user-in-list", id = "id'+ value.userId + '">' +
                            '<div> User Name: '+ value.userName +'</div>' +
                            '<div> Email: '+ value.userEmail +'</div>' +
                            '<div> Telephone: '+ value.userTelephone +'</div>' +
                            '<div> Adress: Street: '+ value.userStreet + ' City: '+ value.userCity +
                            ' State: '+ value.userState + ' Zip code: '+ value.userZip +'</div>' +
                            '<button class="update-user">Update user</button><button class="delete-user">Delete user</button></div>';
                $('.users-list').append(userHTML);
            }

        });
    });

    //delete
   $(document).on('click', '.delete-user', function() {
        var idDel = $(this).parent('div').attr('id');
        $('#' + idDel).remove();
        var idUser = +idDel.slice(2);
        deleteUserArr(usersArr, idUser)
    });

    //update
   $(document).on('click', '.update-user', function() {
        var idUpd = $(this).parent('div').attr('id');  
        var idUser = +idUpd.slice(2);      
        var editedUser = deleteUserArr(usersArr, idUser)[0];
        $('#' + idUpd).remove();
        $('.users-update').show();

        $('#user-name').val(editedUser.userName),
        $('#user-email').val(editedUser.userEmail),
        $('#user-telephone').val(editedUser.userTelephone),
        $('#user-street').val(editedUser.userStreet),
        $('#user-city').val(editedUser.userCity),
        $('#user-state').val(editedUser.userState),
        $('#user-zip').val(editedUser.userZip)


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


});