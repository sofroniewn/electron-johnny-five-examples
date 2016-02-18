var app = require('app')
var BrowserWindow = require('browser-window')

var mainWindow = null

app.on('ready', function () {
	console.log('main')
	mainWindow = new BrowserWindow({
		height: 600,
		width: 800
	})

	mainWindow.loadURL('file://' + __dirname + '/app/index.html')

	mainWindow.on('closed', function () {
		mainWindow = null
	})
})