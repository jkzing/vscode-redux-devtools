'use strict'
import * as vscode from 'vscode'
import { createReduxDevtoolsPanel } from './webview/reduxDevtools'

export function activate(context: vscode.ExtensionContext) {
  let devtoolsPanel: vscode.WebviewPanel = null

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.openReduxDevtools', () => {
      if (!devtoolsPanel) {
        devtoolsPanel = createReduxDevtoolsPanel(context)

        devtoolsPanel.onDidDispose(
          () => { devtoolsPanel = null },
          null,
          context.subscriptions
        )
      } else {
        devtoolsPanel.reveal()
      }
    })
  )
}

export function deactivate() {}
