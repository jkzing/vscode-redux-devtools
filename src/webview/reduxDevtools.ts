import * as vscode from 'vscode'
import * as path from 'path'

export interface Externals {
  react: vscode.Uri
  reactDom: vscode.Uri
  reduxDevtoolsCore: vscode.Uri
}

export interface SocketOptions {
  hostname: string
  port: string
}

export function createReduxDevtoolsPanel(
  context: vscode.ExtensionContext
): vscode.WebviewPanel {
  const settings = vscode.workspace.getConfiguration('reduxdev')
  const socketOptions: SocketOptions = {
    hostname: settings.hostname || 'localhost',
    port: settings.port || 8000
  }

  const panel = vscode.window.createWebviewPanel(
    'vscode-redux-devtools',
    'Remote Devtools',
    vscode.ViewColumn.Two,
    { enableScripts: true }
  )

  const reduxDevtoolsCorePath = vscode.Uri.file(
    path.join(context.extensionPath, 'externals', 'redux-devtools-core.min.js')
  )
  const reactPath = vscode.Uri.file(
    path.join(context.extensionPath, 'externals', 'react.production.min.js')
  )
  const reactDomPath = vscode.Uri.file(
    path.join(context.extensionPath, 'externals', 'react-dom.production.min.js')
  )

  const pathOpts = { scheme: 'vscode-resource' }
  const externalSrc = {
    react: reactPath.with(pathOpts),
    reactDom: reactDomPath.with(pathOpts),
    reduxDevtoolsCore: reduxDevtoolsCorePath.with(pathOpts)
  }

  panel.webview.html = getDevtoolContent(externalSrc, socketOptions)

  return panel
}

export function getDevtoolContent(
  externals: Externals,
  socketOptions: SocketOptions
) {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>Remote Devtools</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="renderer" content="webkit" />
    <style>
      html,
      body,
      #root {
        width: 100%;
        height: 100%;
      }

      body {
        padding: 0!important;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script>
    // Temporary workaround:
    // localStorage cannot be accessed inside vscode WebView
    // https://github.com/Microsoft/vscode/issues/52246
    // TODO: make redux-devtools-core storage configurable
    Object.defineProperty(window, 'localStorage', {
      get() {
        return {
          length: 0,
          getItem() {},
          setItem() {},
          removeItem() {},
          clear() {},
          key() {}
        }
      }
    })
  </script>
  <script src="${externals.react}"></script>
  <script src="${externals.reactDom}"></script>
  <script src="${externals.reduxDevtoolsCore}"></script>
  <script>
    const root = document.getElementById('root')
    ReactDOM.render(
      React.createElement(
        ReduxDevTools.default,
        {
          socketOptions: {
            hostname: '${socketOptions.hostname}',
            port: '${socketOptions.port}',
            autoReconnect: true,
            type: 'custom'
          },
        },
        'Remote Devtools'
      ),
      root
    )
  </script>
</html>`
}
