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
        var idDel = $(this).parent('div').attr('id');
        $('#' + idDel).remove();
        var idUser = +idDel.slice(2);
        deleteUserArr(usersArr, idUser);
        localStorage.setItem('userlist', JSON.stringify(usersArr));
    });

    //update
   $(document).on('click', '.update-user', function() {
        var idUpd = $(this).parent('div').attr('id');  
        var idUser = +idUpd.slice(2);      
        var editedUser = deleteUserArr(usersArr, idUser)[0];
        localStorage.setItem('userlist', JSON.stringify(usersArr));
        $('#' + idUpd).remove();

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
        $('.user-in-list').remove();
        localStorage.removeItem('userlist');
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
            var userHTML = '<div class = "user-in-list", id = "id'+ userObj.userId + '">' +
                        '<div> User Name: '+ userObj.userName +'</div>' +
                        '<div> Email: '+ userObj.userEmail +'</div>' +
                        '<div> Telephone: '+ userObj.userTelephone +'</div>' +
                        '<div> Adress: Street: '+ userObj.userStreet + ' City: '+ userObj.userCity +
                        ' State: '+ userObj.userState + ' Zip code: '+ userObj.userZip +'</div>' +
                        '<button class="update-user">Update user</button><button class="delete-user">Delete user</button></div>';
            $('.users-list').append(userHTML);
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
    }


});
