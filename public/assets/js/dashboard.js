$(function() {
       
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

            // AJAX call to display events

            $.ajax('/api/events', {
                method: 'GET',
            }).then(function(dbEvents){

                $('#displayLocation').html(dbEvents[dbEvents.length-1].location);
                $('#displayTime').html(dbEvents[dbEvents.length-1].time);
 
            });
    

            // AJAX call to display current book
            $.ajax('/api/currentbooks/', {
                method: 'GET'
            }).then(function(dbCurrentBook){
                // GET request to Google Books
                $.ajax({
                    method: 'GET',
                    url: 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + dbCurrentBook  + '&key=AIzaSyCpKN7jqCo9yAbysuJQhskHwS6J1JaAdHw'
            })
            
        
        
        
            // $('#currentBokTitleHeader').html('Book Title:');
            // $('#currentBookTitle').html(book.title);

            // $('#currentBookAuthorHeader').html('Author:');
            // $('#currentBookAuthor').html(book.author);

            // $('#currentbookBioHeader').html('Storyline:');
            // $('#currentBookBio').html(book.bio);

            // $('#currentBookImage').attr('src', book.thumbnail);

            // $('#currentBookLink').html('Learn more').attr('href', book.link).addClass('bookThumbnail');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        })

        // ========================================================================================
        


        // Member functionalities
        // ================================================================

                // Show add member modal
                $('#openModal').on('click', function(){
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
        var bookTitle = $('#bookTitle').val().trim();
        // AJAX call to Google Books
        $.ajax({
            method: 'GET',
            url: 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + bookTitle  + '&key=AIzaSyCpKN7jqCo9yAbysuJQhskHwS6J1JaAdHw'
        }).then(function(result){
            
            // store result in object

            var book = {
                id: result.items[0].id,
                title: result.items[0].volumeInfo.title,
                author: result.items[0].volumeInfo.authors[0],
                bio: result.items[0].searchInfo.textSnippet,
                thumbnail: result.items[0].volumeInfo.imageLinks.smallThumbnail,
                link: result.items[0].volumeInfo.infoLink
            }

            // update html elements in modal

            $('#resBookTitleHeader').html('Book Title:');
            $('#resBookTitle').html(book.title);

            $('#resBookauthorHeader').html('Author:');
            $('#resBookAuthor').html(book.author);

            $('#resBookBioHeader').html('Storyline:');
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
            $('#addToNextBook').on('click', function(book){

            });

        
        });


    })


})