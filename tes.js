// const { GologinApi } = require("gologin");
const { GoLogin } = require("./dist/src/gologin");
// you can use declaration below in your project
// const GoLogin = require("gologin-commonjs");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmQyNWY1YWIyYjc0NjE1ZDYwODQ5NmIiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2NmQ1MGI2MjI3Y2JiYzZlM2NkNjE3MmIifQ.q07McCw7YA7K2EDavmr6jM5l_deKzWtVeDhMeuEMmkU";
const profile_id = "66fe50293b03e1e5216d3977";

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
