export type Language = 'ja' | 'en';
export type Phase = 'work' | 'break' | 'longBreak' | 'idle';
export type ActivePhase = Exclude<Phase, 'idle'>;

export interface PomodoroSettings {
  workMinutes: number;
  breakMinutes: number;
  longBreakMinutes: number;
  cyclesBeforeLongBreak: number;
  autoStart: boolean;
  enforceFullBreak: boolean;
  language: Language;
}

export interface HijackOptions {
  phase: 'break' | 'longBreak';
  breakMinutes: number;
  cycleCount: number;
  enforceFullBreak: boolean;
  language: Language;
  onDismiss: () => void;
}
