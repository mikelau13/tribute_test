const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");
const edgedriver = require("edgedriver");
const geckodriver = require("geckodriver");
const iedriver = require("iedriver");
const SCREENSHOT_PATH = "./screenshots/";
const dateTemp = new Date();
const timeStamp = `${dateTemp.getFullYear()}-${("0" + (dateTemp.getMonth() + 1)).slice(-2)}-${("0" + dateTemp.getDate()).slice(-2)}-${dateTemp.getHours()}${dateTemp.getMinutes()}${dateTemp.getSeconds()}`;

// we use a nightwatch.conf.js file so we can include comments and helper functions
module.exports = {
    "src_folders": [
      "tests"// Where you are storing your Nightwatch tests
    ],
    "output_folder": "./reports/", // reports (test outcome) output by nightwatch
    "page_objects_path": "PageObjects", // page object folder
    "selenium": {
        "start_process": true, // tells nightwatch to start/stop the selenium process
        "server_path": seleniumServer.path,
        "host": "127.0.0.1",
        "port": 4444, // standard selenium port
        "cli_args": {
          "webdriver.chrome.driver" : chromedriver.path,
          "webdriver.edge.driver" : edgedriver.path,
          "webdriver.gecko.driver" : geckodriver.path,
          "webdriver.ie.driver" : iedriver.path
        }
    },
    "test_workers": { // to run different files in parallel
        "enabled": true,
        "workers": 2
    },
    "test_settings": {  // to run in different environment in parallel, example command "-e default,chrome"
        "default": {
            "skip_testcases_on_fail": false,
            "screenshots": {
                "enabled": true, // if you want to keep screenshots
                "path": SCREENSHOT_PATH, // save screenshots here
                "on_failure": true,
                "on_error": true
            },
            "globals": {
                "waitForConditionTimeout": 10000 // sometimes internet is slow so wait.
            },
            "desiredCapabilities": { // use Chrome as the default browser for tests
                "browserName": "chrome"
            }
        },
        "chrome": {
            "desiredCapabilities": {
                "browserName": "chrome",
                "javascriptEnabled": true // turn off to test progressive enhancement
            }
        },
        "firefox": {
          "desiredCapabilities": {
              "browserName": "firefox",
              "javascriptEnabled": true // turn off to test progressive enhancement
          }
        },
        "edge": {
          "desiredCapabilities": {
              "browserName": "MicrosoftEdge",
              "javascriptEnabled": true // turn off to test progressive enhancement
          }
        },
        "ie": {
          "desiredCapabilities": {
              "browserName": "internet explorer",
              "javascriptEnabled": true // turn off to test progressive enhancement
          }
        }                        
    }
}

function padLeft (count) { // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
    return count < 10 ? '0' + count : count.toString();
}

var FILECOUNT = 0; // "global" screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function imgpath (browser) {
    var a = browser.options.desiredCapabilities;
    var meta = [a.platform];
    meta.push(a.browserName ? a.browserName : 'any');
    meta.push(a.version ? a.version : 'any');
    meta.push(a.name); // this is the test filename so always exists.
    var metadata = meta.join('~').toLowerCase().replace(/ /g, '');
    return `${SCREENSHOT_PATH}${timeStamp}/${metadata}_${padLeft(FILECOUNT++)}_`;
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;