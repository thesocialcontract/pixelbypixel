/**
 * Created by Caleb on 11/14/2015.
 */
var db = require('./db.js');
// On click and drag
function onClick() {

    // TODO: Write event handlers
    // if in cellBubble
        // CellBubbleEvent(x, y)
    // else
        // pop bubble

    switch (x, y) {
        case logout:
            onClickLogout();
            break;
        case login:
            onClickLogin();
            break;
        default:
            movescreen();
    }
    // else if
    // move the screen
}

function onClickCell() {
    // if haven't dragged recently
        CellInterface(cell);
}

function onClickLogIn() {
    // log in, display log out
}

function onClickLogOut() {
    // log out, display log in
}

function onClickZoomIn() {
    // Set zoom level
    // change bounding box size
    // change cell size
}

function onClickZoomOut() {
    // Set zoom level
    // change bounding box size
    // change cell size
}


/* --------------------------------------------------------------------------
*   Viewing window starting from coords (x,y) with the zoomLevel
*
*   (x, y)  =   Top-left coords of bounding box.  Can land on partial cell
*   lenX    =   number of cells along the x-axis (can include partial cells)
*   lenY    =   number of cells along the y-axis (can include partial cells)
* --------------------------------------------------------------------------- */
function renderMap(x, y, lenX, lenY) {
    // TODO: Inefficient hack.  Optimize!!!
    for (i = 0; i < lenX; i++) {
        for (k = 0; k < lenY; k++) {
            // Talk to DB at coords (i, k)

            var str = db.get().query('select * from mydb.pxbypx');
            console.log(str);
            // if person drawed
                // draw SVG color
            // else
                // draw svg BLANK
        }
    }
}