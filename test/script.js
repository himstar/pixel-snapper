const pixelSnapper = require("pixel-snapper");

(async () => {
  try {
    const result = await pixelSnapper("https://facebook.com", {
      output: "sample-file",
      type: "png",
      savePath: "screenshots",
    });
    console.log(result); // success
  } catch (err) {
    console.error(err); // This will log any errors that occur during the screenshot capture
  }
})();
