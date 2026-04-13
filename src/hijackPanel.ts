import * as vscode from 'vscode';
import { renderBreakHtml } from './breakTemplate';
import { getMessages } from './i18n';
import type { HijackOptions } from './types';

export class HijackPanel {
  private static currentPanel: vscode.WebviewPanel | undefined;

  static show(context: vscode.ExtensionContext, options: HijackOptions): void {
    this.currentPanel?.dispose();

    const messages = getMessages(options.language);

    const panel = vscode.window.createWebviewPanel(
      'pomodoroHijack.break',
      messages.panelTitle,
      { viewColumn: vscode.ViewColumn.Active, preserveFocus: false },
      { enableScripts: true, retainContextWhenHidden: true },
    );

    this.currentPanel = panel;
    panel.webview.html = renderBreakHtml(options);

    panel.webview.onDidReceiveMessage(
      (msg) => {
        if (msg?.type === 'dismiss') {
          panel.dispose();
        }
      },
      undefined,
      context.subscriptions,
    );

    panel.onDidDispose(() => {
      if (this.currentPanel === panel) {
        this.currentPanel = undefined;
      }
      options.onDismiss();
    });
  }

  static dismiss(): void {
    this.currentPanel?.dispose();
    this.currentPanel = undefined;
  }
}
