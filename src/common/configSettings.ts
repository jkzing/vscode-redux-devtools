import * as vscode from 'vscode';

export default class ReduxDevtoolsSettings {
    public constructor() {

    }

    public readConfigurations(): void {
        let config = vscode.workspace.getConfiguration('reduxdev');
        console.log(config);
    }
}