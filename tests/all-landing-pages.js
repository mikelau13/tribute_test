const siteSettings = require('../configs/sites.js');
const siteUrl = `https://${siteSettings.env}.${siteSettings.url}`;

module.exports = {
    tags: ['desktop'], 
    before: function (browser) {

    },
    'Tribute.ca(Desktop)|Homepage': function (browser) {
        browser.url(siteUrl);
        browser.getTitle(function(title) {
            this.assert.ok(title.includes("Tribute.ca"));
            });
    },
    /* 
     * /showtimes/ 
     */
    'Tribute.ca(Desktop)|Showtimes Index Page': function (browser) {
        browser.url(`${siteUrl}/showtimes/`);
        browser.getTitle(function(title) {
            this.assert.ok(title.includes("Showtimes"));
            });
    },
    'Tribute.ca(Desktop)|Showtimes Postal Code Page': function (browser) {
        browser.url(`${siteUrl}/showtimes/postalcode/M5V2P4/`);
        browser.getTitle(function(title) {
            this.assert.ok(title.includes("Showtimes"));
        });
    },
    // 'Tribute.ca(Desktop)|Search Showtimes by theatre Page': function (browser) {
    //     browser.url(`${siteUrl}/showtimes/find/cineplex/`);
    //     browser.getTitle(function(title) {
    //         this.assert.ok(title.includes("Showtimes"));
    //         });
    // },
    'Tribute.ca(Desktop)|Province List Page': function (browser) {
        browser.url(`${siteUrl}/showtimes/province/`);
        browser.getTitle(function(title) {
            this.assert.ok(title.includes("Showtimes"));
            this.assert.ok(title.includes("Province"));
        });
    },
    'Tribute.ca(Desktop)|City list by Province Page': function (browser) {
        browser.url(`${siteUrl}/showtimes/ontario/`);
        browser.getTitle(function(title) {
            this.assert.ok(title.includes("Showtimes"));
            this.assert.ok(title.includes("Ontario"));
        });
    },
    /* 
     * /movies/ 
     */
    'Tribute.ca(Desktop)|Coming Soon Page': function (browser) {
        browser.url(`${siteUrl}/movies/coming-soon`);
        browser.getTitle(function(title) {
            this.assert.ok(title.includes("Coming Soon"));
            });
    },
    'Tribute.ca(Desktop)|Now Playing Page': function (browser) {
        browser.url(`${siteUrl}/movies/now-playing`);
        browser.getTitle(function(title) {
            this.assert.ok(title.includes("Now Playing"));
            });
    },
    'Tribute.ca(Desktop)|Posters Page': function (browser) {
        browser.url(`${siteUrl}/movies/posters`);
        browser.getTitle(function(title) {
            this.assert.ok(title.includes("Posters"));
            });
    },
    'Tribute.ca(Desktop)|Top 20 Page': function (browser) {
        browser.url(`${siteUrl}/movies/top20`);
        browser.getTitle(function(title) {
            this.assert.ok(title.includes("Top 20"));
            });
    },
    'Tribute.ca(Desktop)|DVD Page': function (browser) {
        browser.url(`${siteUrl}/movies/dvd/new-releases`);
        browser.getTitle(function(title) {
            this.assert.ok(title.includes("DVD"));
            });
    },
    'Tribute.ca(Desktop)|Netflix Page': function (browser) {
        browser.url(`${siteUrl}/netflix`);
        browser.getTitle(function(title) {
            this.assert.ok(title.includes("Netflix"));
            });
        browser.end();
    },
}
