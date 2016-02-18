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

board.on('ready', function() {
  document.getElementById('board-status').src = 'icons/ready.png'
  var led = new five.Led(12)
  var spdt = new five.Switch(9)

  spdt.on('open', function() {
    led.off()
    document.getElementById('led-status').src = 'icons/led-off.png'
  })

  spdt.on('close', function() {
    led.on()
    document.getElementById('led-status').src = 'icons/led-on.png'
  })
})
