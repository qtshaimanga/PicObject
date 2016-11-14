var express = require('express');
var path = require('path');
var SerialPort = require('serialport').SerialPort;
var xbee_api = require('xbee-api');
var json = require('../back/jsonfile/interval.json');
var Promise = require('es6-promise').Promise;
var raf = require('raf');
var ls = require('local-storage');
var jsonfile = require('jsonfile');

var WatchJS = require("watchjs")
var watch = WatchJS.watch;
var unwatch = WatchJS.unwatch;
var callWatchers = WatchJS.callWatchers;

var app = express();

//---- Front
//app.use(express.static ( path.resolve(__dirname, '..' , 'front', 'public') ));


//----- xbee-api
var C = xbee_api.constants;
var xbeeAPI = new xbee_api.XBeeAPI({
    api_mode: 1
});

var serialport = new SerialPort("/dev/tty.usbserial-DN00QB7R", {
    baudrate: 9600,
    parser: xbeeAPI.rawParser()
});

serialport.on("open", function() {
  console.log("Xbee-api is open on port /dev/tty.usbserial-DN00QB7R and baudrate 9600");
  var frame_obj = {
    type: C.FRAME_TYPE.AT_COMMAND,
    command: "",
    commandParameter: [],
  };
  console.log("Message sent:", xbeeAPI.buildFrame(frame_obj));
  serialport.write(xbeeAPI.buildFrame(frame_obj));
});

serialport.on("error", function() {
  console.log("But Xbee not found");
});


//------ STOP AND START SYSTEM
var start = json.start;
  if(start == "true"){
    dateChange();
    console.log("Hours : ", dateInit().heure, "h ", dateInit().minute,"m");
    console.log("System start");
    console.log("System will change all",json.interval,"min", "on", json.sections, "sections" );
  }else{
    console.log("System stropped");
  }


//------ DATE
function dateInit(){
  var d = new Date();
  var date = {
    heure: d.getHours(),
    minute: d.getMinutes(),
    secondd: d.getSeconds()
  }
  return date;
}

var interval = json.interval*1000;
var lapCounter = 0;

function dateChange() {
  dateInit();

  var h = dateInit().heure;
  var m = dateInit().minute
  lapCounter += 1;

  setTimeout(dateChange, interval);

  var datum = emit(h, m, lapCounter);
  console.log("step ->  ", datum);
}


//------ EMITTER
var sectionSelected = Number(json.sections);  // cf. correlation with rotation power (impulsion of arduino)
var section = sectionSelected + 1;
var sectionRestart = sectionSelected * 2;

function emit(heure, minute, lap){
  var moins = "-";  // sent string
  var plus = "+";

  if(lap > sectionRestart){
    lapCounter = 0; //reset the globale var
  }

  if(lap ==1 && Number(json.sections) == 1 && lap<=section){    // cas #1
    return null
  } else if(lap !=1 && lap<=section){  //1-4
    return plus
  }else if(lap>=sectionSelected){    //5-8
    return moins
  }
}


//------SERVER EXPRESS WITH NODE
var server = app.listen(9000, function(){
    console.log('Server ready on localhost: 9000');
})
