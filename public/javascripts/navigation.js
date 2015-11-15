/**
 * Created by Caleb on 11/14/2015.
 */
//var db = require('./db.js');
// On click and drag
var x = 0;
var y = 0;
var socket = io();
var socketResult;
function onClick() {

    // TODO: Write event handlers
    // if in cellBubble
        // CellBubbleEvent(x, y)
    // else
        // pop bubble
    // else if
    // move the screen
    $(document).ready(function(){
        $('canvas').on('mousedown', function (evt) {
            alert();
            var x1 = event.clientX;
            var y1 = event.clientY;
            $(this).on('mouseup mousemove', function handler(evt) {
                if (evt.type === 'mouseup') {
                    // click
                } else {
                    // drag
                    x = event.clientX - x1;
                    y = event.clientY - y1;
                    alert(x + ", " + y);
                }
                $(this).off('mouseup mousemove', handler);
            });
        });
    });
}

function onClickCell() {
    // if haven't dragged recently
        CellInterface(cell);
    //grab data from database
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

// TODO: Write DB access
//var isColored = false;
//socket.on('reportEntry', function(results){
//    if (results.empty)
//        is.Colored = false;
//    else
//        is.Colored = true;
//
//});
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
            //socket.emit('grabEntry', x+i, y-k);
            //var str = db.get().query('select * from mydb.pxbypx');
            //if (str has facebookID)
            //    draw color
            //else
            {
                /* create an svg drawing */
                var draw = SVG('drawing');
                var rect = draw.rect(50,50).fill('#eae1cc');
                draw.line(0,0,50,0).stroke({ color: '#c2a96d', width: 2 });
                draw.line(0,0,0,50).stroke({ color: '#c2a96d', width: 2 });
                draw.line(50,50,0,50).stroke({ color: '#c2a96d', width: 1 });
                draw.line(50,50,50,0).stroke({ color: '#c2a96d', width: 1 });
                draw.line(0,50,50,0).stroke({ color: '#c2a96d', width: 2 });
            }
        }
    }
}