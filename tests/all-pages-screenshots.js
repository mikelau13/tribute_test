/*
 * The purpose of this page is to generate screenshots (either browserstack or localhost)
 * for a quick visual testing.  A tester is supposed to quickly go through the screenshots
 * and attempt to spot any obvious issues.
 * 
 * In our first time running, successfully found a page that failed to be responsive in 
 * iPhone6; few "underfined" Javascript issues in mobile version; and some other minor 
 * issues.
 */

const siteSettings = require('../configs/sites.js');
const imgpath = require('../nightwatch.conf').imgpath;
const siteUrl = `${siteSettings.protocol}://${siteSettings.env}.${siteSettings.url}`;
let screenshotsPath;
const allUrls = require('./datas/tribute-url-map.json');

module.exports = {
    tags: ['desktop'], 
    before: function (browser) {
        screenshotsPath = imgpath(browser);
        browser.resizeWindow(480, 700);
    },
    'All url map': function (browser) {
        allUrls.forEach((eachPage) => {
            browser.getTitle(function(title) {
                console.log(`${eachPage.description} - ${eachPage.url} - ${title}`);
            });
            browser.url(siteUrl + eachPage.url);
            if (eachPage.titleSearch) {
                browser.getTitle(function(title) {
                    eachPage.titleSearch.split(';').forEach((eachSearch) => {
                        this.assert.ok(title.includes(eachSearch));

                    })
                });
            }
            browser.saveScreenshot(`${screenshotsPath}/${eachPage.url.replace(/\//g, '_').replace(/\?/g, '_')}.png`)
        });

        browser.end();
    }
}
