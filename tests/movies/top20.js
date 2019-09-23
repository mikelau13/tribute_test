const siteSettings = require('../../configs/sites.js');
const siteUrl = `https://${siteSettings.env}.${siteSettings.url}`;

module.exports = {
    tags: ['desktop'], 
    before: function (browser) {
        //browser.resizeWindow(1024, 3000);
    },
    'Tribute.ca(Desktop)|Top 20 Page': function (browser) {
        browser.url(`${siteUrl}/movies/top20`);
        browser.getTitle(function(title) {
            this.assert.ok(title.includes("Top 20"));
            });
        browser.end();
    }
}
