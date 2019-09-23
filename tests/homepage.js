const siteSettings = require('../configs/sites.js');
// const imgpath = require('../nightwatch.conf').default.imgpath;
const siteUrl = `https://${siteSettings.env}.${siteSettings.url}`;
//let screenshotsPath;

module.exports = {
    tags: ['desktop'], 
    before: function (browser) {
        //browser.resizeWindow(1024, 3000);
        //screenshotsPath = imgpath(browser);
    },
    'Tribute.ca(Desktop)|Homepage': function (browser) {
        browser.url(siteUrl);
        browser.getTitle(function(title) {
            this.assert.ok(title.includes("Tribute.ca"));
            });
        //browser.saveScreenshot(`${screenshotsPath}/homepage.png`) // we don't really need this because BrowserStack will take screenshots automatically (as long as we enabled this feature)
        browser.end();
    }
}
