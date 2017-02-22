var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var driver_fx = new webdriver.Builder()
  .forBrowser('firefox')
  .build();


searchTest(driver_chr);
searchTest(driver_fx);


function searchTest(driver) {
  driver.get('file:///Users/lauraturk/Turing/2dobox-pivot/index.html');
  driver.findElement(By.className('toDo-title')).sendKeys('Testing Title');
  driver.findElement(By.className('toDo-body')).sendKeys('Testing Body');
  driver.findElement(By.className('save-button')).click();

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('current-importance')).getText().then(function(title) {
      if(title === 'normal') {
        console.log('Test Passed');
      } else {
        console.log('Test Failed');
      }
    });
  });
    driver.quit();
  }
