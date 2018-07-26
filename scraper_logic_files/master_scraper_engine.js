// Required Modules 
////////////////////
const websiteLinkCrawlerFunction = require('./Scraper Engine Functions/web_crawler_function'); 

// Used for Testing Scrape Data 
const scrapeTesting = require('./Scraper Engine Functions/scrape_testing_function'); 

const venueLinkData = {
	avalon: ['https://wl.seetickets.us/AvalonHollywood', 'div.button.lrg-btn a', 'Avalon Hollywood', 'Phone', 'Address'],
	timeoc: ['http://timenightclub.com/events/', 'a.tribe-event-url'],
	sound:  ['https://www.soundnightclub.com/', 'div.event a']
}

const runScraperEngine = async (venueChosen, callback) => {
	let linksToScrape = await websiteLinkCrawlerFunction(venueLinkData[ venueChosen ]); 

	// Console out links for testing 
	// -----------------------------
	// console.log(linksToScrape); 
	// -----------------------------

	switch (venueChosen) {
		case 'avalon':
			await require('./Los Angeles Venues/avalon_scraper_logic')(linksToScrape, venueLinkData[venueChosen][2], venueLinkData[venueChosen][3], venueLinkData[venueChosen][4]);
			break;
		case 'sound':
			await scrapeTesting(linksToScrape, venueLinkData[ 2 ], venueLinkData[ 3 ], venueLinkData[ 4 ]); 
			break; 
		case 'timeoc':
			await require('./Los Angeles Venues/time_scraper_logic')(linksToScrape);
			break;
		default:
			break; 
	}

	callback();  
}



module.exports = runScraperEngine;