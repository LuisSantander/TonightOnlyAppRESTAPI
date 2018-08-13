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

	const payload = new eventPayload(
					    venueName, 
					    venuePhoneNumber,
					    venueAddress); 

	await request(link, (err, res, htmlCraweled) => {

		$ = cheerio.load(htmlCraweled);

		payload.setEventName($('div.event-title').find('a').text().trim());
		payload.setEventDate($('div.event-date').find('strong').text().trim()); 
		payload.setTicketLink($('div.event-ticket').find('a')[ 0 ].attribs.href); 
		payload.setImageLink($('div.one-third-block').find('img').first()[ 0 ].attribs.src);
  	});	

  	return payload.getEventDataObject(); 
}

const scrapeTestingFunction = async (linksToScrape, venueName, venuePhoneNumber, venueAddress) => {

	for (let i = 0; i < linksToScrape.length; i++) {
		let data = await getScrapedData(linksToScrape[ i ], venueName, venuePhoneNumber, venueAddress);

		// Test Console Logout
		// --------------------
		console.log(data)
		// --------------------
	// Store The Data Extracted into the Database 
	// await storeIntoDatabase(data); 
	}
}	

module.exports = scrapeTestingFunction;
// -------------------------------------------------------
