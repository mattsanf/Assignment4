$(document).ready(function () {
    var socket = io();
    var nickname = "";



    $(".login").on("click", function (e) {
        e.preventDefault();
        if ($("#usrName").val() != "") {
            nickname = $("#usrName").val();
            $("#login-page").slideUp();
        } else {
            $("#usrName").parent().addClass("has-error");
            $(".error").show();
        }
    });
    $('.send').on('click', function () {
        socket.emit('chat message', "<strong>" + nickname + ":</strong> " + $('.message').val());
        $('.message').val('');
    });

    $('.message').bind('keypress', function (e) {
        var code = e.keyCode || e.which;
        if (code == 13 && $(".message").is(":focus")) {
            socket.emit('chat message', "<strong>" + nickname + ":</strong> " + $('.message').val());
            $('.message').val('');
        }
    });


    socket.on('chat message', function (msg) {
        $('.chat-log').append($('<li>').html(msg));
        $(".chat").scrollTop($(".chat").prop("scrollHeight"));
        $(".chat").perfectScrollbar('update');
    });
    $(".chat").perfectScrollbar();

});