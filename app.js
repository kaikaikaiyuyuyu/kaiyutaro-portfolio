const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

// ✅ 作品データ（あなたの実ファイル名に合わせてOK）
// もしファイル名が projects.js なら "./projects" にしてください
const projects = require("./project");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ public配下を静的配信（/css, /js, /img, /video）
app.use(express.static(path.join(__dirname, "public")));

// ✅ layout.ejs を使う
app.use(expressLayouts);
app.set("layout", "layout");

// ----------------------
// Routes
// ----------------------

// TOP（一覧）
app.get("/", (req, res) => {
  res.render("index", {
    title: "Portfolio",
    projects,
  });
});

// About
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

// Contact
app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
  });
});

// 作品詳細
app.get("/projects/:slug", (req, res) => {
  const project = projects.find((p) => p.slug === req.params.slug);
  if (!project) return res.status(404).send("Project not found");

  res.render("projects/show", {
    title: project.title,
    project,
  });
});

// ----------------------
// Server
// ----------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});