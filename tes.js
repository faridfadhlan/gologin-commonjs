const GoLogin = require("./dist/src/gologin");
// you can use declaration below in your project
// const GoLogin = require("gologin-commonjs");

const token = "your_token";
const profile_id = "your_profile_id";

(async () => {
  const GL = new GoLogin({
    token,
    profile_id,
  });

  try {
    const gologin = await GL.start();

    const browser = await puppeteer.connect({
      browserWSEndpoint: gologin.wsUrl.toString(),
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.goto("https://youtube.com");
  } catch {}
})();
