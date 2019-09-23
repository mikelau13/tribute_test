const siteSettings = require('../configs/sites.js');
const imgpath = require('../nightwatch.conf').imgpath;
const siteUrl = `https://${siteSettings.env}.${siteSettings.url}`;
let screenshotsPath;
const allUrls = require('./datas/tribute-url-map.json');

module.exports = {
    tags: ['desktop'], 
    before: function (browser) {
        screenshotsPath = imgpath(browser);
    },
    'All url map': function (browser) {
        allUrls.forEach((eachPage) => {
            browser.url(siteUrl + eachPage.url);
            if (eachPage.titleSearch) {
                browser.getTitle(function(title) {
                    eachPage.titleSearch.split(';').forEach((eachSearch) => {
                        this.assert.ok(title.includes(eachSearch));

                    })
                });
            }
            browser.getTitle(function(title) {
                console.log(`${eachPage.description} - ${eachPage.url} - ${title}`);
            });
            browser.saveScreenshot(`${screenshotsPath}/${eachPage.url.replace(/\//g, '_').replace(/\?/g, '_')}.png`)
        });

        browser.end();
    }
}
