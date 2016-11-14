var express = require('express');
var path = require('path');
var SerialPort = require('serialport').SerialPort;
var xbee_api = require('xbee-api');

var json = require('../back/jsonFiles/interval.json');

var Promise = require('es6-promise').Promise;
var raf = require('raf');
var ls = require('local-storage');
var jsonfile = require('jsonfile');

var WatchJS = require("watchjs")
var watch = WatchJS.watch;
var unwatch = WatchJS.unwatch;
var callWatchers = WatchJS.callWatchers;

var app = express();

console.log("Index 2 -");

//------ EMITTER
var data = "-  -";
var index = 0;
var timer = Number(json.time)*60000;

function fileChange(){
  setTimeout(function(){
    index +=1;

    console.log("Action sent");
    var actionReturn = action(data);

    if(actionReturn == "sucess"){

        // INDEX 3
        setTimeout(function(){
          console.log("Files change");
          var fs = require('fs');




          fs.rename('./back/index.js', './back/index2.js', function(sucess, err) {
            if ( err ){ console.log('ERROR: ' + err); }
            if (sucess){ console.log("sucess : index to index2 ") }
          });

          fs.rename('./back/index3.js', './back/index.js', function(sucess, err) {
              if ( err ) { console.log('ERROR: ' + err); }
              if (sucess){ console.log("sucess : index3 to index ") }
          });




        }, 10000);

    }else{
      console.log("Error change")
    }

  }, 10000);
}

if(String(json.start) == "true"){
  fileChange();
}else{
  console.log("system stopped");
}

function action (d){
    var cmd = String(d);

    /*ACTION XBEE*/
	  var C = xbee_api.constants;
	  var xbeeAPI = new xbee_api.XBeeAPI({
		      api_mode: 1
	  });

    var serialport = new SerialPort("/dev/ttyUSB0", {
        baudrate: 9600,
        parser: xbeeAPI.rawParser()
    });

    serialport.on("open", function() {
      console.log("Xbee-api is open on port /dev/ttyUSB0 and baudrate 9600");
      var frame_obj = {
        type: C.FRAME_TYPE.AT_COMMAND,
        command: cmd,
        commandParameter: "",
      };
      console.log("Message sent:", xbeeAPI.buildFrame(frame_obj));
      serialport.write(xbeeAPI.buildFrame(frame_obj));
    });

    serialport.on("error", function() {
      console.log("But Xbee not found");
    });

    return "sucess"
}


//------SERVER EXPRESS WITH NODE
var server = app.listen(9000, function(){
    console.log('Server ready on localhost: 9000');
})
