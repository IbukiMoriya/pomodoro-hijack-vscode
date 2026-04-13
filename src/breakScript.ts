import { STAR_COUNT } from './constants';

export function getScript(totalSeconds: number, enforceFullBreak: boolean, tips: string[], strictNoticeDone: string): string {
  const tipsJson = JSON.stringify(tips).replace(/<\//g, '<\\/');
  const doneJson = JSON.stringify(strictNoticeDone).replace(/<\//g, '<\\/');
  return `
    const vscode = acquireVsCodeApi();
    const totalSeconds = ${totalSeconds};
    const enforceFullBreak = ${enforceFullBreak};
    const starCount = ${STAR_COUNT};
    let remaining = totalSeconds;

    const tips = ${tipsJson};
    document.getElementById('tips').textContent = tips[Math.floor(Math.random() * tips.length)];

    const starsEl = document.getElementById('stars');
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.animationDuration = (1.5 + Math.random() * 2) + 's';
      starsEl.appendChild(star);
    }

    const timerEl = document.getElementById('timer');
    const progressEl = document.getElementById('progress');
    const dismissBtn = document.getElementById('dismiss');
    const strictNotice = document.getElementById('strictNotice');

    function update() {
      const mins = Math.floor(remaining / 60);
      const secs = remaining % 60;
      timerEl.textContent = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
      progressEl.style.width = ((remaining / totalSeconds) * 100) + '%';

      if (enforceFullBreak && remaining <= 0 && dismissBtn) {
        dismissBtn.disabled = false;
        if (strictNotice) strictNotice.textContent = ${doneJson};
      }
    }

    update();

    const interval = setInterval(() => {
      remaining--;
      if (remaining < 0) remaining = 0;
      update();
      if (remaining <= 0) clearInterval(interval);
    }, 1000);

    dismissBtn?.addEventListener('click', () => {
      if (!dismissBtn.disabled) {
        vscode.postMessage({ type: 'dismiss' });
      }
    });
  `;
}
