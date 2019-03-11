import * as vscode from 'vscode'

export default class ReduxDevtoolsSettings {
  private config = {}

  public constructor() {
    this.config = vscode.workspace.getConfiguration('reduxdev')
  }

  public get(key) {
    return this.config[key]
  }
}
