import { FileItem, saveFiles, getFiles } from "./fileStore";

function svgDataUrl(svg: string): string {
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

const SAMPLE_HTML = `<!DOCTYPE html>
<html lang="zh">
<head><meta charset="UTF-8"><title>欢迎页面</title>
<style>body{font-family:system-ui;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff}
.card{background:rgba(255,255,255,.15);backdrop-filter:blur(10px);border-radius:20px;padding:3rem;text-align:center;max-width:500px}
h1{font-size:2.5rem;margin-bottom:1rem}p{opacity:.9;line-height:1.6}</style></head>
<body><div class="card"><h1>🚀 Hello World</h1><p>这是一个示例 HTML 页面，通过文件管理系统上传并托管。</p></div></body></html>`;

const SAMPLE_HTML2 = `<!DOCTYPE html>
<html lang="zh">
<head><meta charset="UTF-8"><title>产品介绍</title>
<style>body{font-family:system-ui;margin:0;padding:2rem;background:#f8fafc;color:#1e293b}
.container{max-width:600px;margin:auto}h1{color:#3b82f6}
.feature{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:1.5rem;margin:1rem 0}
.tag{background:#dbeafe;color:#1d4ed8;padding:4px 12px;border-radius:99px;font-size:12px;display:inline-block}</style></head>
<body><div class="container"><h1>📦 产品介绍</h1>
<div class="feature"><span class="tag">功能</span><h3>文件管理</h3><p>支持 HTML 和图片文件的上传与管理</p></div>
<div class="feature"><span class="tag">图床</span><h3>图片托管</h3><p>一键复制图片直链，方便引用</p></div>
</div></body></html>`;

const sampleFiles: FileItem[] = [
  {
    id: "demo-html-1",
    name: "welcome.html",
    type: "html",
    size: 812,
    description: "欢迎页面 - 渐变背景卡片示例",
    content: SAMPLE_HTML,
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: "demo-html-2",
    name: "product.html",
    type: "html",
    size: 654,
    description: "产品介绍页面模板",
    content: SAMPLE_HTML2,
    createdAt: Date.now() - 86400000,
  },
  {
    id: "demo-img-1",
    name: "banner.png",
    type: "image",
    size: 45200,
    description: "网站横幅图片",
    dataUrl: svgDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225">
<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#3b82f6"/><stop offset="100%" style="stop-color:#8b5cf6"/></linearGradient></defs>
<rect width="400" height="225" fill="url(#g)" rx="12"/>
<text x="200" y="105" text-anchor="middle" fill="white" font-size="28" font-family="system-ui" font-weight="bold">Banner</text>
<text x="200" y="135" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="14" font-family="system-ui">Sample Banner</text></svg>`),
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: "demo-img-2",
    name: "avatar.png",
    type: "image",
    size: 12800,
    description: "用户头像",
    dataUrl: svgDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225">
<rect width="400" height="225" fill="#f0fdf4" rx="12"/>
<circle cx="200" cy="90" r="40" fill="#22c55e"/>
<text x="200" y="100" text-anchor="middle" fill="white" font-size="32" font-family="system-ui">A</text>
<text x="200" y="160" text-anchor="middle" fill="#166534" font-size="16" font-family="system-ui" font-weight="bold">Avatar</text>
<text x="200" y="185" text-anchor="middle" fill="#15803d" font-size="12" font-family="system-ui">avatar.png</text></svg>`),
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: "demo-img-3",
    name: "screenshot.png",
    type: "image",
    size: 89400,
    description: "应用截图",
    dataUrl: "data:image/svg+xml;base64," + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225">
<rect width="400" height="225" fill="#1e293b" rx="12"/>
<rect x="20" y="20" width="360" height="30" fill="#334155" rx="6"/>
<circle cx="40" cy="35" r="5" fill="#ef4444"/><circle cx="58" cy="35" r="5" fill="#eab308"/><circle cx="76" cy="35" r="5" fill="#22c55e"/>
<rect x="20" y="65" width="160" height="140" fill="#334155" rx="6"/>
<rect x="195" y="65" width="185" height="65" fill="#334155" rx="6"/>
<rect x="195" y="140" width="185" height="65" fill="#334155" rx="6"/>
<text x="200" y="210" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="11" font-family="system-ui">应用截图</text></svg>`),
    createdAt: Date.now() - 3600000,
  },
];

export function loadSampleData() {
  const existing = getFiles();
  if (existing.length === 0) {
    saveFiles(sampleFiles);
  }
  return sampleFiles;
}
