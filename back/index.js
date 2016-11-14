var express = require('express');
var path = require('path');
var SerialPort = require('serialport').SerialPort;
var xbee_api = require('xbee-api');
var jsonArray = require('../back/jsonFiles/interval.json');
var bodyParser = require('body-parser');
var api = require('./api');
var app = express();

var json = jsonArray.values[0];
var start = json.start;
var timer = Number(json.timer)*60000;
var rotationDroite = String(json.actionsMore);
var rotationGauche = String(json.actionsLess);

var date = new Date();
console.log(date);

  var index = 0;
  function asynccc (onComplete) {
      var a = String();
        if(index==10){ index=0 }
        if(index%2>0){
          a = rotationDroite;
        }else{
          a = rotationGauche;
        }
        index += 1;

      onComplete(a)
      setTimeout(updateValue, timer)
  };

  function updateValue(){
    asynccc(function (data) {

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
            command: data,
            commandParameter: "",
          };
          console.log("Message sent:", xbeeAPI.buildFrame(frame_obj));
          serialport.write(xbeeAPI.buildFrame(frame_obj));
        });

        serialport.on("error", function() {
          console.log("But Xbee not found", data);
        });

        //console.log(data);
        //return data;
      }
    )
  }


if(start == "true"){
  updateValue();
}else{
  console.log("System stopped")
}


//------SERVER EXPRESS WITH NODE

app.get('/api/picolo', function (req, res) {
  res.send(json);
});

app.use(bodyParser.json());
app.post('/api/picolo', function(req, res) {
    api.update(req, res);
});

app.use(express.static ( path.resolve(__dirname, '..', 'front'), {"Access-Control-Allow-Origin": "*"} ));

var server = app.listen(9000, function(){
    console.log('Server ready on localhost: 9000');
})
