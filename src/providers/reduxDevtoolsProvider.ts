import * as vscode from 'vscode';

type socketOptions = {
  hostname: string
  port: number
}

export class ReduxDevtoolsProvider implements vscode.TextDocumentContentProvider {
  private socketOptions = {
    hostname: '127.0.0.1',
    port: 1024,
  };

  public constructor(options: socketOptions) {
    this.socketOptions = options;
  }

  public provideTextDocumentContent(uri: vscode.Uri): vscode.ProviderResult<string> {
    return `<!DOCTYPE html>
      <html>
          <head>
              <base>
              <title>Remote Devtools</title>
              <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
              <style>
                  html, body, #root {
                      width: 100%;
                      height: 100%;
                  }
              </style>
              </base>
          </head>
          <body>
              <div id="root"></div>
          </body>
          <script src="https://unpkg.com/react@15/dist/react.min.js" charset="UTF-8"></script>
          <script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js" charset="UTF-8"></script>
          <script src="https://unpkg.com/remotedev-app@0.11.0-2/dist/remotedev-app.min.js" charset="UTF-8"></script>
          <script>
              let root = document.getElementById('root');
              ReactDOM.render(
                  React.createElement(
                      RemoteDevApp,
                      {
                      socketOptions: {
                          hostname: '${this.socketOptions.hostname}',
                          port: '${this.socketOptions.port}',
                          autoReconnect: true
                      }
                      },
                      'Remote Devtools'
                  ),
                  root
              );
          </script>
      </html>`
  }
}