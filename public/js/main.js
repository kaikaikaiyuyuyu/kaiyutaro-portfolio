// public/js/main.js
// 役割：
// 1) どのページからでも Projects を /#projects に飛ばす
// 2) TOP: フィルターチップでカードを絞り込み
// 3) TOP: カード hover で動画プレビュー（あれば）
// 4) 詳細: 画像クリックでライトボックス（どこを押しても閉じる / ESCでも閉じる）
// 5) Contact: mailto にフォーム内容を転記 + 全画面フェードの通知

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    // ============================================
    // 1) Global: "Projects" link should always go to /#projects
    // ============================================
    // layout.ejs 側が /#projects でも、古い #projects リンクが残っていても対応できるように
    // - href="#projects" なら TOP に移動
    // - href="/#projects" はそのまま（ただしTOP以外なら遷移）
    document
      .querySelectorAll('a[href="#projects"], a[href="/#projects"]')
      .forEach((a) => {
        a.addEventListener("click", (e) => {
          const href = a.getAttribute("href") || "";

          // TOPなら通常挙動でOK（#projects / /#projects どちらでも）
          const isTop = window.location.pathname === "/" || window.location.pathname === "";
          if (isTop) return;

          // TOP以外なら /#projects に強制
          if (href === "#projects" || href === "/#projects") {
            e.preventDefault();
            window.location.href = "/#projects";
          }
        });
      });

    // ============================================
    // 2) TOP: Projects list filter chips
    // ============================================
    const chips = document.querySelectorAll(".chip");
    const cards = document.querySelectorAll(".card");

    function setActive(btn) {
      chips.forEach((c) => c.classList.remove("is-active"));
      if (btn) btn.classList.add("is-active");
    }

    function parseTags(el) {
      return (el.dataset.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    function filterCards(tag) {
      cards.forEach((card) => {
        const tags = parseTags(card);
        const show = tag === "all" || tags.includes(tag);
        card.style.display = show ? "" : "none";
      });
    }

    // chips/cards が存在するページだけ実行（about/contact/detailで不要なエラーを出さない）
    if (chips.length && cards.length) {
      chips.forEach((btn) => {
        btn.addEventListener("click", () => {
          const tag = btn.dataset.filter || "all";
          setActive(btn);
          filterCards(tag);
        });
      });

      // 初期状態：all
      const initial =
        document.querySelector('.chip[data-filter="all"]') || chips[0] || null;
      if (initial) {
        setActive(initial);
        filterCards(initial.dataset.filter || "all");
      }
    }

    // ============================================
    // 4) Detail: Image lightbox (click to zoom)
    // - 画像をクリックで拡大
    // - 画面のどこを押しても閉じる（×ボタン不要）
    // - ESCでも閉じる
    // ============================================
    const projectImagesWrap = document.querySelector(".project-images");
    if (projectImagesWrap) {
      const imgs = projectImagesWrap.querySelectorAll("img");

      let overlay = null;

      const onKeyDown = (e) => {
        if (e.key === "Escape") closeLightbox();
      };

      const closeLightbox = () => {
        if (!overlay) return;
        overlay.remove();
        overlay = null;
        document.removeEventListener("keydown", onKeyDown);
      };

      const openLightbox = (src, alt) => {
        // 既に開いてたら一旦閉じる
        closeLightbox();

        overlay = document.createElement("div");
        overlay.className = "lightbox";
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");

        const overlayImg = document.createElement("img");
        overlayImg.className = "lightbox__img";
        overlayImg.src = src;
        overlayImg.alt = alt || "";

        overlay.appendChild(overlayImg);
        document.body.appendChild(overlay);

        // どこを押しても閉じる
        overlay.addEventListener("click", closeLightbox);

        // ESCで閉じる
        document.addEventListener("keydown", onKeyDown);
      };

      imgs.forEach((img) => {
        img.style.cursor = "zoom-in";
        img.addEventListener("click", () => {
          openLightbox(img.currentSrc || img.src, img.alt);
        });
      });
    }

    // ============================================
    // 5) Contact: mailto にフォーム内容を転記 + 送信表示（全画面フェード）
    // ============================================
    const contactForm = document.getElementById("contactForm");

    // ✅ 全画面フェードで通知を中央表示
    // - mailto遷移すると即座に画面が切り替わるので、少しだけ遅延して見せる
    // - contact.ejsに要素が無くても動くように、JS側で自動生成
    function showContactToast(message = "メーラーが開きます") {
      let overlay = document.getElementById("contactToastOverlay");

      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "contactToastOverlay";
        overlay.className = "contact-toast-overlay";
        overlay.setAttribute("role", "status");
        overlay.setAttribute("aria-live", "polite");

        const msg = document.createElement("div");
        msg.className = "contact-toast-message";
        overlay.appendChild(msg);

        document.body.appendChild(overlay);

        // CSSがまだ無い環境でも崩れないように最低限のスタイルを注入
        // （文字サイズは今のまま=13px相当で維持）
        if (!document.getElementById("contactToastStyle")) {
          const style = document.createElement("style");
          style.id = "contactToastStyle";
          style.textContent = `
            .contact-toast-overlay{
              position:fixed;
              inset:0;
              display:flex;
              align-items:center;
              justify-content:center;
              background:rgba(0,0,0,.0);
              opacity:0;
              pointer-events:none;
              transition: opacity .22s ease, background .22s ease;
              z-index:9999;
            }
            .contact-toast-overlay.is-visible{
              opacity:1;
              background:rgba(0,0,0,.72);
            }
            .contact-toast-message{
              padding:12px 16px;
              border-radius:16px;
              border:1px solid rgba(255,255,255,.14);
              background:rgba(0,0,0,.40);
              color:rgba(255,255,255,.92);
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
              font-size:13px;
              letter-spacing:.02em;
            }
          `;
          document.head.appendChild(style);
        }
      }

      const msgEl = overlay.querySelector(".contact-toast-message");
      if (msgEl) msgEl.textContent = message;

      overlay.classList.add("is-visible");

      window.clearTimeout(showContactToast._t);
      showContactToast._t = window.setTimeout(() => {
        overlay.classList.remove("is-visible");
      }, 1200);
    }

    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // 1) name属性から取得（推奨）
        const fd = new FormData(contactForm);
        const nameByNameAttr = (fd.get("name") || "").toString();
        const emailByNameAttr = (fd.get("email") || "").toString();
        const messageByNameAttr = (fd.get("message") || "").toString();

        // 2) 互換：idからも取得（既存実装との互換）
        const nameEl = document.getElementById("contact-name");
        const emailEl = document.getElementById("contact-email");
        const msgEl = document.getElementById("contact-message");

        const name = (nameByNameAttr || (nameEl ? nameEl.value : "")).trim();
        const email = (emailByNameAttr || (emailEl ? emailEl.value : "")).trim();
        const message = (
          messageByNameAttr || (msgEl ? msgEl.value : "")
        ).trim();

        // ✅ 先に表示（mailtoでページがすぐ切り替わるので）
        showContactToast("メーラーが開きます");

        // メーラー側で改行が崩れにくいように CRLF を明示
        const bodyLines = [
          `お名前: ${name}`,
          `メール: ${email}`,
          "",
          "--- メッセージ ---",
          message,
        ];
        const body = bodyLines.join("\r\n");

        const subject = name ? `Contact from ${name}` : "Contact from Portfolio";

        const mailto =
          `mailto:kmc2308@kamiyama.ac.jp` +
          `?subject=${encodeURIComponent(subject)}` +
          `&body=${encodeURIComponent(body)}`;

        // ✅ フェードが見えるように少しだけ遅延
        window.setTimeout(() => {
          window.location.href = mailto;
        }, 280);
      });
    }
  });
})();

// ============================================
// About: quiet reveal
// ============================================
const isAbout = window.location.pathname === "/about";
if (isAbout) {
  const hero = document.querySelector(".about-hero");
  const reveals = document.querySelectorAll(".about .reveal");

  // 画像：少し遅らせて入る
  if (hero) {
    window.setTimeout(() => hero.classList.add("is-in"), 80);
  }

  // テキスト：順番に
  reveals.forEach((el, i) => {
    window.setTimeout(() => el.classList.add("is-in"), 220 + i * 140);
  });
}