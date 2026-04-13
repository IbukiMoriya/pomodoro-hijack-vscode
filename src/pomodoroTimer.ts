import * as vscode from 'vscode';
import type { Phase, PomodoroSettings } from './types';
import { loadSettings } from './settings';
import { getMessages, type Messages } from './i18n';
import { HijackPanel } from './hijackPanel';
import { formatTime, minutesToSeconds, getBreakInfo } from './utils';
import { PHASE_ICONS, STATUS_BAR_PRIORITY, TIMER_INTERVAL_MS } from './constants';

export class PomodoroTimer {
  private settings: PomodoroSettings;
  private messages: Messages;
  private phase: Phase = 'idle';
  private cycleCount = 0;
  private timer: ReturnType<typeof setInterval> | undefined;
  private remainingSeconds = 0;
  private statusBarItem: vscode.StatusBarItem;

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly output: vscode.OutputChannel
  ) {
    this.settings = loadSettings();
    this.messages = getMessages(this.settings.language);
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      STATUS_BAR_PRIORITY
    );
    this.statusBarItem.command = 'pomodoroHijack.status';
    context.subscriptions.push(this.statusBarItem);
  }

  start(): void {
    if (this.phase !== 'idle') {
      vscode.window.showInformationMessage(this.messages.alreadyRunning);
      return;
    }
    this.log('Started');
    this.cycleCount = 0;
    this.startWorkPhase();
  }

  stop(): void {
    this.clearTimer();
    this.phase = 'idle';
    HijackPanel.dismiss();
    this.statusBarItem.hide();
    this.log('Stopped');
    vscode.window.showInformationMessage(this.messages.stopped);
  }

  showStatus(): void {
    if (this.phase === 'idle') {
      vscode.window.showInformationMessage(this.messages.notRunning);
      return;
    }

    const label = this.messages.phaseLabels[this.phase];
    const time = formatTime(this.remainingSeconds);
    vscode.window.showInformationMessage(
      `${label} - ${time} remaining (Cycle ${this.cycleCount}/${this.settings.cyclesBeforeLongBreak})`
    );
  }

  reloadSettings(): void {
    this.settings = loadSettings();
    this.messages = getMessages(this.settings.language);
    this.log('Settings reloaded');
  }

  private startWorkPhase(): void {
    this.phase = 'work';
    this.remainingSeconds = minutesToSeconds(this.settings.workMinutes);
    this.log(`Work phase started (${this.settings.workMinutes} min)`);
    this.startCountdown(() => this.onWorkComplete());
  }

  private startBreakPhase(): void {
    const breakInfo = getBreakInfo(
      this.cycleCount,
      this.settings.breakMinutes,
      this.settings.longBreakMinutes,
      this.settings.cyclesBeforeLongBreak
    );

    this.phase = breakInfo.phase;
    this.remainingSeconds = minutesToSeconds(breakInfo.minutes);

    this.log(`${breakInfo.phase === 'longBreak' ? 'Long break' : 'Break'} started (${breakInfo.minutes} min)`);

    HijackPanel.show(this.context, {
      phase: this.phase,
      breakMinutes: breakInfo.minutes,
      cycleCount: this.cycleCount,
      enforceFullBreak: this.settings.enforceFullBreak,
      language: this.settings.language,
      onDismiss: () => {
        if (this.phase === 'break' || this.phase === 'longBreak') {
          this.clearTimer();
          this.startWorkPhase();
        }
      },
    });

    this.startCountdown(() => this.onBreakComplete());
  }

  private onWorkComplete(): void {
    this.cycleCount++;
    this.log(`Work complete! Cycle ${this.cycleCount}`);
    this.startBreakPhase();
  }

  private onBreakComplete(): void {
    this.log('Break complete! Back to work!');
    vscode.window.showInformationMessage(this.messages.breakOver);
    HijackPanel.dismiss();
  }

  private startCountdown(onComplete: () => void): void {
    this.clearTimer();
    this.updateStatusBar();
    this.statusBarItem.show();

    this.timer = setInterval(() => {
      this.remainingSeconds--;
      this.updateStatusBar();

      if (this.remainingSeconds <= 0) {
        this.clearTimer();
        onComplete();
      }
    }, TIMER_INTERVAL_MS);
  }

  private clearTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private updateStatusBar(): void {
    if (this.phase === 'idle') {
      return;
    }

    const time = formatTime(this.remainingSeconds);
    const icon = PHASE_ICONS[this.phase];
    const tooltip = this.messages.phaseTooltips[this.phase];

    this.statusBarItem.text = `${icon} ${time}`;
    this.statusBarItem.tooltip = `Pomodoro: ${tooltip}${this.phase === 'work' ? ` (Cycle ${this.cycleCount + 1})` : ''}`;
    this.statusBarItem.backgroundColor =
      this.phase === 'work'
        ? undefined
        : new vscode.ThemeColor('statusBarItem.warningBackground');
  }

  private log(message: string): void {
    this.output.appendLine(`[Pomodoro] ${message}`);
  }
}
