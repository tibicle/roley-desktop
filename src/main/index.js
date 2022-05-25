import { app, BrowserWindow, ipcMain, ipcRenderer } from 'electron'
import '../renderer/store'

// const uaup = require('uaup-js');

// const defaultStages = {
//   Checking: "Checking For Updates!", // When Checking For Updates.
//   Found: "Update Found!",  // If an Update is Found.
//   NotFound: "No Update Found.", // If an Update is Not Found.
//   Downloading: "Downloading...", // When Downloading Update.
//   Unzipping: "Installing...", // When Unzipping the Archive into the Application Directory.
//   Cleaning: "Finalizing...", // When Removing Temp Directories and Files (ex: update archive and tmp directory).
//   Launch: "Launching..." // When Launching the Application.
// };

// const updateOptions = {
//   useGitub: true, // {Default is true} [Optional] Only Github is Currenlty Supported.
//   gitRepo: "roley-desktop", // [Required] Your Repo Name
//   gitUsername: "ShivangNanda",  // [Required] Your GitHub Username.
//   isGitRepoPrivate: false,  // {Default is false} [Optional] If the Repo is Private or Public  (Currently not Supported).
//   gitRepoToken: "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",  // {Default is null} [Optional] The Token from GitHub to Access a Private Repo.  Only for Private Repos.

//   appName: "Roley", //[Required] The Name of the app archive and the app folder.
//   appExecutableName: "Roley.exe", //[Required] The Executable of the Application to be Run after updating.

//   progressBar: null, // {Default is null} [Optional] If Using Electron with a HTML Progressbar, use that element here, otherwise ignore
//   label: null, // {Default is null} [Optional] If Using Electron, this will be the area where we put status updates using InnerHTML
//   forceUpdate: false, // {Default is false} [Optional] If the Application should be forced updated.  This will change to true if any errors ocurr while launching.
//   stageTitles: defaultStages, // {Default is defaultStages} [Optional] Sets the Status Title for Each Stage
// };
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
  let config = {
    height: 563,
    useContentSize: true,
    width: 1000,
    titleBarStyle: 'hidden',
    webPreferences: { 
      nodeIntegration: true, 
      contextIsolation: false,
      enableRemoteModule: true
    }
  
  }
  //mainWindow = new BrowserWindow();
  if(process.platform == 'darwin') {
    config['titleBarStyle'] = 'hidden';
  } else {
    config['frame'] = false;
  }
  mainWindow = new BrowserWindow(config);

  mainWindow.loadURL(winURL)
  
  if (process.platform == 'win32') {
    // Keep only command line / deep linked arguments
    deeplinkingUrl = process.argv.slice(1)
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  });
}

app.on('ready', async ()=>{

  await createWindow();

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