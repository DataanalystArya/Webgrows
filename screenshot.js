const puppeteer = require('puppeteer');
const fs = require('fs');

const projects = [
  { id: 'nayra', url: 'https://tinyurl.com/Nayra-jewels' },
  { id: 'velmora', url: 'https://tinyurl.com/Velmora-advisory' },
  { id: 'vornexa', url: 'https://tinyurl.com/vornexa-buildco' },
  { id: 'veloria', url: 'https://tinyurl.com/VeloriaFashion' },
  { id: 'stepstyle', url: 'https://tinyurl.com/StepStyleShoes' },
  { id: 'aroma', url: 'https://tinyurl.com/AromaAlley' }
];

(async () => {
  if (!fs.existsSync('./public/projects')) {
    fs.mkdirSync('./public/projects');
  }
  const browser = await puppeteer.launch({ headless: "new" });
  for (const p of projects) {
    console.log('Screenshotting ' + p.id + '...');
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(p.url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.screenshot({ path: `./public/projects/${p.id}.png` });
      await page.close();
      console.log('Done ' + p.id);
    } catch (e) {
      console.log('Failed ' + p.id, e.message);
    }
  }
  await browser.close();
})();
