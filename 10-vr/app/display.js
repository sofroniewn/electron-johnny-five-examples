var scene = require('gl-scene')(gl, {
  background: [0.02, 0.02, 0.02]
})
 
var icosphere = require('icosphere')
var bunny = require('bunny')
var shapes = [{
  id: 'sphere',
  complex: icosphere(1),
  position: [50, 0, 200],
  material: 'lambert',
  scale: 12
}]

var lights = [{
  position: [-50, 0, 180], 
  style: {intensity: 5.0, color: [1.0, 0, 0.3]}
}, {
  position: [50, 0, 180], 
  style: {intensity: 5.0, color: [1.0, 0, 0.3]}
}]

scene.shapes(shapes)
scene.lights(lights)

module.exports = scene