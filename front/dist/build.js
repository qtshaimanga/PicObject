(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "values": [
    {
      "start": "false",
      "timer": "4",
      "actionsMore": "+   +   +",
      "actionsLess": "-"
    }
  ]
}
},{}],2:[function(require,module,exports){
'use strict';

var fs = require('fs');
var jsonArray = require('../back/jsonFiles/interval.json');
var json = jsonArray.values[0];

window.onload = function () {

  var button = document.getElementsByClassName('but');
  var arrayDroite = [];
  var arrayGauche = [];

  for (var a = 0; a < button.length; a++) {
    var but = button[a];
    but.onclick = function (but) {
      click(but);
    };
  }

  function click(but) {
    var button = but.toElement;
    var id = button.id;
    var value = button.value;
    changeFile(id, value);
  }

  function changeFile(buttonClick, newValue) {
    var obj = {};

    if (buttonClick == "restart") {
      console.log("Restart syteme");
    }

    if (buttonClick == "timer") {
      var time = document.getElementById('time');
      newValue = time.value;
    }

    if (newValue != "") {

      if (newValue != "-" & newValue != "+") {
        obj[buttonClick] = newValue;
      }

      if (newValue == "+") {
        if (buttonClick == "moreDroite") {
          arrayDroite.push(newValue);
        }
        if (buttonClick == "lessDroite") {
          arrayDroite.splice(newValue, 1);
        }
        var objDroite = arrayDroite.join("   ");
        obj["actionMore"] = objDroite;
      }

      if (newValue == "-") {
        if (buttonClick == "moreGauche") {
          arrayGauche.push(newValue);
        }
        if (buttonClick == "lessGauche") {
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

      if (start != undefined) {
        json.start = start;
      }
      if (timer != undefined) {
        json.timer = timer;
      }
      if (actionMore != undefined) {
        json.actionsMore = actionMore;
      }
      if (actionLess != undefined) {
        json.actionsLess = actionLess;
      }

      //console.log(obj);
      //console.log(json);

      sequencesData(json.actionsLess, json.actionsMore, json.timer, json.start);

      // POST DATA IN REST API
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log(xhttp.responseText);
        }
      };
      xhttp.open("POST", "http://192.168.0.13:9000/api/picolo", true);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(JSON.stringify(json));
    }
  }

  function sequencesData(dataLess, dataMore, dataT, start) {
    var dataDroite = document.getElementById("sequenceDataDroite");
    var dataGauche = document.getElementById("sequenceDataGauche");
    var dataTimer = document.getElementById("timerValue");
    var state = document.getElementById('state');

    dataDroite.innerHTML = dataMore;
    dataGauche.innerHTML = dataLess;
    dataTimer.innerHTML = dataT;

    if (start == "true") {
      state.innerHTML = "up";
    } else {
      state.innerHTML = "down";
    }
  }
  sequencesData(json.actionsLess, json.actionsMore, json.timer, json.start);
};

},{"../back/jsonFiles/interval.json":1,"fs":3}],3:[function(require,module,exports){

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJiYWNrL2pzb25GaWxlcy9pbnRlcnZhbC5qc29uIiwiZnJvbnQvYXBwLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDVEEsSUFBSSxLQUFLLFFBQVEsSUFBUixDQUFMO0FBQ0osSUFBSSxZQUFZLFFBQVEsaUNBQVIsQ0FBWjtBQUNKLElBQUksT0FBTyxVQUFVLE1BQVYsQ0FBaUIsQ0FBakIsQ0FBUDs7QUFFSixPQUFPLE1BQVAsR0FBZ0IsWUFBVTs7QUFFeEIsTUFBSSxTQUFTLFNBQVMsc0JBQVQsQ0FBZ0MsS0FBaEMsQ0FBVCxDQUZvQjtBQUd4QixNQUFJLGNBQWMsRUFBZCxDQUhvQjtBQUl4QixNQUFJLGNBQWMsRUFBZCxDQUpvQjs7QUFNeEIsT0FBSSxJQUFJLElBQUUsQ0FBRixFQUFLLElBQUUsT0FBTyxNQUFQLEVBQWUsR0FBOUIsRUFBa0M7QUFDaEMsUUFBSSxNQUFNLE9BQU8sQ0FBUCxDQUFOLENBRDRCO0FBRWhDLFFBQUksT0FBSixHQUFjLFVBQVMsR0FBVCxFQUFhO0FBQ3ZCLFlBQU0sR0FBTixFQUR1QjtLQUFiLENBRmtCO0dBQWxDOztBQU9BLFdBQVMsS0FBVCxDQUFlLEdBQWYsRUFBb0I7QUFDbEIsUUFBSSxTQUFTLElBQUksU0FBSixDQURLO0FBRWxCLFFBQUksS0FBSyxPQUFPLEVBQVAsQ0FGUztBQUdsQixRQUFJLFFBQVEsT0FBTyxLQUFQLENBSE07QUFJbEIsZUFBVyxFQUFYLEVBQWUsS0FBZixFQUprQjtHQUFwQjs7QUFPQSxXQUFTLFVBQVQsQ0FBb0IsV0FBcEIsRUFBaUMsUUFBakMsRUFBMEM7QUFDdEMsUUFBSSxNQUFNLEVBQU4sQ0FEa0M7O0FBR3RDLFFBQUcsZUFBZSxTQUFm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LFlBQVksU0FBUyxjQUFULENBQXdCLFlBQXhCLENBQVosQ0FIa0Q7QUFJdEQsUUFBSSxRQUFRLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFSLENBSmtEOztBQU10RCxlQUFXLFNBQVgsR0FBdUIsUUFBdkIsQ0FOc0Q7QUFPdEQsZUFBVyxTQUFYLEdBQXVCLFFBQXZCLENBUHNEO0FBUXRELGNBQVUsU0FBVixHQUFzQixLQUF0QixDQVJzRDs7QUFVdEQsUUFBRyxTQUFTLE1BQVQsRUFBZ0I7QUFDakIsWUFBTSxTQUFOLEdBQWtCLElBQWxCLENBRGlCO0tBQW5CLE1BRUs7QUFDSCxZQUFNLFNBQU4sR0FBa0IsTUFBbEIsQ0FERztLQUZMO0dBVkY7QUFnQkEsZ0JBQWMsS0FBSyxXQUFMLEVBQWtCLEtBQUssV0FBTCxFQUFrQixLQUFLLEtBQUwsRUFBWSxLQUFLLEtBQUwsQ0FBOUQsQ0ExR3dCO0NBQVY7OztBQ0poQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidmFsdWVzXCI6IFtcbiAgICB7XG4gICAgICBcInN0YXJ0XCI6IFwiZmFsc2VcIixcbiAgICAgIFwidGltZXJcIjogXCI0XCIsXG4gICAgICBcImFjdGlvbnNNb3JlXCI6IFwiKyAgICsgICArXCIsXG4gICAgICBcImFjdGlvbnNMZXNzXCI6IFwiLVwiXG4gICAgfVxuICBdXG59IiwidmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbnZhciBqc29uQXJyYXkgPSByZXF1aXJlKCcuLi9iYWNrL2pzb25GaWxlcy9pbnRlcnZhbC5qc29uJyk7XG52YXIganNvbiA9IGpzb25BcnJheS52YWx1ZXNbMF07XG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpe1xuXG4gIHZhciBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdidXQnKTtcbiAgdmFyIGFycmF5RHJvaXRlID0gW107XG4gIHZhciBhcnJheUdhdWNoZSA9IFtdO1xuXG4gIGZvcih2YXIgYT0wOyBhPGJ1dHRvbi5sZW5ndGg7IGErKyl7XG4gICAgdmFyIGJ1dCA9IGJ1dHRvblthXTtcbiAgICBidXQub25jbGljayA9IGZ1bmN0aW9uKGJ1dCl7XG4gICAgICAgIGNsaWNrKGJ1dCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xpY2soYnV0KSB7XG4gICAgdmFyIGJ1dHRvbiA9IGJ1dC50b0VsZW1lbnQ7XG4gICAgdmFyIGlkID0gYnV0dG9uLmlkO1xuICAgIHZhciB2YWx1ZSA9IGJ1dHRvbi52YWx1ZVxuICAgIGNoYW5nZUZpbGUoaWQsIHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoYW5nZUZpbGUoYnV0dG9uQ2xpY2ssIG5ld1ZhbHVlKXtcbiAgICAgIHZhciBvYmogPSB7fTtcblxuICAgICAgaWYoYnV0dG9uQ2xpY2sgPT0gXCJyZXN0YXJ0XCIpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3RhcnQgc3l0ZW1lXCIpO1xuICAgICAgfVxuXG4gICAgICBpZihidXR0b25DbGljaz09XCJ0aW1lclwiKXtcbiAgICAgICAgdmFyIHRpbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZScpO1xuICAgICAgICBuZXdWYWx1ZSA9IHRpbWUudmFsdWVcbiAgICAgIH1cblxuICAgICAgaWYobmV3VmFsdWUhPVwiXCIpe1xuXG4gICAgICAgIGlmKG5ld1ZhbHVlIT1cIi1cIiAmIG5ld1ZhbHVlIT1cIitcIil7XG4gICAgICAgICAgICBvYmpbYnV0dG9uQ2xpY2tdID0gbmV3VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZihuZXdWYWx1ZSA9PSBcIitcIil7XG4gICAgICAgICAgaWYoYnV0dG9uQ2xpY2sgPT0gXCJtb3JlRHJvaXRlXCIpe1xuICAgICAgICAgICAgYXJyYXlEcm9pdGUucHVzaChuZXdWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGJ1dHRvbkNsaWNrID09IFwibGVzc0Ryb2l0ZVwiKXtcbiAgICAgICAgICAgIGFycmF5RHJvaXRlLnNwbGljZShuZXdWYWx1ZSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBvYmpEcm9pdGUgPSAgIGFycmF5RHJvaXRlLmpvaW4oXCIgICBcIik7XG4gICAgICAgICAgb2JqW1wiYWN0aW9uTW9yZVwiXSA9IG9iakRyb2l0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG5ld1ZhbHVlID09IFwiLVwiKXtcbiAgICAgICAgICBpZihidXR0b25DbGljayA9PSBcIm1vcmVHYXVjaGVcIil7XG4gICAgICAgICAgICBhcnJheUdhdWNoZS5wdXNoKG5ld1ZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoYnV0dG9uQ2xpY2sgPT0gXCJsZXNzR2F1Y2hlXCIpe1xuICAgICAgICAgICAgYXJyYXlHYXVjaGUuc3BsaWNlKG5ld1ZhbHVlLCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIG9iakdhdWNoZSA9IGFycmF5R2F1Y2hlLmpvaW4oXCIgICBcIik7XG4gICAgICAgICAgb2JqW1wiYWN0aW9uTGVzc1wiXSA9IG9iakdhdWNoZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vU2V0IHZhbHVlIG9yIHRha2Ugb3JpZ2luIHZhbHVlXG4gICAgICAgIHZhciBzdGFydCA9IG9iai5zdGFydDtcbiAgICAgICAgdmFyIHRpbWVyID0gb2JqLnRpbWVyO1xuICAgICAgICB2YXIgYWN0aW9uTW9yZSA9IG9iai5hY3Rpb25Nb3JlO1xuICAgICAgICB2YXIgYWN0aW9uTGVzcyA9IG9iai5hY3Rpb25MZXNzO1xuXG4gICAgICAgIGlmKHN0YXJ0ICE9IHVuZGVmaW5lZCl7IGpzb24uc3RhcnQgPSBzdGFydCB9XG4gICAgICAgIGlmKHRpbWVyICE9IHVuZGVmaW5lZCl7IGpzb24udGltZXIgPSB0aW1lciB9XG4gICAgICAgIGlmKGFjdGlvbk1vcmUgIT0gdW5kZWZpbmVkICl7IGpzb24uYWN0aW9uc01vcmUgPSBhY3Rpb25Nb3JlIH1cbiAgICAgICAgaWYoYWN0aW9uTGVzcyAhPSB1bmRlZmluZWQpeyBqc29uLmFjdGlvbnNMZXNzID0gYWN0aW9uTGVzcyB9XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhvYmopO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGpzb24pO1xuXG4gICAgICAgIHNlcXVlbmNlc0RhdGEoanNvbi5hY3Rpb25zTGVzcywganNvbi5hY3Rpb25zTW9yZSwganNvbi50aW1lciwganNvbi5zdGFydCk7XG5cbiAgICAgICAgLy8gUE9TVCBEQVRBIElOIFJFU1QgQVBJXG4gICAgICAgIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoeGh0dHAucmVhZHlTdGF0ZSA9PSA0ICYmIHhodHRwLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHhodHRwLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB4aHR0cC5vcGVuKFwiUE9TVFwiLCBcImh0dHA6Ly8xOTIuMTY4LjAuMTM6OTAwMC9hcGkvcGljb2xvXCIsIHRydWUpO1xuICAgICAgICB4aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04XCIpO1xuICAgICAgICB4aHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KGpzb24pKTtcblxuICAgICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2VxdWVuY2VzRGF0YShkYXRhTGVzcywgZGF0YU1vcmUsIGRhdGFULCBzdGFydCl7XG4gICAgdmFyIGRhdGFEcm9pdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlcXVlbmNlRGF0YURyb2l0ZVwiKTtcbiAgICB2YXIgZGF0YUdhdWNoZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VxdWVuY2VEYXRhR2F1Y2hlXCIpO1xuICAgIHZhciBkYXRhVGltZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyVmFsdWVcIik7XG4gICAgdmFyIHN0YXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXRlJyk7XG5cbiAgICBkYXRhRHJvaXRlLmlubmVySFRNTCA9IGRhdGFNb3JlO1xuICAgIGRhdGFHYXVjaGUuaW5uZXJIVE1MID0gZGF0YUxlc3M7XG4gICAgZGF0YVRpbWVyLmlubmVySFRNTCA9IGRhdGFUO1xuXG4gICAgaWYoc3RhcnQgPT0gXCJ0cnVlXCIpe1xuICAgICAgc3RhdGUuaW5uZXJIVE1MID0gXCJ1cFwiXG4gICAgfWVsc2V7XG4gICAgICBzdGF0ZS5pbm5lckhUTUwgPSBcImRvd25cIlxuICAgIH1cbiAgfVxuICBzZXF1ZW5jZXNEYXRhKGpzb24uYWN0aW9uc0xlc3MsIGpzb24uYWN0aW9uc01vcmUsIGpzb24udGltZXIsIGpzb24uc3RhcnQpO1xufVxuIiwiIl19
