var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var driver_fx = new webdriver.Builder()
		.forBrowser('firefox')
		.build();

// var driver_saf = new webdriver.Builder()
// 		 .forBrowser('safari')
// 		 .build();

searchTest(driver_fx);
searchTest(driver_chr);
// searchTest(driver_saf);

function searchTest(driver){
	driver.get('https:/devthehuman.github.io/2dobox-pivot');

	driver.sleep(3000).then(function() {
	driver.getTitle().then(function(title) {
		if(title === "IdeaBox") {
			console.log("Test Passed")
		} else {
			console.log("Test Failed")
		}
	});
});

	driver.quit();
}
