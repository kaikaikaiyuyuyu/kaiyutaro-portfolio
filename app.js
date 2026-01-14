const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const projects = require("./project"); // ✅ 追加

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(expressLayouts);
app.set("layout", "layout");

// TOP（一覧）
app.get("/", (req, res) => {
  res.render("index", { title: "Portfolio", projects }); // ✅ projects を渡す
});

// About（既存）
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// ✅ 作品詳細（あとで詳細ページ作る時に使う）
app.get("/projects/:slug", (req, res) => {
  const project = projects.find(p => p.slug === req.params.slug);
  if (!project) return res.status(404).send("Project not found");
  res.render("projects/show", { title: project.title, project });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

