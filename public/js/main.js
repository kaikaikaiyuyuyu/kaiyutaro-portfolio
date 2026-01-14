document.addEventListener("DOMContentLoaded", () => {
  // chips
  const chips = document.querySelectorAll(".chip");
  // cards (index.ejs は .card を使ってる)
  const cards = document.querySelectorAll(".card");

  // ----------------------------
  // Filter
  // ----------------------------
  function setActive(btn) {
    chips.forEach(c => c.classList.remove("is-active"));
    btn.classList.add("is-active");
  }

  function parseTags(el) {
    return (el.dataset.tags || "")
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);
  }

  function filterCards(tag) {
    cards.forEach(card => {
      const tags = parseTags(card);
      const show = tag === "all" || tags.includes(tag);
      card.style.display = show ? "" : "none";
    });
  }

  chips.forEach(btn => {
    btn.addEventListener("click", () => {
      const tag = btn.dataset.filter || "all";
      setActive(btn);
      filterCards(tag);
    });
  });

  // 初期状態：all
  const initial = document.querySelector('.chip[data-filter="all"]') || chips[0];
  if (initial) {
    setActive(initial);
    filterCards(initial.dataset.filter || "all");
  }

  // ----------------------------
  // Hover video preview (optional)
  // ----------------------------
  // .card__thumb の中に video.thumb__video があるやつだけ対象
  cards.forEach(card => {
    const video = card.querySelector("video.thumb__video");
    if (!video) return;

    const play = async () => {
      try {
        // 再生準備（iOS/Chrome対策）
        video.muted = true;
        video.playsInline = true;

        // hoverした時に最初から見せたいなら 0 に戻す
        video.currentTime = 0;

        // 再生
        const p = video.play();
        if (p && typeof p.then === "function") await p;
      } catch (e) {
        // 自動再生がブロックされても無視（UX優先）
      }
    };

    const stop = () => {
      try {
        video.pause();
        video.currentTime = 0;
      } catch (e) {}
    };

    card.addEventListener("mouseenter", play);
    card.addEventListener("mouseleave", stop);

    // タッチ端末向け：タップで再生/停止（任意）
    card.addEventListener("touchstart", play, { passive: true });
  });
});
