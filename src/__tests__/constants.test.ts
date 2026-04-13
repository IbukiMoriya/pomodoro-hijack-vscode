import { describe, it, expect } from 'vitest';
import {
  PHASE_ICONS,
  CONFIG_SECTION,
  TIMER_INTERVAL_MS,
  STAR_COUNT,
  STATUS_BAR_PRIORITY,
} from '../constants';

describe('CONFIG_SECTION', () => {
  it('has the correct value', () => {
    expect(CONFIG_SECTION).toBe('pomodoroHijack');
  });
});

describe('PHASE_ICONS', () => {
  it('has icons for all active phases', () => {
    expect(PHASE_ICONS.work).toBeDefined();
    expect(PHASE_ICONS.break).toBeDefined();
    expect(PHASE_ICONS.longBreak).toBeDefined();
  });
});

describe('numeric constants', () => {
  it('has valid timer interval', () => {
    expect(TIMER_INTERVAL_MS).toBe(1000);
  });

  it('has positive star count', () => {
    expect(STAR_COUNT).toBeGreaterThan(0);
  });

  it('has valid status bar priority', () => {
    expect(typeof STATUS_BAR_PRIORITY).toBe('number');
  });
});
