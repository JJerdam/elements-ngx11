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