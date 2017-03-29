const remotedev = require('remotedev-server');
import * as vscode from 'vscode';

vscode.window.showInformationMessage('excuting script');

remotedev({
    hostname: '127.0.0.1',
    port: 1024,
});
