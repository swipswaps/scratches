const { app, Menu, dialog } = require('electron').remote

const setLabel = e => {
  window.localStorage.theme = e.label
  window.events.emit('editor:theme', e.label)
}

const template = [
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Load File',
        accelerator: 'CmdOrCtrl+L',
        click: () => {
          window.events.emit('file:load')
        }
      },
      {
        label: 'Save File',
        accelerator: 'CmdOrCtrl+S',
        click: () => {
          window.events.emit('file:save')
        }
      },
      {
        label: 'Save As',
        accelerator: 'Shift+CmdOrCtrl+S',
        click: () => {
          window.events.emit('file:saveAs')
        }
      },
      {type: 'separator'},
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'toggledevtools'},
      {
        label: 'View Library Versions',
        click: () => {
          const opts = {
            type: 'info',
            title: 'Versions',
            message: 'Included library versions.',
            detail: Object.keys(process.versions).map(k => {
              return `${k} ${process.versions[k]}`
            }).join('\n')
          }

          dialog.showMessageBox(opts)
        }
      },
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'}
    ]
  },
  {
    label: 'Options',
    submenu: [
      {
        label: 'Document Window Show',
        type: 'checkbox',
        checked: JSON.parse(window.localStorage.sandbox || false),
        click: () => {
          window.events.emit('sandbox:toggle')
        }
      },
      {
        label: 'Document Window On Top',
        type: 'checkbox',
        checked: JSON.parse(window.localStorage.sanboxOnTop || false),
        click: () => {
          window.events.emit('sandbox:ontop')
        }
      },
      {type: 'separator'},
      {
        label: 'Vim Mode',
        type: 'checkbox',
        checked: JSON.parse(window.localStorage.vimMode || false),
        click: () => {
          window.events.emit('vimMode:toggle')
        }
      },
      {
        label: 'Enable Typescript Support',
        type: 'checkbox',
        checked: JSON.parse(window.localStorage.typescript || false),
        click: () => {
          window.events.emit('editor:typescript')
        }
      },
      {type: 'separator'},
      {
        label: 'Auto-Evaluate Source',
        type: 'checkbox',
        checked: JSON.parse(window.localStorage.autoeval || true),
        click: () => {
          window.events.emit('editor:autoeval')
        }
      },
      {
        label: 'Evaluate Source',
        accelerator: 'CommandOrControl+R',
        click: () => {
          window.events.emit('editor:eval')
        }
      },
      { type: 'separator' },
      {
        label: 'Clear',
        accelerator: 'CommandOrControl+`',
        click: () => {
          window.events.emit('editor:clear')
        }
      },
      {type: 'separator'},
      {
        label: 'Hide output panel',
        type: 'checkbox',
        checked: JSON.parse(window.localStorage.hideOutput || false),
        click: () => {
          window.events.emit('output:toggle')
        }
      },
      {
        label: 'Line Numbers',
        type: 'checkbox',
        checked: JSON.parse(window.localStorage.lineNumbers || false),
        click: () => {
          window.events.emit('editor:linenumbers')
        }
      },
      {
        label: 'Try Matching Lines',
        type: 'checkbox',
        checked: JSON.parse(window.localStorage.matchingLines || false),
        click: () => {
          window.events.emit('matchinglines')
        }
      },
      {type: 'separator'},
      {
        label: 'Set Working Directory',
        click: () => {
          window.events.emit('cwd')
        }
      }
    ]
  },
  {
    label: 'Theme',
    submenu: [
      {
        label: 'Light',
        type: 'radio',
        checked: window.localStorage.theme === 'Liight',
        click: setLabel
      },
      {
        label: 'Dark',
        type: 'radio',
        checked: window.localStorage.theme === 'Dark',
        click: setLabel
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
