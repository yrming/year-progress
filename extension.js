const vscode = require('vscode');
const moment = require('moment');

function activate(context) {
    let statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
    statusBar.text = '$(calendar) Y%';
    statusBar.command = 'extension.yearProgress';
    statusBar.tooltip = 'Click to get year progress';
    statusBar.show();
    let disposable = vscode.commands.registerCommand('extension.yearProgress', function () {
        let start = moment().startOf('year');
        let end = moment().endOf('year');
        let now = moment();
        let duration = moment.duration(now.diff(start)).asMilliseconds();
        let total = moment.duration(end.diff(start)).asMilliseconds();
        let percent = Math.floor(duration * 100 / total);
        let left = '░';
        let finish = '▓';
        let totalCount = 20;
        let finishCount = Math.floor(totalCount * percent / 100);
        let leftCount = totalCount - finishCount;
        let progressBar = '';
        for (let i = 0; i < finishCount; i++) {
            progressBar += finish;
        }
        for (let j = 0; j < leftCount; j++) {
            progressBar += left;
        }
        vscode.window.showInformationMessage(`Year Progress: ${progressBar} ${percent} %`);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;