var Readable = require('stream').Readable  
var util = require('util')  
var five = require('johnny-five')

util.inherits(MyStream, Readable)  
function MyStream(opt) {  
  Readable.call(this, opt)
}
MyStream.prototype._read = function() {};  
// hook in our stream
process.__defineGetter__('stdin', function() {  
  if (process.__stdin) return process.__stdin
  process.__stdin = new MyStream()
  return process.__stdin
})

var board = new five.Board()
var button = document.getElementById('led-button')
var state = false

board.on('ready', function() {
  document.getElementById('board-status').src = 'icons/ready.png'
  button.className = 'button'
  var led = new five.Led(12)
  
  button.addEventListener('click', function () {
    state = !state
    if (state) {
      document.getElementById('led-status').src = 'icons/led-on.png'
      led.on()
    }
    else {
      document.getElementById('led-status').src = 'icons/led-off.png'
      led.off()
    }
  })
})