


$(document).ready(function() {

       
    // Create all get AJAXs call on document load
    // ====================================================================

        $(document).ready(function(){

            // hide all modals
            $('.modal').hide();

            // AJAX call to display member

            $.ajax('/api/members/', {
                method: 'GET',
            }).then(function(dbMember){
                // loop through each member and do the following...
                for (let i=0; i < dbMember.length; i++) {
                    // store the member name and ID
                    const memberName = dbMember[i].name;
                    const memberId = dbMember[i].id;

                    // create a variable to store the list html element
                    var l = $('<li>');
                    
                    // add class to the member name list item
                    l.addClass('member');

                    // add member name to list item
                    l.text(memberName);

                    // create variable to create delete button element
                    var d = $('<button>');

                    // add data type attr to button
                    d.attr('data-type', memberId)
                    
                    // add class to remove button
                    d.addClass('removeButton')

                    // add remove text to button
                    d.text('x');

                    // append member name and button to list item
                    $('#memberList').append(l,d, '<br>');
                }
            })

            // AJAX call to display events

            $.ajax('/api/events', {
                method: 'GET',
            }).then(function(dbEvents){

                $('#displayLocation').html(dbEvents[0].location);
                $('#displayTime').html(dbEvents[0].time);
 
            });
    

            // AJAX call to display current book

            $.ajax('/api/currentbooks/', {
                method: 'GET'
            }).then(function(result){
            
                // GET request to Google Books
                
                
                // store values in an object
                var currentBook = {
                    title: result.items[0].volumeInfo.title,
                    author: result.items[0].volumeInfo.authors[0],
                    bio: result.items[0].searchInfo.textSnippet,
                    thumbnail: result.items[0].volumeInfo.imageLinks.smallThumbnail,
                    link: result.items[0].volumeInfo.infoLink
                }

                // update HTML
                $('#currentBookTitle').html(currentBook.title);
    
                $('#currentBookAuthor').html(currentBook.author);

                $('#currentBookBio').html(currentBook.bio);
    
                $('#currentBookImage').attr('src', currentBook.thumbnail);
    
                $('#currentBookLink').html('Learn more').attr('href', currentBook.link);

            });
    

             // AJAX call to display next book

             $.ajax('/api/nextbooks/', {
                method: 'GET'
            }).then(function(result){

                    // store values in an object
                    var NextBook = {
                        title: result.items[0].volumeInfo.title,
                        author: result.items[0].volumeInfo.authors[0],
                        bio: result.items[0].searchInfo.textSnippet,
                        thumbnail: result.items[0].volumeInfo.imageLinks.smallThumbnail,
                        link: result.items[0].volumeInfo.infoLink
                    }

                    // update HTML
                    $('#NextBookTitle').html(NextBook.title);

                    $('#NextBookAuthor').html(NextBook.author);

                    $('#NextBookBio').html(NextBook.bio);
        
                    $('#NextBookImage').attr('src', NextBook.thumbnail);
        
                    $('#NextBookLink').html('Learn more').attr('href', NextBook.link);
        });
    });

        // ========================================================================================
        


        // Member functionalities
        // ================================================================

                // Show add member modal
                $('#addMemberButton').on('click', function(){
                    $('#memberModal').show();
                });
                
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

        // ========================================================================================

            

        
    
    
    // Event functionalities
    // ====================================================================

        // Show add event modal
        $('#createMeetupButton').on('click', function(){
            $('#eventModal').show();
        });


        // Add event
        $('#createEvent').on('click', function(){

            // store the data inputs
            var newEvent = {
                location: $('#location').val().trim(),
                time: $('#time').val().trim()
            }

            // pass data to update the events table
            $.ajax('/api/events/', {
                method: 'POST',
                data: newEvent
            }).then(function(dbEvent){
                // close modal
                $('#eventModal').hide();
                // reload page
                location.reload();
            });
        })

    // ========================================================================================

    // Close modal
    $('.close').on('click', function(){
        $('.modal').hide();
    });

    // Books functionality
    // ======================================================================
    // Show search book modal
    $('#searchBookButton').on('click', function(){
        $('#bookModal').show();
    });

    // 

    // Search Google Books API
    $('#searchBook').on('click', function(){
        var bookTitle = $('#bookTitle').val().trim()

        // AJAX call to search API
        $.ajax('/api/searchbooks/' + bookTitle, {
            method: 'GET', 
        }).then(function(result){
            // console.log(result)
            
            // store result in object

            var book = {
                id: result[0].volumeInfo.industryIdentifiers[0].identifier,
                title: result[0].volumeInfo.title,
                author: result[0].volumeInfo.authors[0],
                bio: result[0].searchInfo.textSnippet,
                thumbnail: result[0].volumeInfo.imageLinks.smallThumbnail,
                link: result[0].volumeInfo.infoLink
            }

            // // update html elements in modal

            $('#resBookTitle').html(book.title);

            $('#resBookAuthor').html(book.author);

            $('#resBookBio').html(book.bio);

            $('#resBookImage').attr('src', book.thumbnail);

            $('#resBookLink').html('Learn more').attr('href', book.link);

            // If "add to current book" button is clicked run function to add google book ID to the books table
            $('#addToCurrentBook').on('click', function(){
                // send bookID to current book column in the books table
                $.ajax('/api/currentbooks/', {
                    method: 'POST',
                    data: book
                }).then(function(dbCurrentBook){
                    // clear form
                    $('#bookTitle').html('');

                    // close modal
                    $('#bookModal').hide();

                    // reload page
                    location.reload();
                });
            
            });

               


            // If "add to next book" button is clicked run function to add information to next book card
            $('#addToNextBook').on('click', function(){

                // send bookID to next book column in the books table
                $.ajax('/api/nextbooks/', {
                    method: 'POST',
                    data: book
                }).then(function(dbNextBook){
                    // clear form
                    $('#bookTitle').html('');

                    // close modal
                    $('#bookModal').hide();

                    // reload page
                    location.reload();
                });
            

            });
        });
    });

});
