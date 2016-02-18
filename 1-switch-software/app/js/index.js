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


var button = document.getElementById('led-button')
var five = require('johnny-five')
var board = new five.Board()

var src = null 
var str = null
var state = false

board.on('ready', function() {
  var led = new five.Led(12);
	document.getElementById('board-status').src = "icons/ready.png"
	button.className = "button"
	
  button.addEventListener('click', function () {
	state = !state
	if (state) {
		str = 'ON'
		src = 'icons/led-on.png'
		led.on()
	}
	else {
		str = 'OFF'
		src = 'icons/led-off.png'
		led.off()
	} 
	document.getElementById('led-status').src = src
  })
});

board.on('close', function() {
	console.log('closed')
});