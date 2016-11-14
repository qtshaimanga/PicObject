var path = require('path');
var low = require('lowdb');

var db = low(path.resolve(__dirname, './jsonFiles/interval.json'));

//console.log(db('values'));
module.exports = db('values');
