import * as vscode from 'vscode'

export interface Externals {
  react: vscode.Uri
  reactDom: vscode.Uri
  reduxDevtoolsCore: vscode.Uri
}

export function getDevtoolContent(externals: Externals) {
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
            hostname: 'localhost',
            port: '8000',
            autoReconnect: true,
          },
        },
        'Remote Devtools'
      ),
      root
    )
  </script>
</html>`
}
