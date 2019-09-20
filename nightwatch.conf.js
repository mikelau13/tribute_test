const browserstackKey = require('./keys/browserstack.json');
const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");
const edgedriver = require("edgedriver");
const geckodriver = require("geckodriver");
const iedriver = require("iedriver");
const SCREENSHOT_PATH = "./screenshots/";
const dateTemp = new Date();
const timeStamp = `${dateTemp.getFullYear()}-${("0" + (dateTemp.getMonth() + 1)).slice(-2)}-${("0" + dateTemp.getDate()).slice(-2)}-${dateTemp.getHours()}${dateTemp.getMinutes()}${dateTemp.getSeconds()}`;

// we use a nightwatch.conf.js file so we can include comments and helper functions
nightwatch_config = {
    "src_folders": [
      "tests",
      "tests/showtimes",
      "tests/movies",
      "tests/movies/dvd",
      "tests/netflix"
    ],
    "output_folder": "./reports/", // reports (test outcome) output by nightwatch
    "page_objects_path": "PageObjects", // page object folder
    "selenium": {
        "start_process": false, // for BrowserStack, set to false; otherwise for selenium local, set to true
        "server_path": seleniumServer.path,
        "host": "hub-cloud.browserstack.com", // otheriwse, use 127.0.0.0 for local selenium
        "port": 80, // otherwise, use 4444
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
    "common_capabilities":{
        'name': 'Tribute.ca BrowserStack Tests',
        'browserstack.user': browserstackKey.user,
        'browserstack.key': browserstackKey.key,
        'browserstack.debug': true,
        //'browserstack.console': 'errors', // Console Logs are enabled with log level set to 'errors' by default. To set different log levels, you need to use the capability browserstack.console with values 'disable', 'errors', 'warnings', 'info' or 'verbose'
        'browserstack.networkLogs': true, // Network Logs are disabled by default. To enable Network Logs use the capability browserstack.networkLogs with the value 'true'
        'browserstack.video': true, //  Video recording increases test execution time slightly. 
        'browserstack.local': false, // use this if you want to run on localhost instead of on BrowserStack cloud
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
        },     
        "safari": {
            "launch_url": "localhost",
            "desiredCapabilities": {
              "browserName":"safari"
            },
            "globals": {
              "env": "dev"
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

// Code to copy seleniumhost/port into test settings
for(var i in nightwatch_config.test_settings){
    var config = nightwatch_config.test_settings[i];
    config['selenium_host'] = nightwatch_config.selenium.host;
    config['selenium_port'] = nightwatch_config.selenium.port;
    config['desiredCapabilities'] = config['desiredCapabilities'] || {};
    for(var j in nightwatch_config.common_capabilities){
      config['desiredCapabilities'][j] = config['desiredCapabilities'][j] || nightwatch_config.common_capabilities[j];
    }
  }
  
module.exports = nightwatch_config;
module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;