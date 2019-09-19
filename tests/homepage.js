const siteSettings = require('../configs/sites.js');
const imgpath = require('../nightwatch.conf').imgpath;
const siteUrl = `https://${siteSettings.env}.${siteSettings.url}`;
let screenshotsPath;

module.exports = {
    tags: ['desktop'], 
    before: function (browser) {
        browser.resizeWindow(1024, 768);
        screenshotsPath = imgpath(browser);
        console.log(screenshotsPath);
    },
    'Tribute.ca(Desktop)|Homepage': function (browser) {
        browser.url(siteUrl);
        browser.getTitle(function(title) {
            this.assert.ok(title.includes("Tribute.ca"));
            });
        browser.saveScreenshot(`${screenshotsPath}/homepage.png`)
        browser.end();
    }
}
