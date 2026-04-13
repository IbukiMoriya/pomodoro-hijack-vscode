import * as vscode from 'vscode';
import { PomodoroTimer } from './pomodoroTimer';
import { loadSettings } from './settings';
import { CONFIG_SECTION } from './constants';

const COMMAND_PREFIX = 'pomodoroHijack';

let timer: PomodoroTimer | undefined;

export async function activate(context: vscode.ExtensionContext) {
  const output = vscode.window.createOutputChannel('Pomodoro Hijack');
  timer = new PomodoroTimer(context, output);

  context.subscriptions.push(
    output,
    vscode.commands.registerCommand(`${COMMAND_PREFIX}.start`, () => timer?.start()),
    vscode.commands.registerCommand(`${COMMAND_PREFIX}.stop`, () => timer?.stop()),
    vscode.commands.registerCommand(`${COMMAND_PREFIX}.status`, () => timer?.showStatus()),
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(CONFIG_SECTION)) {
        timer?.reloadSettings();
      }
    })
  );

  const settings = loadSettings();
  if (settings.autoStart) {
    timer.start();
  }
}

export async function deactivate() {
  timer?.stop();
}
