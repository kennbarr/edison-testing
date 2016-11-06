var m = require('mraa');
var x = new m.I2c(0);
x.address(0x43);

var event = new (require('events').EventEmitter)();
var touchSensor = new (require('jsupm_ttp223').TTP223)(2); //2: is the port number on the base shield
var redLed = new (require('jsupm_grove').GroveLed)(8);
var blueLed = new (require('jsupm_grove').GroveLed)(7);
var temp = new (require('jsupm_grove').GroveTemp)(0);

setInterval(function() {
  if(touchSensor.isPressed()) {
    event.emit("touch sensor touched");
  }
  else {
    event.emit("touch sensor not touched");
  }
}, 10);

event.on("touch sensor touched", function() {
  redLed.write(-1);
  blueLed.write(1);
  console.log(temp.value());
});

event.on("touch sensor not touched", function() {
  redLed.write(1);
  blueLed.write(-1);
});
