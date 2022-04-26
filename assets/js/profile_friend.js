$(' #toggle-friend-button').click(function (e) {
    e.preventDefault();
    let self = this;
    
    $.ajax({
        type: 'GET',
        url: $(self).attr('href'),
    })

    .done(function (data) {
        if (data.data.flag == true) {
            $(self).html('Add');
        }
        else {
            $(self).html('Remove');
        }
    })
    .fail(function (err) {
        console.log("Error in toggling ", err);
    });

});


