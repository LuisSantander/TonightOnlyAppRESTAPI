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

const getScrapedData = async (link) => {

	const payload = new eventPayload(
					    'Time Night Club', 
					    '949.722.7103',
					    '1875 Newport Blvd. Suite B245 Costa Mesa, CA 92627'); 

	await request(link, (err, res, htmlCraweled) => {

		$ = cheerio.load(htmlCraweled); 

  		payload.setEventName($('h1.tribe-events-single-event-title').text()); 
  		payload.setEventDate($('abbr.tribe-events-abbr')[ 0 ].attribs.title); 
  		payload.setTicketLink($('dd.tribe-events-event-url a').text()); 
  		payload.setImageLink($('div.tribe-events-event-image img')[0].attribs.src);
  	});	

  	return payload.getEventDataObject(); 
}

const scrapeTimeNightClub = async (linksToScrape) => {

	console.log("Amount of Links to Scrape: ", linksToScrape.length);

	for (let i = 0; i < linksToScrape.length; i++) {
		let data = await getScrapedData(linksToScrape[ i ]); 

		// Store The Data Extracted into the Database 
		await storeIntoDatabase(data); 
	}
}	

module.exports = scrapeTimeNightClub; 
// -------------------------------------------------------
