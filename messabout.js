var event = new (require('events').EventEmitter)();
var touchSensor = new (require('jsupm_ttp223').TTP223)(2); //2 is the port number on the base shield
var redLed = new (require('jsupm_grove').GroveLed)(8);
var temp = new (require('jsupm_grove').GroveTemp)(1);

//#var express = require('express')
//#var http = require('http');
//#var app = express();
//#var server = http.createServer(app);
//#var io = require('socket.io').(http);
//#
//#app.listen(3000, function () {
//#  console.log('Example app listening on port 3000!');
//#});
//#
//#app.get('/', function (req, res) {
//#  res.send('Hello World!');
//#});
//#

setInterval(function() {
  if(touchSensor.isPressed()) {
    event.emit("touch sensor touched")
  }
}, 10);

setInterval(function() {
  if(!touchSensor.isPressed()) {
    event.emit("touch sensor not touched")
  }
}, 10);


event.on("touch sensor touched", function() {
  redLed.write(1)
  console.log('the temperature is: ', temp.value(), 'degrees');
});

event.on("touch sensor not touched", function() {redLed.write(-1)});
