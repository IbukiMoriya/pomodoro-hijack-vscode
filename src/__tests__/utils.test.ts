import { describe, expect, it } from 'vitest';
import {
  escapeHtml,
  formatTime,
  generateNonce,
  getBreakInfo,
  isLongBreak,
  minutesToMs,
  minutesToSeconds,
} from '../utils';

describe('formatTime', () => {
  it('formats 0 seconds as 0:00', () => {
    expect(formatTime(0)).toBe('0:00');
  });

  it('formats seconds less than a minute', () => {
    expect(formatTime(5)).toBe('0:05');
    expect(formatTime(59)).toBe('0:59');
  });

  it('formats exact minutes', () => {
    expect(formatTime(60)).toBe('1:00');
    expect(formatTime(300)).toBe('5:00');
    expect(formatTime(1500)).toBe('25:00');
  });

  it('formats minutes and seconds', () => {
    expect(formatTime(61)).toBe('1:01');
    expect(formatTime(125)).toBe('2:05');
    expect(formatTime(1499)).toBe('24:59');
  });
});

describe('minutesToSeconds', () => {
  it('converts minutes to seconds', () => {
    expect(minutesToSeconds(1)).toBe(60);
    expect(minutesToSeconds(25)).toBe(1500);
    expect(minutesToSeconds(0)).toBe(0);
  });
});

describe('minutesToMs', () => {
  it('converts minutes to milliseconds', () => {
    expect(minutesToMs(1)).toBe(60000);
    expect(minutesToMs(5)).toBe(300000);
    expect(minutesToMs(0)).toBe(0);
  });
});

describe('escapeHtml', () => {
  it('escapes ampersands', () => {
    expect(escapeHtml('a&b')).toBe('a&amp;b');
  });

  it('escapes angle brackets', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
  });

  it('escapes quotes', () => {
    expect(escapeHtml('"hello"')).toBe('&quot;hello&quot;');
    expect(escapeHtml("'hello'")).toBe('&#039;hello&#039;');
  });

  it('handles strings with no special characters', () => {
    expect(escapeHtml('hello world')).toBe('hello world');
  });

  it('handles empty string', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('escapes multiple special characters', () => {
    expect(escapeHtml('<a href="test">&')).toBe('&lt;a href=&quot;test&quot;&gt;&amp;');
  });
});

describe('generateNonce', () => {
  it('returns a 32-character string', () => {
    const nonce = generateNonce();
    expect(nonce).toHaveLength(32);
  });

  it('contains only alphanumeric characters', () => {
    const nonce = generateNonce();
    expect(nonce).toMatch(/^[A-Za-z0-9]+$/);
  });

  it('generates different values on each call', () => {
    const a = generateNonce();
    const b = generateNonce();
    expect(a).not.toBe(b);
  });
});

describe('isLongBreak', () => {
  it('returns false when cycleCount is 0', () => {
    expect(isLongBreak(0, 4)).toBe(false);
  });

  it('returns false for non-multiples', () => {
    expect(isLongBreak(1, 4)).toBe(false);
    expect(isLongBreak(2, 4)).toBe(false);
    expect(isLongBreak(3, 4)).toBe(false);
  });

  it('returns true for exact multiples', () => {
    expect(isLongBreak(4, 4)).toBe(true);
    expect(isLongBreak(8, 4)).toBe(true);
  });

  it('works with different cycle thresholds', () => {
    expect(isLongBreak(2, 2)).toBe(true);
    expect(isLongBreak(3, 2)).toBe(false);
    expect(isLongBreak(6, 3)).toBe(true);
  });
});

describe('getBreakInfo', () => {
  it('returns short break for non-long-break cycles', () => {
    const info = getBreakInfo(1, 5, 15, 4);
    expect(info.phase).toBe('break');
    expect(info.minutes).toBe(5);
  });

  it('returns long break at the right cycle', () => {
    const info = getBreakInfo(4, 5, 15, 4);
    expect(info.phase).toBe('longBreak');
    expect(info.minutes).toBe(15);
  });

  it('returns short break at cycle 0', () => {
    const info = getBreakInfo(0, 5, 15, 4);
    expect(info.phase).toBe('break');
    expect(info.minutes).toBe(5);
  });

  it('returns long break at multiple of cyclesBeforeLongBreak', () => {
    const info = getBreakInfo(8, 5, 15, 4);
    expect(info.phase).toBe('longBreak');
    expect(info.minutes).toBe(15);
  });
});
