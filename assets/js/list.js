module.exports = function(userObj) {

        if ($('#id'+userObj.userId).length == 0) {

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

};
