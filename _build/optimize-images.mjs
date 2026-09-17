// Recorta, recomprime y genera variantes WebP de las imágenes reales del dominio.
// Fuente: _rastreo/img-original/  ->  Destino: assets/img/
// Uso: node _build/optimize-images.mjs
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]):/, "$1:");
const SRC = path.join(ROOT, "_rastreo", "img-original");
const OUT = path.join(ROOT, "assets", "img");

function ffmpeg(args) {
  execFileSync("ffmpeg", ["-y", "-v", "error", ...args], { stdio: "inherit" });
}

// Aplana el canal alfa sobre blanco antes de recortar/escalar: sin esto, los PNG
// transparentes del blog (iconos, infografías) salen con fondo negro al pasarlos a JPG/WebP.
const FLATTEN = "format=rgba,split[a__][b__];[a__]geq=r=255:g=255:b=255:a=255[bg__];[bg__][b__]overlay=format=auto";

function pair(inputPath, outBase, { vf, quality = 4 } = {}) {
  fs.mkdirSync(path.dirname(outBase), { recursive: true });
  const chain = vf ? `${FLATTEN},${vf}` : FLATTEN;
  const fc = `[0:v]${chain}[out]`;
  ffmpeg(["-i", inputPath, "-filter_complex", fc, "-map", "[out]", "-q:v", String(quality), `${outBase}.jpg`]);
  ffmpeg(["-i", inputPath, "-filter_complex", fc, "-map", "[out]", "-quality", "78", `${outBase}.webp`]);
}

function sizes(paths) {
  for (const p of paths) {
    const out = execFileSync("ffprobe", [
      "-v", "error", "-select_streams", "v:0",
      "-show_entries", "stream=width,height", "-of", "csv=p=0:s=x", p,
    ]).toString().trim();
    console.log(path.basename(p), out);
  }
}

console.log("== fotos de sección ==");
pair(path.join(SRC, "bg.jpg"), path.join(OUT, "hero-mercado"), {
  vf: "crop=2000:1250:0:125,scale=1600:-1",
  quality: 3,
});
pair(path.join(SRC, "foto_servicios.jpg"), path.join(OUT, "servicios-cocina"), { quality: 3 });
pair(path.join(SRC, "foto_nutricion.jpg"), path.join(OUT, "nutricion-aceite"), {
  vf: "crop=323:331:0:0",
  quality: 3,
});
pair(path.join(SRC, "foto_nutricion.jpg"), path.join(OUT, "nutricion-pan"), {
  vf: "crop=323:331:323:0",
  quality: 3,
});
pair(path.join(SRC, "foto_innovacion.jpg"), path.join(OUT, "innovacion-pasta"), { quality: 3 });
pair(path.join(SRC, "foto_contacto.jpg"), path.join(OUT, "contacto-ninos"), {
  vf: "crop=1042:300:0:0",
  quality: 3,
});
pair(path.join(SRC, "foto_pie.jpg"), path.join(OUT, "footer-verduras"), {
  vf: "crop=1039:455:0:90,scale=1400:-1",
  quality: 3,
});

console.log("== platos (galería) ==");
for (let i = 1; i <= 19; i++) {
  pair(path.join(SRC, "platos", `plato${i}.jpg`), path.join(OUT, "platos", `plato${i}`), { quality: 4 });
}

console.log("== imágenes del blog ==");
const RENAME = {
  "fruta+partida.jpg": "fruta-partida",
  "libro+manzana.jpg": "libro-manzana",
  "zumo+frutas.jpg": "zumo-frutas",
  "frutos+secos.jpg": "frutos-secos",
  "verduras+cocidas.jpg": "verduras-cocidas",
  "legumes-665788_1280.jpg": "legumbres",
  "bowl-of-fruit-1205155_1280.jpg": "bowl-fruta",
  "5.jpg": "menus-atractivos-plato",
};
const blogDir = path.join(SRC, "blog");
for (const file of fs.readdirSync(blogDir)) {
  const ext = path.extname(file);
  const base = path.basename(file, ext);
  const outName = RENAME[file] || base;
  pair(path.join(blogDir, file), path.join(OUT, "blog", outName), {
    vf: "scale='min(1200,iw)':-1",
    quality: 4,
  });
}

console.log("== hecho ==");
