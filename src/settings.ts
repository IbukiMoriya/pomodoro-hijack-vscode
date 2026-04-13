import * as vscode from 'vscode';
import { CONFIG_SECTION } from './constants';
import type { Language, PomodoroSettings } from './types';

export type { PomodoroSettings } from './types';

const DEFAULTS: PomodoroSettings = {
  workMinutes: 25,
  breakMinutes: 5,
  longBreakMinutes: 15,
  cyclesBeforeLongBreak: 4,
  autoStart: true,
  enforceFullBreak: true,
  language: 'en',
};

export function loadSettings(): PomodoroSettings {
  const config = vscode.workspace.getConfiguration(CONFIG_SECTION);
  return {
    workMinutes: config.get<number>('workMinutes', DEFAULTS.workMinutes),
    breakMinutes: config.get<number>('breakMinutes', DEFAULTS.breakMinutes),
    longBreakMinutes: config.get<number>('longBreakMinutes', DEFAULTS.longBreakMinutes),
    cyclesBeforeLongBreak: config.get<number>(
      'cyclesBeforeLongBreak',
      DEFAULTS.cyclesBeforeLongBreak,
    ),
    autoStart: config.get<boolean>('autoStart', DEFAULTS.autoStart),
    enforceFullBreak: config.get<boolean>('enforceFullBreak', DEFAULTS.enforceFullBreak),
    language: config.get<Language>('language', DEFAULTS.language),
  };
}
