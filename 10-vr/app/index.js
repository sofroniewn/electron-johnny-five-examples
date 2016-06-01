var Readable = require('stream').Readable  
var util = require('util')  
var five = require('johnny-five')


var canvas = document.getElementById('canvas')
const mat4 = require('gl-mat4')
const sphere = require('primitive-icosphere')
const regl = require('regl')(canvas)
const camera = require('lookat-camera')(canvas)
const normals = require('angle-normals')


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

var button = document.getElementById('start-button')
var state = false


var mesh = sphere(1, {subdivisions: 4})

const cube = regl({
  frag: `
    precision mediump float;
    uniform vec3 color;
    uniform vec3 light;
    varying vec3 vnormal;
    varying vec3 vposition;
    void main () {
      vec3 direction = normalize(light - vposition);
      vec3 normal = normalize(vnormal);
      float power = max(0.0, dot(direction, vnormal));
      gl_FragColor = vec4(mix(vec3(power, power, power), color, 0.7), 1.0);
    }`,
  vert: `
    precision mediump float;
    uniform mat4 proj;
    uniform mat4 model;
    uniform mat4 view;
    attribute vec3 position;
    attribute vec3 normal;
    varying vec3 vnormal;
    varying vec3 vposition;
    void main () {
      vnormal = normal;
      vposition = position;
      gl_Position = proj * view * model * vec4(position, 1.0);
      gl_PointSize = 10.0;
    }`,
  attributes: {
    position: regl.buffer(mesh.positions),
    normal: regl.buffer(mesh.normals)
  },
  elements: regl.elements(mesh.cells),
  uniforms: {
    proj: mat4.perspective([], Math.PI / 2, window.innerWidth / window.innerHeight, 0.01, 1000),
    model: regl.prop('model'),
    view: regl.prop('view'),
    color: regl.prop('color'),
    light: regl.prop('light')
  }
})

var scale = 10
var left = mat4.scale(mat4.identity([]), mat4.translate(mat4.identity([]), mat4.identity([]), [-50, 200, 0]), [scale, scale, scale])
var right = mat4.scale(mat4.identity([]), mat4.translate(mat4.identity([]), mat4.identity([]), [50, 200, 0]), [scale, scale, scale])
var latPos = 0
var forPos = 0

board.on('ready', function() {
  document.getElementById('board-status').src = 'icons/ready.png'
  button.className = 'button'

  var sensor = new five.Sensor({
    pin: 'A0', 
    freq: 10, 
  })
  
  button.addEventListener('click', function () {
    state = !state
    if (state) {
      button.innerHTML = 'Stop'
    }
    else {
      button.innerHTML = 'Start'
    }
  })

  sensor.scale(-75, 75).on('data', function (){
    latPos = sensor.value
  }) 

  regl.frame(function (props, context) {
    regl.clear({
      color: [0, 0, 0, 1]
    })
    
    if (state) {
      forPos = forPos + 1
    }

    if (forPos > 200) {
      forPos = 0
    }
    
    camera.position = [latPos, forPos, 0]
    camera.target = [latPos, forPos+200, 0]
    camera.up = [0, 0, 1]
    cube([{
      view: camera.view(),
      color: [1, 0, 0],
      light: [10, -10, 5],
      model: left
    }, {
      view: camera.view(),
      color: [0, 0, 1],
      light: [-10, -10, 5],
      model: right
    }])
  })
  
})