'use strict'
import * as vscode from 'vscode'
import * as path from 'path'
import { getDevtoolContent } from './webview/reduxDevtools'
// import ReduxDevToolsSettings from './common/configSettings'

export function activate(context: vscode.ExtensionContext) {
  // const settings = new ReduxDevToolsSettings()

  // const socketOptions = {
  //   hostname: settings.get('hostname'),
  //   port: settings.get('socketPort'),
  // }

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.openReduxDevtools', () => {
      const panel = vscode.window.createWebviewPanel(
        'vscode-redux-devtools',
        'Remote Devtools',
        vscode.ViewColumn.Two,
        { enableScripts: true }
      )

      const reduxDevtoolsCorePath = vscode.Uri.file(
        path.join(context.extensionPath, 'externals', 'redux-devtools-core.js')
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

      panel.webview.html = getDevtoolContent(externalSrc)
    })
  )
}

export function deactivate() {}
