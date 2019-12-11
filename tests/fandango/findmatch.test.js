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
            //browser.waitForElementVisible('body');
            //browser.assert.containsText('.fd-theater__address-wrap', eachTheater.zip);
            browser.expect.title().to.contain(`${eachTheater.city}_${eachTheater.state}`.toLowerCase());
            browser.verify.containsText('.fd-showtimes', eachTheater.zip);
            //browser.expect.element('.fd-showtimes').text.to.contain(eachTheater.zip);
            //browser.expect.elements('div.fd-theater__address-wrap').count.to.equal(10);
            //browser.expect.element('.fd-showtimes').to.have.attribute('href').which.contains('/aaron-and-cecile-goldman-theater-aavbj/theater-page');
            // browser.expect.element('#mainContent').to.be.present; 
        });

        browser.end();
    }
}
