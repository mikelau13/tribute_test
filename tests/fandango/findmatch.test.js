const siteSettings = require('../../configs/sites.js');
const imgpath = require('../../nightwatch.conf').imgpath;
let screenshotsPath;
const allTheaters = require('../datas/theaters_nomatch.json');

module.exports = {
    before: function (browser) {
        screenshotsPath = imgpath(browser);
    },
    'Finding Fandango': function (browser) {
        allTheaters.forEach((eachTheater) => {
            browser.url(`https://www.fandango.com/${eachTheater.city}_${eachTheater.state}_movietimes`);
            browser.waitForElementVisible('body');
            //browser.assert.containsText('.fd-theater__address-wrap', eachTheater.zip);
            // browser.expect.element('#mainContent').to.be.present; 

            // browser.getTitle(function(title) {
            //     console.log(`${eachPage.description} - ${eachPage.url} - ${title}`);
            // });
            // browser.url(siteUrl + eachPage.url);
            // if (eachPage.titleSearch) {
            //     browser.getTitle(function(title) {
            //         eachPage.titleSearch.split(';').forEach((eachSearch) => {
            //             this.assert.ok(title.includes(eachSearch));

            //         })
            //     });
            // }
            //browser.saveScreenshot(`${screenshotsPath}/${eachPage.url.replace(/\//g, '_').replace(/\?/g, '_')}.png`)
        });

        browser.end();
    }
}
