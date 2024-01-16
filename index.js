const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (e) {
    return false;
  }
}

async function pixelSnapper(url, options = {}, callback) {
  const { output = "screenshot", type = "webp", encoding, savePath } = options;

  if (!isValidUrl(url)) {
    if (callback) {
      callback(new Error("Invalid URL provided."), null);
    } else {
      console.error("Invalid URL provided.");
      return null;
    }
    return;
  }

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle0" });

    // Custom modifications to the page before taking a screenshot
    await page.evaluate(() => {
      // Custom script if needed
    });

    let result;
    if (encoding === "base64") {
      result = await page.screenshot({
        type: type,
        fullPage: true,
        encoding: "base64",
      });
      console.log("Screenshot taken and encoded in base64.");
    } else {
      const filename = output + "." + type;
      let screenshotPath = filename;

      // If savePath is provided, resolve it against the current working directory
      if (savePath) {
        screenshotPath = path.resolve(savePath, filename);

        // Ensure the directory exists before saving the file
        try {
          if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath, { recursive: true });
          }
        } catch (error) {
          // Handle ENOENT or any other error during directory creation
          if (error.code === "ENOENT") {
            console.error(
              "Error: The directory specified in savePath does not exist and could not be created."
            );
          } else {
            console.error("Error creating directory:", error.message);
          }
          await browser.close();
          if (callback) {
            callback(error, null);
          } else {
            return error;
          }
          return;
        }
      }

      await page.screenshot({
        path: screenshotPath,
        type: type,
        fullPage: true,
      });
      console.log("Screenshot saved as " + screenshotPath);
      result = "success";
    }

    await browser.close();

    // Check if callback exists; otherwise, return result
    if (callback) {
      callback(null, result); // Send back either the file name or the base64 string
    } else {
      return result; // Return the file name or the base64 string when no callback is provided
    }
  } catch (e) {
    console.error("Error taking screenshot:", e.message);

    if (callback) {
      callback(e, null);
    } else {
      return e; // Return error when no callback is provided
    }
  }
}

module.exports = pixelSnapper;
