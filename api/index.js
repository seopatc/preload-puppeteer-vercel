const chromium = require('chrome-aws-lambda');

module.exports = async (req, res) => {
  let browser = null;
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto('https://propertyandthecity.com', {
      waitUntil: 'networkidle2',
    });

    await browser.close();
    res.status(200).send("✅ Homepage preloaded!");
  } catch (err) {
    if (browser) await browser.close();
    console.error("❌ Error preloading homepage:", err);
    res.status(500).send("❌ Preload failed.");
  }
};

