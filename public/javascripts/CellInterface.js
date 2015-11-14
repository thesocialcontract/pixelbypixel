/**
 * Created by jon55_000 on 11/14/2015.
 */

function isUserInDatabase(userId) {
    /*
     Find userId in database
     if userId === "" return false
     if !userId return false
     if userId return true
     */
    if (userId === "") {

    }
    return false;
}

function isPixelInDatabase(x, y) {
    /*
     Find coordinates in database
     if !coordinates do nothing
     if coordinates do parse coordinates
     */
    if (x == -1 && y == -1) {

    }
    return false;
}

function popup(facebookId, coordinates) {
    var userHasAddedPixel = isUserInDatabase(facebookId);
    var coordArray = coordinates.split(", ");

    var xCoord = parseInt(coordArray[0]);
    var yCoord = parseInt(coordArray[1]);
    var pixelIsFilled = isPixelInDatabase(xCoord, yCoord);

    alert("You are opening the interface");
    var mainDivision = document.createAttribute("div");
    div.setAttribute("id", "Cell Interface");
    div.setAttribute("align", "center");
    var paragraph1 = document.createAttribute("p");
    var textNode;

    if (pixelIsFilled) {
        /*
            Display data about the pixel:
                User who added it
                Color
                When it was added
         */
    } else {
        if (facebookId === "") {
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
}