document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const video = document.getElementById("introVideo");
  if (!intro) return;

  // ★ TOPページ以外では絶対に出さない
  const isTop = window.location.pathname === "/" || window.location.pathname === "";
  if (!isTop) {
    intro.remove();
    return;
  }

  // ★ セッション中は1回だけ
  const KEY = "introPlayed_session";

  // すでに再生済みなら即消す
  if (sessionStorage.getItem(KEY)) {
    intro.remove();
    return;
  }

  // 初回表示なのでフラグを立てる
  sessionStorage.setItem(KEY, "1");

  const hideIntro = () => {
    intro.classList.add("is-hidden");
    setTimeout(() => intro.remove(), 700);
  };

  // 表示を有効化
  intro.classList.add("is-active");

  // 3秒で必ず消す（再生失敗対策）
  const timer = setTimeout(hideIntro, 3000);

  if (video) {
    try {
      video.currentTime = 0;
      video.muted = true;
      video.playsInline = true;

      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    } catch (e) {}

    // 動画が終わったら消す
    video.addEventListener("ended", () => {
      clearTimeout(timer);
      hideIntro();
    });
  }
});