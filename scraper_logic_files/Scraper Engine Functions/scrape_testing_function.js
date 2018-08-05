//////////////////////////////////////////////////////////
// Scraper Testing Function 
// -------------------------------------------------------

// Required Modules 
//////////////////////////////////
const phantom    = require('phantom'); 
const cheerio    = require('cheerio'); 

// Imported Functions and Classes 
//////////////////////////////////
const eventPayload      = require('../Scraper Engine Classes/eventInformationClass'); 
const storeIntoDatabase = require('../Scraper Engine Functions/store_into_db_function'); 

const getScrapedData = async (url, venueName, venuePhoneNumber, venueAddress) => {
	// PhantomJS Logic 
	const phantomInstance = await phantom.create(); 
	const page		      = await phantomInstance.createPage(); 
						    await page.on('onLoadFinished', () => {});
	const result 		  = await page.open(url); 

	const payload = new eventPayload(
					    venueName, 
					    venuePhoneNumber,
					    venueAddress); 

	console.log('URL being scraped: ', url); 

	if (result !== 'fail') {

		const content = await page.property('content'); 
		const $	 	  = cheerio.load(content); 

		console.log($('div'));


	

	} else {
		// if made it this far something failed with loading the url 
	}


	phantomInstance.exit(); 

	return payload; 
}

const scrapeTestingFunction = async (linksToScrape, venueName, venuePhoneNumber, venueAddress) => {

	console.log("Amount of Links to Scrape: ", linksToScrape.length);
	console.log('Venue Name: ', venueName);

	let data = await getScrapedData(linksToScrape[ 3 ], venueName, venuePhoneNumber, venueAddress);

	// console.log(data); 

	// for (let i = 0; i < linksToScrape.length; i++) {
		// let data = await getScrapedData(linksToScrape[ i ], venueName, venuePhoneNumber, venueAddress);

		// Test Console Logout
		// --------------------
		// console.log(data)
		// --------------------
	// Store The Data Extracted into the Database 
	// await storeIntoDatabase(data); 
	// }
}	






module.exports = scrapeTestingFunction;
// -------------------------------------------------------
