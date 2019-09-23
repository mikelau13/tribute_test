const siteSettings = require('../../configs/sites.js');
const siteUrl = `https://${siteSettings.env}.${siteSettings.url}`;

module.exports = {
    tags: ['desktop'], 
    before: function (browser) {
        //browser.resizeWindow(1024, 3000);
    },
    'Tribute.ca(Desktop)|Now Playing Page': function (browser) {
        browser.url(`${siteUrl}/movies/now-playing`);
        browser.getTitle(function(title) {
            this.assert.ok(title.includes("Now Playing"));
            });
        browser.end();
    }
}
