document.addEventListener('DOMContentLoaded', () => {
    let params = new URLSearchParams(location.search);
    var mode = params.get('mode');
    var actionCode = params.get('oobCode');
    var continueUrl = params.get('continueUrl');
    var lang = params.get('lang') || 'en';
    var apiKey = params.get('apiKey');
    var config = {
        'apiKey': apiKey
    };
    var app = firebase.initializeApp(config);
    var auth = app.auth();
    switch (mode) {
    case 'resetPassword':
        handleResetPassword(auth, actionCode, continueUrl, lang);
        break;
    case 'recoverEmail':
        handleRecoverEmail(auth, actionCode, lang);
        break;
    case 'verifyEmail':
        handleVerifyEmail(auth, actionCode, continueUrl, lang);
        break;
    default:
        $('#title').html('400. That’s an error.');
        $('#title-help').html('Invalid mode request, try again.');
    }
}, false);

function handleRecoverEmail(auth, actionCode, lang) {
    $('#title').html('404. That’s an error.');
    $('#title-help').html('Contact me: zemorts@gmail.com');
}

function handleResetPassword(auth, actionCode, continueUrl, lang) {
    auth.verifyPasswordResetCode(actionCode).then((email) => {
        $('#resetPassword').show();
        $('#main').hide();
        var accountEmail = email;

        $("#reset").on("click", function () {
            if ($('#password').val() == $('#re-password').val()) {
                var newPassword = $('#password').val();
                auth.confirmPasswordReset(actionCode, newPassword).then((resp) => {
                    $('#resetPassword').hide();
                    $('#main').show();
                    $('#title').html('New Password Updated!');
                    $('#title-help').html('Password reset has been confirmed and new password updated.');
                    if (continueUrl !== null) {
                        window.open(continueUrl, "_self");
                    };
                }).catch((error) => {
                    var errorMessage = error.message;
                    $('#password-help').html(errorMessage);
                });
            } else {
                $('#password-help').html('The password is not the same.');
            };
        });
    }).catch((error) => {
        var errorMessage = error.message;
        $('#title').html('Reset password error.');
        $('#title-help').html('Invalid or expired action code. Try to reset the password again.');
    });
}

function handleRecoverEmail(auth, actionCode, lang) {
    $('#title').html('Verified.');
    $('#title-help').html('Email address has been verified.');
}

function handleVerifyEmail(auth, actionCode, continueUrl, lang) {
    auth.applyActionCode(actionCode).then((resp) => {
        $('#title').html('Verified.');
        $('#title-help').html('Email address has been verified.');
        if (continueUrl !== null) {
            window.open(continueUrl, "_self");
        };
    }).catch((error) => {
        var errorMessage = error.message;
        $('#title').html('Reset password error.');
        $('#title-help').html('Invalid or expired action code. Try to reset the password again.');
    });
}
