import { app, BrowserWindow, ipcMain, ipcRenderer } from 'electron'
import '../renderer/store'
//import Tree from 'vuejs-tree' 
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

  let deeplinkingUrl;

  

  // Force Single Instance Application
  // const gotTheLock = app.requestSingleInstanceLock()
  // if (gotTheLock) {
  //   app.on('second-instance', (e, argv) => {
  //     // Someone tried to run a second instance, we should focus our window.
  
  //     // Protocol handler for win32
  //     // argv: An array of the second instance’s (command line / deep linked) arguments
  //     if (process.platform == 'win32') {
  //       // Keep only command line / deep linked arguments
  //       deeplinkingUrl = argv.slice(1)
  //     }
  //     console.log('app.makeSingleInstance# ' + deeplinkingUrl);
  
  //     if (mainWindow) {
  //       if (mainWindow.isMinimized()) mainWindow.restore()
  //       mainWindow.focus()
  //     }
  //   })
  // } else {
  //   app.quit();
  // }

async function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    titleBarStyle: 'hidden',
    webPreferences: { 
      nodeIntegration: true, 
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  mainWindow.loadURL(winURL)
  
  if (process.platform == 'win32') {
    // Keep only command line / deep linked arguments
    deeplinkingUrl = process.argv.slice(1)
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  });
  console.log('getTitle')
  // console.log(ipcMain);
  // console.log(ipcRenderer);
  // //ipcMain.emit('deep-link-url',"home");
  //mainWindow.send('ping');
  mainWindow.webContents.send('deep-link-url',"home");
}

app.on('ready', async ()=>{

  await createWindow();
  mainWindow.webContents.send('ping', 'whoooooooh!');
  ipcMain.send('deep-link-url',"home");

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
if (!app.isDefaultProtocolClient('roley')) {
  // Define custom protocol handler. Deep linking works on packaged versions of the application!
  app.setAsDefaultProtocolClient('roley');
}

app.on('will-finish-launching', () => {
  // Protocol handler for osx
  //ipcRenderer.send('ping','test');
  app.on('open-url', (event, url) => {
    event.preventDefault();
    deeplinkingUrl = url
    console.log('open-url# ' + deeplinkingUrl)
    mainWindow.webContents.send('deep-link-url',"home");
  });
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */