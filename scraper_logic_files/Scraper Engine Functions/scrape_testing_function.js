//////////////////////////////////////////////////////////
// Scraper Logic for Time Night Club - Orange County, CA 
// -------------------------------------------------------

// Required Modules 
//////////////////////////////////
const request    = require('request-promise'); 
const cheerio    = require('cheerio'); 

// Imported Functions and Classes 
//////////////////////////////////
const eventPayload      = require('../Scraper Engine Classes/eventInformationClass'); 
const storeIntoDatabase = require('../Scraper Engine Functions/store_into_db_function'); 

const getScrapedData = async (link, venueName, venuePhoneNumber, venueAddress) => {

	console.log(venueName);

	const payload = new eventPayload(
					    venueName, 
					    venuePhoneNumber,
					    venueAddress); 

	await request(link, (err, res, htmlCraweled) => {

		$ = cheerio.load(htmlCraweled);

		// Testing
		// ----------------
		// console.log($('div.event-images-box').find('img').first()[ 0 ].attribs.src);
		// ---------------- 
		payload.setEventName($('div.event-bar-left').find('h2.event-h2').first().text().trim());
		payload.setEventDate($('div.event-bar-left').find('h3.event-h3').first().text().trim()); 
		payload.setTicketLink(link); 
		payload.setImageLink($('div.event-images-box').find('img').first()[ 0 ].attribs.src);
  	});	

  	return payload.getEventDataObject(); 
}

const scrapeTestingFunction = async (linksToScrape, venueName, venuePhoneNumber, venueAddress) => {

	console.log("Amount of Links to Scrape: ", linksToScrape.length);

	// console.log('Link to Scrape: ', linksToScrape[ 0 ]); 

	// let data = await getScrapedData('https://wl.seetickets.us' + linksToScrape[ 0 ], venueName, venuePhoneNumber, venueAddress);

	for (let i = 0; i < linksToScrape.length; i++) {
		let data = await getScrapedData('https://wl.seetickets.us' + linksToScrape[ i ], venueName, venuePhoneNumber, venueAddress);

		// Test Console Logout
		// --------------------
		console.log(data);
		// --------------------
	// Store The Data Extracted into the Database 
	// await storeIntoDatabase(data); 
	}
}	

module.exports = scrapeTestingFunction;
// -------------------------------------------------------
