// Required Modules 
////////////////////
const request    = require('request-promise'); 
const cheerio    = require('cheerio'); 

const websiteLinkCrawlerFunction = async (venueLinkData) => {

	let linksToScrape   = []; 

	await request(venueLinkData[ 0 ], function(error, response, html){

	      if (!error) {
	      	let $                   = cheerio.load(html);
	      	let eventLinksExtracted = $(venueLinkData[ 1 ]);  
	      	
	      	for(let i = 0; i < eventLinksExtracted.length; i++) {
	      		linksToScrape.push(eventLinksExtracted[ i ].attribs.href);
	      	}     	
	      } 
	 });

	return linksToScrape; 
}	

module.exports = websiteLinkCrawlerFunction; 