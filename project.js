// project-root/projects.js
// 一覧・詳細で共通に使う作品データ

const projects = [
  {
    id: "marugotofes-2025",
    slug: "marugotofes-2025",
    title: "まるごと祭2025 ティザー",
    desc: "モーショングラフィックス / 映像制作 / 編集",
    year: "2025",
    tags: ["Animation", "MotionGraphics"],
    thumb: "/img/projects/marugotofes.png",
    // hoverで動画にしたい場合だけ指定
    video: "/video/projects/まるごと祭2025.mp4",

    // 詳細ページ用（後で使う）
    images: ["/img/projects/marugotofes/01.png", "/img/projects/marugotofes/02.png", "/img/projects/marugotofes/03.png"],
    youtubeEmbedUrl: "https://www.youtube.com/embed/FTI6JqU4zao?si=8UOHcgBwtpTp0ZbO",
  },
  {
    id: "seisyunsai-2026",
    slug: "seisyunsai-2026",
    title: "青春祭2026 ティザー",
    desc: "映像制作 / 編集",
    year: "2026",
    tags: ["Animation", "MotionGraphics"],
    thumb: "/img/projects/seisyunsai.png",
    video: null,
    images: ["/img/projects/seisyunsai_1.jpg", "/img/projects/seisyunsai_2.jpg", "/img/projects/seisyunsai_3.jpg"],
    youtubeEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXc",
  },
  {
    id: "kaieiga",
    slug: "kaieiga",
    title: "邂",
    desc: "短編映画 / 監督・編集",
    year: "2024",
    tags: ["Movie", "Directing", "Editing"],
    thumb: "/img/projects/kaieiga.png",
    video: "/video/projects/邂1分ver.mov",
    images: ["/img/projects/kaieiga_1.jpg", "/img/projects/kaieiga_2.jpg", "/img/projects/kaieiga_3.jpg"],
    youtubeEmbedUrl: "https://www.youtube.com/embed/lr5k4PWpGlE?si=pUTbmMh6_JmRsUmw",
  },
  {
    id: "sakanuhana",
    slug: "sakanuhana",
    title: "咲かぬ花",
    desc: "短編映画 / 監督・編集",
    year: "2025",
    tags: ["Movie", "Directing", "Editing"],
    thumb: "/img/projects/sakanuhana.png",
    video: "/video/projects/咲かぬ花.mov",
    images: ["/img/projects/sakanuhana_1.jpg", "/img/projects/sakanuhana_2.jpg", "/img/projects/sakanuhana_3.jpg"],
    youtubeEmbedUrl: "https://www.youtube.com/embed/nfpBrb2R6eY?si=5rHIkpgf-uNjQRb7",
  },
  {
    id: "burikinodance-typopv",
    slug: "burikinodance-typopv",
    title: "ブリキノダンス 文字PV",
    desc: "モーショングラフィックス / 映像制作 / 編集",
    year: "2024",
    tags: ["Movie", "Lyric", "Logo"],
    thumb: "/img/projects/burikinodance.png",
    video: "/video/projects/ブリキノダンス.mp4",
    images: ["/img/projects/burikinodance_1.jpg", "/img/projects/burikinodance_2.jpg", "/img/projects/burikinodance_3.jpg"],
    youtubeEmbedUrl: "https://www.youtube.com/embed/co-H31EeKi4?si=dVVooqvrpWKdJe_2",
  },
    {
    id: "eigatomori",
    slug: "eigatomori",
    title: "映画と森Night",
    desc: "主催イベント / 企画・演出・映像制作",
    year: "2025",
    tags: ["Event", "Directing", "Production"],
    thumb: "/img/projects/eigatomori.jpg",
    video: "/video/projects/eigatomori.mov",
    images: ["/img/projects/eigatomori_1.jpg", "/img/projects/eigatomori_2.jpg", "/img/projects/eigatomori_3.jpg"],
    youtubeEmbedUrl: "https://www.youtube.com/embed/co-H31EeKi4?si=dVVooqvrpWKdJe_2",
  },
      {
    id: "eigatomori",
    slug: "eigatomori",
    title: "映画と森Night",
    desc: "主催イベント / 企画・演出・映像制作",
    year: "2025",
    tags: ["Event", "Directing", "Production"],
    thumb: "/img/projects/eigatomori.jpg",
    video: "/video/projects/eigatomori.mov",
    images: ["/img/projects/eigatomori_1.jpg", "/img/projects/eigatomori_2.jpg", "/img/projects/eigatomori_3.jpg"],
    youtubeEmbedUrl: "https://www.youtube.com/embed/co-H31EeKi4?si=dVVooqvrpWKdJe_2",
  },



  // ✅ ここから下にいくらでも追加OK（コピペして slug だけ必ずユニークに）
];

module.exports = projects;
