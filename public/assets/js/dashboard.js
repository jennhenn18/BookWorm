$(function() {

    // Display Members functionality
    $(document).ready(function(){
        $.ajax('/api/members/', {
            method: 'GET',
        }).then(function(dbMember){
            for (let i = 0; i < dbMember.length; i++) {
                const member = dbMember[i].name;
                console.log(member)
                $('#member').append('<li>' + member + '</li>')
            }
        })
    })

    // Event functionality
    // ========================================
    $('#eventSubmit').on('click', function(e){
        e.preventDefault();

        // store the data inputs
        var location = $('#location').val().trim();
        var time = $('#time').val().trim();

        // display the event information
        $('#displayLocation').text(location);
        $('#displayTime').text(time);

    })
})