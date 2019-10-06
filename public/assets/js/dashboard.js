$(function() {

    // MEMBERS
    // ===========================================================================================
        
        // Display all members
        $(document).ready(function(){
            // hide modal
            $('.modal').hide();

            // AJAX call to display member
            $.ajax('/api/members/', {
                method: 'GET',
            }).then(function(dbMember){
                // loop through each member and do the following...
                for (let i = 0; i < dbMember.length; i++) {
                    // store the member name and ID
                    const memberName = dbMember[i].name;
                    const memberId = dbMember[i].id;

                    // create a variable to store the list html element
                    var l = $('<li>');
                    
                    // add class to the member name list item
                    l.addClass(member);

                    // add member name to list item
                    l.text(memberName);

                    // create variable to create delete button element
                    var d = $('<button>');

                    // add data type attr to button
                    d.attr('data-type', memberId)
                    
                    // add class to remove button
                    d.addClass('removeButton')

                    // add remove text to button
                    d.text('Remove');

                    // append member name and button to list item
                    $('#member').append(l,d);
                }
                console.log(member)
            })
        })

        // Delete a member
        $(document).on('click', '.removeButton', function(){
            var id = $(this).attr('data-type');
            
            $.ajax({
                method: 'DELETE',
                url: "/api/members/" + id
            }).then(function(dbMember){
                // alert('User removed' + dbMember);
                location.reload();
            })
        })

        // Show add member modal
        $('#openModal').on('click', function(){
            $('#memberModal').show();
        });

        // Close modal
        $('.close').on('click', function(){
            $('.modal').hide();
        });


        // Add a member
        $('#addMember').on('click', function(){
            var memberName = $('#memberNameForm').val().trim();
            var memberEmail = $('#memberEmailForm').val().trim();

            var newMember = {
                name: memberName,
                email: memberEmail
            }
     
            $.ajax('/api/members/', {
                type: 'POST',
                data: newMember
            }).then(function(){
                $('#memberModal').hide();
                location.reload();
            })
        })
    // =========================================================================================================
    
    
    // EVENT
    // ====================================================================

        // Add event
        $('#eventSubmit').on('click', function(e){
            e.preventDefault();

            // store the data inputs
            var location = $('#location').val().trim();
            var time = $('#time').val().trim();

            // display the event information
            $('#displayLocation').text(location);
            $('#displayTime').text(time);

        })

    // BOOKS
    // ======================================================================
    // Show search book modal
    $('#searchCurBook').on('click', function(){
        $('#bookModal').show();
    });

    // Search Google Books API
    $('#searchBook').on('click', function(){
        var bookTitle = $('#bookTitle').val().trim();

        // AJAX call to Google Books
        $.ajax({
            method: 'GET',
            url: 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + bookTitle  + '&key=AIzaSyCpKN7jqCo9yAbysuJQhskHwS6J1JaAdHw'
        }).then(function(result){
            console.log(result)
        })
    })


})