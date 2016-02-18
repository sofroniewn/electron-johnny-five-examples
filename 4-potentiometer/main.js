var app = require('app')
var BrowserWindow = require('browser-window')

var mainWindow = null

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    height: 505,
    resizable: false,
    width: 595
  })

  mainWindow.loadURL('file://' + __dirname + '/app/index.html')

  mainWindow.on('closed', function () {
    mainWindow = null
  })
})