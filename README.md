## Nightwatch Test Automation for Tribute.ca

### Installation

To install
```
npm install
```

note: I got error message when doing npm install, I needed to install pend first
```
npm install pend
```


### Key files
You will need the keys to run, the keys are in the ./keys/ and not committed to github for security resason.


### Basic Commands to Start

To execute all testes
```
npm run test
```

To execute a selected test file
```
npm run test  --test tests\xxxx.js
```

Test cases are in the /tests/ folder.

---
### Browsers

Chrome is the default browser, however if you want to execute in a different browser:
```
npm run test --env firefox
```

The available environments are: chrome, firefox, ie, edge, safari

Note: Safari has to be on Mac, need to check BrowserStack.com about how to run.


---
### Breakpoints

To execute only a specified breakpoint, for example

```
"node_modules/.bin/nightwatch" --config nightwatch.conf.js --tag mobile
```

Available breakpoints are: desktop, mobile


Note: I don't know why "npm run test --tag xxxxx" doesn't work

Note: In the future, we can look into other arguments such that "--skiptags"


---
### Programming Practices

**Page Object**

To read more about page objects:

http://nightwatchjs.org/guide/#page-objects

https://martinfowler.com/bliki/PageObject.html

https://www.codementor.io/johnkennedy/e2e-testing-with-nightwatch-part-three-bzpnspxfn


Please put the page objects in folder /PageObjects/


**Other Guidelines**

Please do not hardcode Url in your test cases, instead, use something like this
```
'https://' + sites.env + '.' + sites.url + sites.movie_trailer[movie_i]
```


---
## Important Settings

**Configuration File**

nightwatch.config.js, /configs/sites.js


**Screenshots**

nightwatch.config.js->test_settings->default->screenshots

Screenshots are configured to be saved in the /screenshots/ folder.


**Sub-domain**

For you to configure which deployment environment to run the automation: examples are "dev", "v7.prod", "w5"

sites.js->env




Logs/reports are in the /reports/ folder.

---

**BrowserStack Integration**

To run local runner, first enable it in nightwatch.config.js:
```
'browserstack.local': true,
```

Then run command line:
```
node ./scripts/local.runner.js -c nightwatch.config.js
```

The keys are in the ./keys/browserstack.json, not commited to github.