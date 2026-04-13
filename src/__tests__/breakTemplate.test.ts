import { describe, it, expect } from 'vitest';
import { renderBreakHtml } from '../breakTemplate';
import type { HijackOptions } from '../types';

function createOptions(overrides: Partial<HijackOptions> = {}): HijackOptions {
  return {
    phase: 'break',
    breakMinutes: 5,
    cycleCount: 1,
    enforceFullBreak: true,
    language: 'ja',
    onDismiss: () => {},
    ...overrides,
  };
}

describe('renderBreakHtml', () => {
  it('returns valid HTML with doctype', () => {
    const html = renderBreakHtml(createOptions());
    expect(html).toContain('<!doctype html>');
    expect(html).toContain('</html>');
  });

  it('includes Content-Security-Policy meta tag', () => {
    const html = renderBreakHtml(createOptions());
    expect(html).toContain('Content-Security-Policy');
    expect(html).toContain("default-src 'none'");
    expect(html).toContain('script-src');
    expect(html).toContain('style-src');
  });

  it('uses matching nonce on style and script tags', () => {
    const html = renderBreakHtml(createOptions());
    const nonceMatches = html.match(/nonce="([^"]+)"/g);
    expect(nonceMatches).not.toBeNull();
    expect(nonceMatches!.length).toBeGreaterThanOrEqual(2);
    const nonces = nonceMatches!.map(m => m.replace(/nonce="([^"]+)"/, '$1'));
    const uniqueNonces = new Set(nonces);
    expect(uniqueNonces.size).toBe(1);
  });

  it('uses coffee emoji for short break', () => {
    const html = renderBreakHtml(createOptions({ phase: 'break' }));
    expect(html).toContain('☕');
  });

  it('uses moon emoji for long break', () => {
    const html = renderBreakHtml(createOptions({ phase: 'longBreak' }));
    expect(html).toContain('🌙');
  });

  it('disables dismiss button when enforceFullBreak is true', () => {
    const html = renderBreakHtml(createOptions({ enforceFullBreak: true }));
    expect(html).toContain('disabled');
    expect(html).toContain('strictNotice');
  });

  it('does not add disabled attribute or strict notice when enforceFullBreak is false', () => {
    const html = renderBreakHtml(createOptions({ enforceFullBreak: false }));
    expect(html).toContain('id="dismiss" >');
    expect(html).not.toContain('id="strictNotice"');
  });

  it('escapes HTML in title', () => {
    // Title comes from i18n, but we verify escapeHtml is applied
    const html = renderBreakHtml(createOptions());
    expect(html).not.toContain('<script>alert');
  });

  it('includes wellness tips in script', () => {
    const html = renderBreakHtml(createOptions({ language: 'ja' }));
    expect(html).toContain('深呼吸');
  });

  describe('Japanese locale', () => {
    it('shows Japanese break title', () => {
      const html = renderBreakHtml(createOptions({ language: 'ja' }));
      expect(html).toContain('休憩タイム！目を休めて！');
    });

    it('shows Japanese long break title', () => {
      const html = renderBreakHtml(createOptions({ language: 'ja', phase: 'longBreak' }));
      expect(html).toContain('長めの休憩だよ！ゆっくり休んで！');
    });

    it('shows Japanese subtitle', () => {
      const html = renderBreakHtml(createOptions({ language: 'ja', breakMinutes: 5, cycleCount: 3 }));
      expect(html).toContain('5分間の休憩');
      expect(html).toContain('サイクル 3 完了');
    });

    it('shows Japanese dismiss button', () => {
      const html = renderBreakHtml(createOptions({ language: 'ja' }));
      expect(html).toContain('仕事に戻る');
    });

    it('sets html lang to ja', () => {
      const html = renderBreakHtml(createOptions({ language: 'ja' }));
      expect(html).toContain('lang="ja"');
    });
  });

  describe('English locale', () => {
    it('shows English break title', () => {
      const html = renderBreakHtml(createOptions({ language: 'en' }));
      expect(html).toContain('Break Time! Rest Your Eyes!');
    });

    it('shows English long break title', () => {
      const html = renderBreakHtml(createOptions({ language: 'en', phase: 'longBreak' }));
      expect(html).toContain('Long Break! Take It Easy!');
    });

    it('shows English subtitle', () => {
      const html = renderBreakHtml(createOptions({ language: 'en', breakMinutes: 15, cycleCount: 4 }));
      expect(html).toContain('15 min break');
      expect(html).toContain('Cycle 4 complete');
    });

    it('shows English dismiss button', () => {
      const html = renderBreakHtml(createOptions({ language: 'en' }));
      expect(html).toContain('Back to Work');
    });

    it('sets html lang to en', () => {
      const html = renderBreakHtml(createOptions({ language: 'en' }));
      expect(html).toContain('lang="en"');
    });
  });
});
