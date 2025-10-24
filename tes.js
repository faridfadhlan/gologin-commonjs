// const { GologinApi } = require("gologin");
const { GoLogin } = require("./dist/src/gologin");
// you can use declaration below in your project
// const GoLogin = require("gologin-commonjs");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmQyNWY1YWIyYjc0NjE1ZDYwODQ5NmIiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2ODc4OWI0NjhlODQyYTdkNzNkOWJkYTMifQ.MymsBlidK2Q6L2yHTy6pw-HNy5mHHiWO2clZUlixU6c";
const profile_id = "66e2c5243d67c06802b61958";

(async () => {
  const GL = new GoLogin({
    token,
    profile_id,
    uploadCookiesToServer: true,
    restoreLastSession: false,
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
