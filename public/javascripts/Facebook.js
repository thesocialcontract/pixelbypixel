/**
 * Created by jon55_000 on 11/15/2015.
 */
/**
 * Created by jon55_000 on 11/15/2015.
 */
function devAuthorize() {
    window.fbAsyncInit = function () {
        FB.init({
            appId: '1006198082778044',
            xfbml: true,
            version: 'v2.5'
        });
    };
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}
function main() {
    function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            testAPI();
        } else if (response.status === 'not_authorized') {
            document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
        } else {
            document.getElementById('status').innerHTML = 'Please log ' +
                'into Facebook.';
        }
    }

    function checkLoginState() {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    }
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1006198082778044',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.2'
        });
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    };
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    function testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
            console.log(JSON.stringify(response));
            document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';

        });
    }
}

function logoutButton() {
    var something = function logout() {
        FB.logout(function (response) {
        });
        console.log('something')
    }
}