const siteSettings = require('../../configs/sites.js');
const siteUrl = `https://${siteSettings.env}.${siteSettings.url}`;

module.exports = {
    tags: ['desktop'], 
    before: function (browser) {
        browser.resizeWindow(1024, 3000);
    },
    'Tribute.ca(Desktop)|Netflix Page': function (browser) {
        browser.url(`${siteUrl}/netflix`);
        browser.getTitle(function(title) {
            this.assert.ok(title.includes("Netflix"));
            });
        browser.end();
    }
}
