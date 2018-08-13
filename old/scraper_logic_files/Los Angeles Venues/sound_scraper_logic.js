//////////////////////////////////////////////////////////
// Scraper Logic for Sound Night Club - Hollywood, CA 
// -------------------------------------------------------

// Required Modules 
//////////////////////////////////
const request    = require('request-promise'); 
const cheerio    = require('cheerio'); 

// Imported Functions and Classes 
//////////////////////////////////
const eventPayload      = require('../Scraper Engine Classes/eventInformationClass'); 
// const storeIntoDatabase = require('../Scraper Engine Functions/store_into_db_function'); 

const getScrapedData = async (link) => {

	const payload = new eventPayload(
					    'Sound Night Club', 
					    '323.962.9000',
					    '1642 N. Las Palmas Ave, Los Angeles, CA 90028'); 

	await request(link, (err, res, htmlCraweled) => {

		$ = cheerio.load(htmlCraweled); 

		payload.setEventName($('div.listing-hero-body').children().first().text());
		payload.setEventDate($('time.clrfix').children().first().text()); 
		payload.setTicketLink(link); 
		payload.setImageLink($('picture')[ 0 ].attribs.content);
  	});	

  	return payload.getEventDataObject(); 
}

const scrapeSoundNightClub = async (linksToScrape) => {

	console.log("Amount of Links to Scrape for Sound Night Club: ", 7);

	for (let i = 0; i < 7; i++) {
		let data = await getScrapedData(linksToScrape[ i ]); 

		// Store The Data Extracted into the Database 
		// await storeIntoDatabase(data); 
	}
}	