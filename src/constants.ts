import type { ActivePhase } from './types';

export const CONFIG_SECTION = 'pomodoroHijack';

export const PHASE_ICONS: Record<ActivePhase, string> = {
  work: '$(flame)',
  break: '$(coffee)',
  longBreak: '$(heart)',
};

export const TIMER_INTERVAL_MS = 1000;
export const STAR_COUNT = 60;
export const STATUS_BAR_PRIORITY = 100;
