// Regenerates Christopher-Hamm-Resume.pdf from index.html using the page's print styles.
// Usage: node scripts/build-pdf.js   (requires the playwright package)
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const types = { '.html': 'text/html', '.css': 'text/css', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.pdf': 'application/pdf' };

const server = http.createServer((req, res) => {
	const file = path.join(root, req.url === '/' ? 'index.html' : decodeURIComponent(req.url.split('?')[0]));
	if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
	res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
	fs.createReadStream(file).pipe(res);
});

server.listen(0, async () => {
	const browser = await chromium.launch();
	try {
		const page = await browser.newPage();
		await page.route(/googletagmanager/, r => r.abort());
		await page.goto(`http://localhost:${server.address().port}/`, { waitUntil: 'networkidle' });
		await page.evaluate(() => document.fonts.ready);
		await page.pdf({ path: path.join(root, 'Christopher-Hamm-Resume.pdf'), format: 'Letter', printBackground: true });
		console.log('Wrote Christopher-Hamm-Resume.pdf');
	} finally {
		await browser.close();
		server.close();
	}
});
