var Readable = require("stream").Readable;  
var util = require("util");  
util.inherits(MyStream, Readable);  
function MyStream(opt) {  
  Readable.call(this, opt);
}
MyStream.prototype._read = function() {};  
// hook in our stream
process.__defineGetter__("stdin", function() {  
  if (process.__stdin) return process.__stdin;
  process.__stdin = new MyStream();
  return process.__stdin;
});


var button = document.getElementById('start-button')
var input = document.getElementById('freq-input')
var pulseFreq = 1000

var state = false

var xCoords = new Array(300).fill(0)
var yCoords = new Array(300).fill(0)
var yThresh = new Array(300).fill(0)
var freq = 20
var windowSize = 5

var options = {
   "zoom": false,
}


var el = document.body.appendChild(document.createElement('div'))
var line = require('lightning-line')
var viz = new line(el, {
   "series": [yThresh, yCoords],
   "index": xCoords,
   "xaxis": "time (s)",
   "yaxis": "voltage (V)",
   "thickness": [7 ,7],
    "color": [[200, 0, 0], [255, 100, 0]]
}, [], options)

var yDomain = [0, 5]
var xDomain = [-windowSize, 0]

var ySpread = Math.abs(yDomain[1] - yDomain[0]) || 1;
var xSpread = Math.abs(xDomain[1] - xDomain[0]) || 1;

viz.x.domain([xDomain[0] - 0.05 * xSpread, xDomain[1] + 0.05 * xSpread])
viz.y.domain([yDomain[0] - 0.05 * ySpread, yDomain[1] + 0.05 * ySpread])

viz.updateAxis()
viz.updateData({
   "series": [yThresh, yCoords],
   "index": xCoords,
   "thickness": [7, 7],
    "color": [[200, 0, 0], [255, 100, 0]]
})


var five = require("johnny-five"),
board = new five.Board();

var i = 0;

board.on("ready", function() {
  document.getElementById('board-status').src = "icons/ready.png"
  button.className = "button"
  input.className = "input"
  input.readOnly = false

  var sensor = new five.Sensor({
    pin: "A1", 
    freq: freq, 
	});

  var led = new five.Led(11)

  button.addEventListener('click', function () {
    state = !state
    if (state) {
      button.innerHTML = 'Stop'
      led.strobe(pulseFreq)
    }
    else {
      button.innerHTML = 'Start'
      led.stop().off()
    }
  })
  
  input.addEventListener("change", function () {
    var str = input.value
    if (!isNaN(Number(str))) {
      pulseFreq = Number(str)
    }
    else if (str.substring(str.length-3,str.length) === ' ms'){
      if (!isNaN(Number(str.substring(0,str.length-3)))) {
        pulseFreq = Number(str.substring(0,str.length-3))
      }
    }
    if (pulseFreq < 1) pulseFreq = 1
    if (pulseFreq > 9999) pulseFreq = 9999
    pulseFreq = Math.round(pulseFreq)
    input.value = String(pulseFreq) + ' ms'
    led.strobe(pulseFreq)
  })

  sensor.scale(0, 5).on("data", function (){
    if (state) {
      yThresh.push(led.value/255*5)
      yCoords.push(sensor.value) 
      xCoords.push(i*freq/1000)
      yCoords.shift()
      xCoords.shift()
      yThresh.shift()

      xDomain = [-windowSize+i*freq/1000, i*freq/1000]
      xSpread = Math.abs(xDomain[1] - xDomain[0]) || 1;
      viz.x.domain([xDomain[0] - 0.05 * xSpread, xDomain[1] + 0.05 * xSpread])

      viz.updateAxis()
      viz.updateData({
        "series": [yThresh, yCoords],
        "index": xCoords,
        "thickness": [7, 7],
        "color": [[200, 0, 0], [255, 100, 0]]
      })
    i++
  }
  }) 
})