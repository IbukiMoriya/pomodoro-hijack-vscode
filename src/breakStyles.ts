export function getStyles(): string {
  return `
    :root { color-scheme: light dark; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      height: 100vh;
      width: 100vw;
      background: #1a1a2e;
      color: #eee;
      font-family: var(--vscode-font-family, 'Segoe UI', sans-serif);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      user-select: none;
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse at center, #16213e 0%, #0f0f23 100%);
      z-index: -1;
    }

    .stars { position: fixed; inset: 0; z-index: -1; }
    .star {
      position: absolute;
      width: 3px;
      height: 3px;
      background: white;
      border-radius: 50%;
      animation: twinkle 2s ease-in-out infinite;
    }

    @keyframes twinkle {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 1; }
    }

    .container { text-align: center; z-index: 1; }

    .emoji {
      font-size: 80px;
      animation: bounce 2s ease-in-out infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }

    h1 {
      font-size: 36px;
      margin: 20px 0 10px;
      background: linear-gradient(135deg, #e94560, #533483);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle { font-size: 16px; opacity: 0.7; margin-bottom: 30px; }

    .timer {
      font-size: 72px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      letter-spacing: 4px;
      color: #e94560;
      text-shadow: 0 0 30px rgba(233, 69, 96, 0.5);
      margin: 20px 0;
    }

    .progress-bar {
      width: 300px;
      height: 6px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      margin: 20px auto;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #e94560, #533483);
      border-radius: 3px;
      transition: width 1s linear;
    }

    .tips { margin-top: 24px; font-size: 14px; opacity: 0.6; max-width: 400px; }

    .dismiss-btn {
      margin-top: 30px;
      padding: 10px 28px;
      border: 2px solid rgba(233, 69, 96, 0.5);
      background: transparent;
      color: #e94560;
      font-size: 14px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .dismiss-btn:hover {
      background: rgba(233, 69, 96, 0.15);
      border-color: #e94560;
    }
    .dismiss-btn:disabled { opacity: 0.3; cursor: not-allowed; }

    .strict-notice { margin-top: 10px; font-size: 12px; opacity: 0.4; }
  `;
}
