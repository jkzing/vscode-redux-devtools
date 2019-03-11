'use strict'
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { ReduxDevtoolsProvider } from './providers/reduxDevtoolsProvider'
import ReduxDevToolsSettings from './common/configSettings'

export function activate(context: vscode.ExtensionContext) {
  const settings = new ReduxDevToolsSettings()

  const socketOptions = {
    hostname: settings.get('hostname'),
    port: settings.get('socketPort'),
  }

  context.subscriptions.push(
    vscode.workspace.registerTextDocumentContentProvider(
      'redux-devtools',
      new ReduxDevtoolsProvider(socketOptions)
    )
  )

  const devtoolsUri = vscode.Uri.parse(
    'redux-devtools://authority/Redux\0Devtools'
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.openReduxDevtools', () => {
      return vscode.commands
        .executeCommand(
          'vscode.previewHtml',
          devtoolsUri,
          vscode.ViewColumn.Two
        )
        .then(
          success => {
            console.log('previewing')
          },
          reason => {
            vscode.window.showErrorMessage(reason)
          }
        )
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.startRemotedevServer', () => {
      return new Promise((resolve, reject) => {
        resolve()
      }).then(() => console.log('remotedev start successfully'))
    })
  )
}

// this method is called when your extension is deactivated
export function deactivate() {}
