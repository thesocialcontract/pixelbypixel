/**
 * Created by Caleb on 11/14/2015.
 */
var cell = function(facebookID, coords, datetime, color) {
    split = coords.indexOf(',');
    this.x = coords.slice(0,split);
    this.y = coords.slice(split+1);
    this.facebookID = facebookID;
    this.dateTimePainted = datetime;
    this.color = color;
}