# Installation

`npm install`

# Build

`npm run build:app`

This project uses `build-elements.js` script that will merge generated `.js` files into one:

```js
const fs = require('fs-extra');
const concat = require('concat');

const appName = "elements-ngx11";

const buildElement = async () => {
    const files = [
        `./dist/${appName}/polyfills.js`, 
        `./dist/${appName}/scripts.js`
    ]
    await fs.ensureDir('elements');
    await concat(files, 'elements/vendor.js');
    fs.copyFile(`./dist/${appName}/main.js`, 'elements/my-form.js');
}

buildElement().then(() => {
    console.log("File created")
});
```

This will ensure that `elements` directory exists, and put generated script there.

# Run

Open `index.html` file in a browser.

# Additional info

This example uses `ngx-build-plus` as a builder. It's set up in `angular.json` file:

```json
      "architect": {
        "build": {
          "builder": "ngx-build-plus:browser",
          "options": {
            "outputPath": "dist/elements-ngx11",
            "index": "src/index.html",
```

It uses additional webpack configuration to extract angular dependencies from a component itself:

`webpack.externals.js` :

```js
module.exports = {
    "externals": {
        "rxjs": "rxjs",
        "@angular/core": "ng.core",
        "@angular/common": "ng.common",
        "@angular/platform-browser": "ng.platformBrowser",
        "@angular/elements": "ng.elements",
        "@angular/forms": "ng.forms"
    }
}
```

Extracted scripts have to be provided in `scripts` array in `angular.json` : 

```json
...
            "scripts": [
              "node_modules/rxjs/bundles/rxjs.umd.js",
              "node_modules/@angular/core/bundles/core.umd.js",
              "node_modules/@angular/common/bundles/common.umd.js",
              "node_modules/@angular/elements/bundles/elements.umd.js",
              "node_modules/@angular/platform-browser/bundles/platform-browser.umd.js",
              "node_modules/@angular/forms/bundles/forms.umd.js"
            ]
...
```