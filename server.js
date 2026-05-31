/**
 * The King's Shield — Static Server
 * Simple Express server for Render.com deployment
 */
const express = require('express');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 3000;

// Explicit routes for public/ assets (express.static subdirs unreliable on some hosts)
const publicDir = path.join(__dirname, 'public');
fs.readdirSync(publicDir).forEach(file => {
  app.get('\/' + file, (req, res) => {
    res.sendFile(path.join(publicDir, file));
  });
});

// Serve root files (index.html, style.css, app.js)
app.use(express.static(__dirname, {
  index: 'index.html',
  maxAge: '1h',
}));

// Health check for Render
app.get('/health', (req, res) => res.json({ ok: true, token: 'SHIELD', constant: 6174 }));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`⚔  The King's Shield running on port \${PORT}\`);
  console.log(\`   Kaprekar's Constant: 6174 — All paths converge.\`);
  console.log(\`   Public assets: \${fs.readdirSync(publicDir).join(', ')}\`);
});

