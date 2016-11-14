var fs = require('fs');
var jsonArray = require('../back/jsonFiles/interval.json');
var json = jsonArray.values[0];

window.onload = function(){

  var button = document.getElementsByClassName('but');
  var arrayDroite = [];
  var arrayGauche = [];

  for(var a=0; a<button.length; a++){
    var but = button[a];
    but.onclick = function(but){
        click(but);
    }
  }

  function click(but) {
    var button = but.toElement;
    var id = button.id;
    var value = button.value
    changeFile(id, value);
  }

  function changeFile(buttonClick, newValue){
      var obj = {};

      if(buttonClick == "restart"){
        console.log("Restart syteme");
      }

      if(buttonClick=="timer"){
        var time = document.getElementById('time');
        newValue = time.value
      }

      if(newValue!=""){

        if(newValue!="-" & newValue!="+"){
            obj[buttonClick] = newValue;
        }

        if(newValue == "+"){
          if(buttonClick == "moreDroite"){
            arrayDroite.push(newValue);
          }
          if(buttonClick == "lessDroite"){
            arrayDroite.splice(newValue, 1);
          }
          var objDroite =   arrayDroite.join("   ");
          obj["actionMore"] = objDroite;
        }

        if(newValue == "-"){
          if(buttonClick == "moreGauche"){
            arrayGauche.push(newValue);
          }
          if(buttonClick == "lessGauche"){
            arrayGauche.splice(newValue, 1);
          }
          var objGauche = arrayGauche.join("   ");
          obj["actionLess"] = objGauche;
        }

        //Set value or take origin value
        var start = obj.start;
        var timer = obj.timer;
        var actionMore = obj.actionMore;
        var actionLess = obj.actionLess;

        if(start != undefined){ json.start = start }
        if(timer != undefined){ json.timer = timer }
        if(actionMore != undefined ){ json.actionsMore = actionMore }
        if(actionLess != undefined){ json.actionsLess = actionLess }

        sequencesData(json.actionsLess, json.actionsMore, json.timer, json.start);

        // POST DATA IN REST API
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
          }
        };
        xhttp.open("POST", "http://myhome-edf.fr:9000/api/picolo", true);    //http://192.168.0.13:9000/api/picolo
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(json));

      }
  }

  function sequencesData(dataLess, dataMore, dataT, start){
    var dataDroite = document.getElementById("sequenceDataDroite");
    var dataGauche = document.getElementById("sequenceDataGauche");
    var dataTimer = document.getElementById("timerValue");
    var state = document.getElementById('state');

    dataDroite.innerHTML = dataMore;
    dataGauche.innerHTML = dataLess;
    dataTimer.innerHTML = dataT;

    if(start == "true"){
      state.innerHTML = "up"
    }else{
      state.innerHTML = "down"
    }
  }
  sequencesData(json.actionsLess, json.actionsMore, json.timer, json.start);
}
