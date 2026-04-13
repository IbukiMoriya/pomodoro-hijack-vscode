export function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export function minutesToSeconds(minutes: number): number {
  return minutes * 60;
}

export function minutesToMs(minutes: number): number {
  return minutes * 60 * 1000;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function generateNonce(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nonce = '';
  for (let i = 0; i < 32; i++) {
    nonce += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return nonce;
}

export interface BreakInfo {
  phase: 'break' | 'longBreak';
  minutes: number;
}

export function isLongBreak(cycleCount: number, cyclesBeforeLongBreak: number): boolean {
  return cycleCount > 0 && cycleCount % cyclesBeforeLongBreak === 0;
}

export function getBreakInfo(
  cycleCount: number,
  breakMinutes: number,
  longBreakMinutes: number,
  cyclesBeforeLongBreak: number,
): BreakInfo {
  const long = isLongBreak(cycleCount, cyclesBeforeLongBreak);
  return {
    phase: long ? 'longBreak' : 'break',
    minutes: long ? longBreakMinutes : breakMinutes,
  };
}
