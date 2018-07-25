// Required Modules 
////////////////////
const request    = require('request-promise'); 
const cheerio    = require('cheerio'); 

const eventPayload = require('./eventInformationClass'); 


async function getScrapedData(link, callback1, callback2) {

	const payload = new eventPayload(
					    'Time Night Club', 
					    '949.722.7103',
					    '1875 Newport Blvd. Suite B245 Costa Mesa, CA 92627'); 

	await request(link, (err, res, htmlCraweled) => {

		$ = cheerio.load(htmlCraweled); 

  		payload.setArtist($('h1.tribe-events-single-event-title').text()); 
  		payload.setDate($('abbr.tribe-events-abbr')[ 0 ].attribs.title); 
  		payload.setTicketLink($('dd.tribe-events-event-url a').text()); 
  		payload.setImageLink($('div.tribe-events-event-image img')[0].attribs.src);
  	});	

  	return payload.getEventDataObject(); 
}

const scrapeTimeNightClub = async (callback) => {

	let url = 'http://timenightclub.com/events/';
	let links         = []; 
	let eventDataList = []; 

	await request(url, function(error, response, html){
	      if (!error) {
	      	let $         = cheerio.load(html);
	      	let eventList = $('a.tribe-event-url');  
	      	
	      	for(let i = 0; i < eventList.length; i++) {
	      		links.push(eventList[ i ].attribs.href);
	      	}     	
	      } 
	 });

	console.log(links);

	// Amount of Links to Scrape 
	console.log("Amount of Links to Scrape: ", links.length);

	for (let i = 0; i < links.length; i++) {
		let data = await getScrapedData(links[ i ]); 
		eventDataList.push(data);	
	}

	// Test Data for Scraping 
	// let data = await getScrapedData(links[ 0 ]); 
	// eventDataList.push(data);	

	callback(eventDataList);
}	


module.exports = scrapeTimeNightClub; 