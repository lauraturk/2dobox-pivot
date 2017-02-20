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
  var title = $('.idea-title').val();
  driver.get('https://devthehuman.github.io/2dobox-pivot/');
  driver.findElement(By.className('idea-title')).sendKeys('Testing Title');
  driver.findElement(By.className('idea-body')).sendKeys('Testing Body');
  driver.findElement(By.className('save-button')).click();

  driver.sleep(3000).then(function() {
      if(title === 'Testing Title') {
        console.log('Test Passed');
      } else {
        console.log('Test Failed');
      }
    });
  }

  driver.quit();
}
