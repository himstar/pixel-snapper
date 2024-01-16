# PixelSnapper

PixelSnapper is a tiny Node.js module that leverages Puppeteer to capture full-page screenshots of websites. It's designed to be flexible, allowing for both programmatic usage within various Node.js environments such as Express.js servers and React.js applications. The module includes URL validation, custom filename handling, and the ability to perform specific page manipulations before taking the screenshot.

## Features

- Full-page screenshot capture
- URL validation
- Custom filename generation based on URL
- Page manipulation before capture
- Easy integration with Node.js backends and frontends

## Installation

To install PixelSnapper, run the following command in your project directory:

    npm install pixel-snapper --save

or if you are using yarn:

    yarn add pixel-snapper

## Usage

### CommonJS (Express.js or similar environments)

```javascript
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
```

### Base64

```javascript
const pixelSnapper = require("pixel-snapper");

(async () => {
  try {
    const result = await pixelSnapper("https://facebook.com", {
      encoding: "base64",
    });
    console.log(result); // base64
  } catch (err) {
    console.error(err); // This will log any errors that occur during the screenshot capture
  }
})();
```

## API Reference

pixelSnapper function accepts three parameters:

url (String): The URL of the webpage to capture.
callback (Function): A function that is called when the screenshot has been taken or if an error has occurred. It receives two arguments: an error object and the filename.
options (Object): An optional parameter where you can specify:
output (String): The base name for the output file without extension.
type (String): The image type for the screenshot (jpeg or png). Default is 'webp'.

| Parameter  | Type       | Description                                                                                                                                                          |
| :--------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`      | `string`   | **Required**. The URL of the webpage to capture                                                                                                                      |
| `callback` | `function` | **Required**. A function that is called when the screenshot has been taken or if an error has occurred. It receives two arguments: an error object and the filename. |
| `options`  | `Object`   | **Optional**. An optional parameter where you can specify, output (string), type (String), savePath (String) and encoding (String)                                   |

### options (object)

| Parameter  | Type     | Description                                                                                 |
| :--------- | :------- | :------------------------------------------------------------------------------------------ |
| `output`   | `string` | **Optional**. The base name for the output file without extension, default is "screenshot". |
| `type`     | `string` | **Optional**. The image type for the screenshot (jpeg or png). Default is "webp".           |
| `savePath` | `string` | **Optional**. To specify output path, default is current application "path"                 |
| `encoding` | `string` | **Optional**. To specify if base64 is required as, encoding="base64"                        |

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Please make sure to update tests as appropriate and ensure your code adheres to the current Node.js best practices before using this package in production.
