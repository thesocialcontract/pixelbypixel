/**
 * Created by jon55_000 on 11/14/2015.
 */
function findFacebookUser() {
    /*
     Communicate with Facebook to find the user's ID
     */
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
                return response.id;
        });
    }
    console.log('Welcome!  Fetching your information.... ');
}

function userHasPaintedPixel(user) {
    /*
     Search the database for user
     if user is in the database return true
     */
    return false;
}

function popup(cell) {
    var pixelIsFilled = cell.facebookId !== "";
    var user = findFacebookUser();
    var userHasAddedPixel = userHasPaintedPixel(user);
    var cellInterface;
    var colorPaletteOpen = false;

    if (pixelIsFilled) {
        /*
            Display data about the pixel:
                User who added it
                Color
                Coordinates
                When it was added
         */
        cellInterface = "<h1>Cell painted by " + cell.facebookId + "</h1><p>Location: " + cell.x + ", " + cell.y + " </p>" +
            "<p>Color: " + cell.color + "</p><p>Date added: " + cell.date + " </p><button onclick='removeBubble()'>Hide this</button>";
    } else {
        if (user === "") {
            /*
                Tell user to log in
             */
            cellInterface = "<h1>You need to log in to Facebook to paint a pixel!</h1><br><br>";
            cellInterface += "<fb:login-button scope='public_profile,email' onlogin='checkLoginState();' " +
                "login_text='' class=' fb_iframe_widget' fb-xfbml-state='rendered' fb-iframe-plugin-query='app_id=1006198082778044&amp;container_width=0&amp;locale=en_US&amp;scope=public_profile%2Cemail&amp;sdk=joey'>" +
                "<span style='vertical-align: bottom; width: 65px; height: 22px;'><iframe name='f2afb4023' width='1000px'" +
                " height='1000px' frameborder='0' allowtransparency='true' allowfullscreen='true' scrolling='no' title='fb:login_button Facebook Social Plugin'" +
                " src='http://www.facebook.com/v2.2/plugins/login_button.php?app_id=1006198082778044" +
                "&amp;channel=http%3A%2F%2Fstatic.ak.facebook.com%2Fconnect%2Fxd_arbiter%2FwjDNIDNrTQG.js%3Fversion%3D41%23cb%3Df2ac59855c%26domain%3Dlocalhost%26origin%3Dhttp%253A%252F%252Flocalhost%253A3000%252Ff1c440cc68%26relation%3Dparent.parent" +
                "&amp;container_width=0&amp;locale=en_US&amp;scope=public_profile%2Cemail&amp;sdk=joey' style='" +
                "border: none; visibility: visible; width: 65px; height: 22px;' class=''></iframe></span></fb:login-button>";
        } else {
            if (userHasAddedPixel) {
                /*
                    Tell user they have already painted once
                 */
                if (user === cell.facebookId) {
                    cellInterface = "<h1>You have already painted a pixel</h1><button onclick='removeBubble()'>Hide this</button>";
                }
            } else {
                /*
                    Display the paint interface
                 */
                displayPaintInterface = true;
                cellInterface = "<h1>Paint a new pixel</h1><input type='number' disabled='disabled' value=" + cell.x + ">X Coordinate" +
                    "</input><br><input type='number' disabled='disabled' value=" + cell.y + ">X Coordinate</input><br><input type='text' name='triggerSet' id='triggerSet'/>" +
                    "<br><br><div style='text-align: center'><button OnClick='paintPixel()'>Paint your pixel</button>" +
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                    "<button onclick='removeBubble()'>Hide this</button></div>";
                colorPaletteOpen = true;
            }
        }
    }
    /*var elementToAddTo = document.getElementById("body");
    var paragraph = document.createElement("p");
    paragraph.setAttribute("id", "elementToClick")
    var textNode = document.createTextNode("Hi thar");
    paragraph.appendChild(textNode);
    elementToAddTo.appendChild(paragraph);*/

    var cellElement = document.getElementById(cell.x + ", " + cell.y); //TODO possible bug

    $(document).ready(function() {
        $.balloon.defaults.minLifetime = 0;
        var shown = true;
        $(cellElement).click(function() { //TODO possible bug
            shown = true;
            if (shown) {
                $(this).showBalloon({ contents: cellInterface, position: "top"});
            } else {
                $(this).hideBalloon();
            }
            if (colorPaletteOpen) {
                $("#triggerSet").spectrum({
                    showInput: true,
                    showPaletteOnly: true,
                    togglePaletteOnly: true,
                    togglePaletteMoreText: 'more',
                    togglePaletteLessText: 'less',
                    palette: [
                        ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
                        ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
                        ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
                        ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
                        ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
                        ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
                        ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
                        ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
                    ]
                });

// Show the original input to demonstrate the value changing when calling `set`
                $("#triggerSet").show();

                $("#btnEnterAColor").click(function() {
                    $("#triggerSet").spectrum("set", $("#enterAColor").val());
                });
            }
        });
    });
}

function removeBubble() {
    $("#elementToClick").hideBalloon();
}

function paintPixel() {

}