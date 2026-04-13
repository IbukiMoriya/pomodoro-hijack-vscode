import type { HijackOptions } from './types';
import { getMessages } from './i18n';
import { escapeHtml, generateNonce } from './utils';
import { getStyles } from './breakStyles';
import { getScript } from './breakScript';

export function renderBreakHtml(options: HijackOptions): string {
  const messages = getMessages(options.language);
  const nonce = generateNonce();
  const isLong = options.phase === 'longBreak';
  const title = isLong ? messages.longBreakTitle : messages.breakTitle;
  const subtitle = messages.breakSubtitle(options.breakMinutes, options.cycleCount);
  const emoji = isLong ? '🌙' : '☕';
  const totalSeconds = options.breakMinutes * 60;
  const htmlLang = options.language === 'ja' ? 'ja' : 'en';

  return `<!doctype html>
<html lang="${htmlLang}">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'nonce-${nonce}'; script-src 'nonce-${nonce}';" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Pomodoro Break</title>
  <style nonce="${nonce}">${getStyles()}</style>
</head>
<body>
  <div class="overlay"></div>
  <div class="stars" id="stars"></div>

  <div class="container">
    <div class="emoji">${emoji}</div>
    <h1>${escapeHtml(title)}</h1>
    <p class="subtitle">${escapeHtml(subtitle)}</p>
    <div class="timer" id="timer">--:--</div>
    <div class="progress-bar">
      <div class="progress-fill" id="progress" style="width: 100%"></div>
    </div>
    <div class="tips" id="tips"></div>
    <button class="dismiss-btn" id="dismiss" ${options.enforceFullBreak ? 'disabled' : ''}>${escapeHtml(messages.dismissButtonLabel)}</button>
    ${options.enforceFullBreak ? `<p class="strict-notice" id="strictNotice">${escapeHtml(messages.strictNoticeWaiting)}</p>` : ''}
  </div>

  <script nonce="${nonce}">
    ${getScript(totalSeconds, options.enforceFullBreak, [...messages.wellnessTips], messages.strictNoticeDone)}
  </script>
</body>
</html>`;
}
