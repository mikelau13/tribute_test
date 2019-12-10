const siteSettings = require('../configs/sites.js');
const imgpath = require('../nightwatch.conf').imgpath;
const siteUrl = `${siteSettings.protocol}://${siteSettings.env}.${siteSettings.url}`;
let screenshotsPath;

module.exports = {
    tags: ['desktop'], 
    before: function (browser) {
        screenshotsPath = imgpath(browser);
    },
    'Trailers': function (browser) {
        browser.url(`${siteUrl}/movietrailers/?watch=20880`);
        browser.expect.element('#mainContent').to.be.present;  
        //browser.waitForElementVisible('body', 6000);
        // browser.getTitle(function(title) {
        //     this.assert.ok(title.includes("Trailers"));
        //     });
        //browser.saveScreenshot(`${screenshotsPath}/movietrailers.png`);
        //browser.expect.element('.PlayerContainer').to.be.present;  
        browser.end();
    }
}
