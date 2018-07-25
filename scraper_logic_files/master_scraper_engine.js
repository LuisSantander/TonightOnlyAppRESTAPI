// Required Modules 
////////////////////
const websiteLinkCrawlerFunction = require('./Scraper Engine Functions/web_crawler_function'); 

const venueLinkData = {
	avalon: ['', ''],
	exla:   ['', ''], 
	timeoc: ['http://timenightclub.com/events/', 'a.tribe-event-url']
}

const runScraperEngine = async (venueChosen, callback) => {
	let linksToScrape = await websiteLinkCrawlerFunction(venueLinkData[ venueChosen ]); 

	switch (venueChosen) {
		case 'timeoc':
			await require('./Los Angeles Venues/time_scraper_logic')(linksToScrape);
			break;
		default:
			break; 
	}

	callback();  
}



module.exports = runScraperEngine;