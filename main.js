// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

const { ipcMain } = require('electron')

var fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1440,
	height: 900,
    webPreferences: {
		nodeIntegration: true,
    	preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//renderer.js
ipcMain.on('resize', (event, messages) => {

	let max = 0;
	let x = 0;
	let y = 0;
	
	if(messages.width < messages.height)
	{
		max = messages.width;
		x = 0;
		y = (messages.height / 2) - (messages.width / 2);
	}
	else
	{
		max = messages.height;
		x = (messages.width / 2) - (messages.height / 2);
		y = 0;
	}
	
	gm(messages.path)
	.resize(messages.width, messages.height)
	.crop(max, max, x, y)
	.write(app.getAppPath()+'/images/resized/thumbnail-'+messages.name, function (err) {
		if (!err) event.reply('resize-reply', 'File resized in your app folder /images/resized/thumbnail-'+messages.name);
	});
});