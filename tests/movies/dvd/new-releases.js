const siteSettings = require('../../../configs/sites.js');
const siteUrl = `https://${siteSettings.env}.${siteSettings.url}`;

module.exports = {
    tags: ['desktop'], 
    before: function (browser) {
        browser.resizeWindow(1024, 3000);
    },
    'Tribute.ca(Desktop)|DVD Page': function (browser) {
        browser.url(`${siteUrl}/movies/dvd/new-releases`);
        browser.getTitle(function(title) {
            this.assert.ok(title.includes("DVD"));
            });
        browser.end();
    }
}
