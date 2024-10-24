// const { app, BrowserWindow } = require('electron');
// const { default: isDev } = require('electron-is-dev');
// const path = require('path')
// const isDev = require('electron-is-dev');
import { app, BrowserWindow } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  if (isDev) {
    win.webContents.openDevTools()
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


// If you encounter Electron APIs that don't support ES modules, you can use them like this:
// import('electron').then(({ app, BrowserWindow }) => {
  // Use app and BrowserWindow
// })