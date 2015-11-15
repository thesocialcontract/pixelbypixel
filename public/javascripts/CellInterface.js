/**
 * Created by jon55_000 on 11/14/2015.
 */
function main() {
    alert("Hi");
}

function findFacebookUser() {
    /*
     Communicate with Facebook to find the user's ID
     */
    return "asdoi1245";
}

function userHasPaintedPixel(user) {
    /*
     Search the database for user
     if user is in the database return true
     */
    return true;
}

function isPixelInDatabase(xCoord, yCoord) {
    /*
     Find coordinates in database
     if !coordinates do nothing
     if coordinates do parse coordinates
     */
    var b = false;
    if (xCoord != null && yCoord != null) {
        b = true;
    }
    return b;
}

function popup(cell) {
    var pixelIsFilled = cell.facebookId !== "";
    var user = findFacebookUser();
    var userHasAddedPixel = userHasPaintedPixel(user);

    //alert("You are opening the interface");

    var dataOnCell;
    if (pixelIsFilled) {
        /*
            Display data about the pixel:
                User who added it
                Color
                When it was added
         */
        dataOnCell = "<h1>Cell painted by " + cell.facebookId + "</h1><p>Location: " + cell.x + ", " + cell.y + " </p>" +
            "<p>Color: " + cell.color + "</p><p>Date added: " + cell.date + " </p><button onclick='removeBubble()'>Get rid of this</button>";
    } else {
        if (cell.facebookId === "") {
            /*
                Tell user to log in
             */
        } else {
            if (userHasAddedPixel) {
                /*
                    Tell user they have already painted once
                 */
            } else {
                /*
                    Display the paint interface
                 */
            }
        }
    }

    //alert(dataOnCell);

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
                $(this).showBalloon({ contents: dataOnCell, position: "top"});
            } else {
                $(this).hideBalloon();
            }
        });
    });
}

function removeBubble() {
    $("#elementToClick").hideBalloon();
}