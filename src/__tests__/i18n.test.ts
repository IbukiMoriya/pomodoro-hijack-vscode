import { describe, it, expect } from 'vitest';
import { getMessages } from '../i18n';

describe('getMessages', () => {
  it('returns Japanese messages for ja', () => {
    const msg = getMessages('ja');
    expect(msg.breakTitle).toBe('休憩タイム！目を休めて！');
    expect(msg.dismissButtonLabel).toBe('仕事に戻る');
  });

  it('returns English messages for en', () => {
    const msg = getMessages('en');
    expect(msg.breakTitle).toBe('Break Time! Rest Your Eyes!');
    expect(msg.dismissButtonLabel).toBe('Back to Work');
  });

  it('has wellness tips for both languages', () => {
    for (const lang of ['ja', 'en'] as const) {
      const msg = getMessages(lang);
      expect(msg.wellnessTips.length).toBeGreaterThan(0);
      for (const tip of msg.wellnessTips) {
        expect(tip).toBeTruthy();
      }
    }
  });

  it('has phase labels for all active phases', () => {
    for (const lang of ['ja', 'en'] as const) {
      const msg = getMessages(lang);
      expect(msg.phaseLabels.work).toBeTruthy();
      expect(msg.phaseLabels.break).toBeTruthy();
      expect(msg.phaseLabels.longBreak).toBeTruthy();
    }
  });

  it('has phase tooltips for all active phases', () => {
    for (const lang of ['ja', 'en'] as const) {
      const msg = getMessages(lang);
      expect(msg.phaseTooltips.work).toBeTruthy();
      expect(msg.phaseTooltips.break).toBeTruthy();
      expect(msg.phaseTooltips.longBreak).toBeTruthy();
    }
  });

  it('formats breakSubtitle correctly', () => {
    const ja = getMessages('ja');
    expect(ja.breakSubtitle(5, 3)).toContain('5');
    expect(ja.breakSubtitle(5, 3)).toContain('3');

    const en = getMessages('en');
    expect(en.breakSubtitle(5, 3)).toContain('5');
    expect(en.breakSubtitle(5, 3)).toContain('3');
  });
});
