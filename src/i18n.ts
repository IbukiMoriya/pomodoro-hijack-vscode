import type { Language, ActivePhase } from './types';

export interface Messages {
  breakTitle: string;
  longBreakTitle: string;
  dismissButtonLabel: string;
  wellnessTips: readonly string[];
  strictNoticeWaiting: string;
  strictNoticeDone: string;
  panelTitle: string;
  breakSubtitle(minutes: number, cycleCount: number): string;
  alreadyRunning: string;
  stopped: string;
  notRunning: string;
  breakOver: string;
  phaseLabels: Record<ActivePhase, string>;
  phaseTooltips: Record<ActivePhase, string>;
}

const ja: Messages = {
  breakTitle: '休憩タイム！目を休めて！',
  longBreakTitle: '長めの休憩だよ！ゆっくり休んで！',
  dismissButtonLabel: '仕事に戻る',
  wellnessTips: [
    '目を閉じて、深呼吸しよう',
    '窓の外を見て、遠くを眺めよう',
    'ストレッチして体をほぐそう',
    'お水を飲もう',
    '首と肩を回してリラックス',
    '手首をぐるぐる回そう',
    '立ち上がって少し歩こう',
    '好きな音楽を聴こう',
  ],
  strictNoticeWaiting: '休憩が終わるまで待ってね...',
  strictNoticeDone: '休憩終了！お疲れさま！',
  panelTitle: '休憩タイム！',
  breakSubtitle: (minutes, cycleCount) =>
    `${minutes}分間の休憩 — サイクル ${cycleCount} 完了`,
  alreadyRunning: 'ポモドーロは既に実行中です！',
  stopped: 'ポモドーロを停止しました。',
  notRunning:
    'ポモドーロは実行されていません。「Pomodoro Hijack: Start」で開始してください。',
  breakOver: '休憩終了！仕事に戻ろう！',
  phaseLabels: { work: '作業中', break: '休憩', longBreak: '長い休憩' },
  phaseTooltips: { work: '作業中', break: '短い休憩', longBreak: '長い休憩' },
};

const en: Messages = {
  breakTitle: 'Break Time! Rest Your Eyes!',
  longBreakTitle: 'Long Break! Take It Easy!',
  dismissButtonLabel: 'Back to Work',
  wellnessTips: [
    'Close your eyes and take a deep breath',
    'Look out the window at something far away',
    'Stretch your body',
    'Drink some water',
    'Roll your neck and shoulders',
    'Rotate your wrists',
    'Stand up and take a short walk',
    'Listen to your favorite music',
  ],
  strictNoticeWaiting: 'Please wait until the break is over...',
  strictNoticeDone: 'Break complete! Great job!',
  panelTitle: 'Break Time!',
  breakSubtitle: (minutes, cycleCount) =>
    `${minutes} min break — Cycle ${cycleCount} complete`,
  alreadyRunning: 'Pomodoro is already running!',
  stopped: 'Pomodoro stopped.',
  notRunning:
    'Pomodoro is not running. Use "Pomodoro Hijack: Start" to begin.',
  breakOver: 'Break over! Time to get back to work!',
  phaseLabels: { work: 'Work', break: 'Break', longBreak: 'Long Break' },
  phaseTooltips: {
    work: 'Working',
    break: 'Short Break',
    longBreak: 'Long Break',
  },
};

const messages: Record<Language, Messages> = { ja, en };

export function getMessages(language: Language): Messages {
  return messages[language];
}
