var app = require('app')
var BrowserWindow = require('browser-window')

var mainWindow = null

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    height: 600,
    resizable: false,
    width: 800
  })

  mainWindow.loadURL('file://' + __dirname + '/app/index.html')

  mainWindow.on('closed', function () {
    mainWindow = null
  })
})