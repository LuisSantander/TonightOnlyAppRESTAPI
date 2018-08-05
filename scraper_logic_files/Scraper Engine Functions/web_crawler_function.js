// Required Modules 
////////////////////
// const request    = require('request-promise'); 
const phantom    = require('phantom'); 
const cheerio    = require('cheerio'); 

const websiteLinkCrawlerFunction = async (venueData) => {

	let linksToScrape   = []; 
	let expression = "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?";
	let regex = new RegExp(expression);

	// PhantomJS Logic 
	const phantomInstance = await phantom.create(); 
	const page		      = await phantomInstance.createPage(); 
	const result 		  = await page.open(venueData[ 0 ]); 

	if (result !== 'fail') {
		try {
			const content             = await page.property('content'); 
			const $ 	              = cheerio.load(content); 

			const eventLinksExtracted = $(venueData[ 1 ]);  
			
			for (let i = 0; i < eventLinksExtracted.length; i++) {
				linksToScrape.push(eventLinksExtracted[ i ].attribs.href); 
			}

			linksToScrape = linksToScrape.filter((link) => link.match(regex));

		} catch (err) {
			console.log(err);
		}
	} else {
		// If failed to load page pass on error to linkscrape
		linksToScrape.push('fail'); 
	}

	// Close the phantomJS instance before returning 
	await phantomInstance.exit(); 

	return linksToScrape; 
}	

module.exports = websiteLinkCrawlerFunction; 