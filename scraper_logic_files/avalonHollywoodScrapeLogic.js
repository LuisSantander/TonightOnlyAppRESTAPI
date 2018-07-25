// Required Modules 
////////////////////
const request    = require('request-promise'); 
const cheerio    = require('cheerio'); 

const eventPayload = require('./eventInformationClass'); 


async function getScrapedData(link, callback1, callback2) {

	const payload = new eventPayload(
					    'Avalon Hollywood', 
					    'info@avalonhollywood.com',
					    '1735 Vine St. Hollywood, CA 90028'); 

	await request(link, (err, res, htmlCraweled) => {

		$ = cheerio.load(htmlCraweled); 

  		payload.setArtist($('h2.event-h2').text()); 
  		payload.setDate($('h3.event-h3 time').text()); 
  		payload.setTicketLink(link); 
  		payload.setImageLink($('div.main-image.m-b-5 a')[0].attribs.href);
  	});	

  	return payload.getEventDataObject(); 
}

const scrapeAvalonHollywood = async (callback) => {

	let url = 'https://wl.seetickets.us/AvalonHollywood';
	let links         = []; 
	let eventDataList = []; 

	await request(url, function(error, response, html){
	      if (!error) {
	      	let $         = cheerio.load(html);
	      	let eventList = $('div.button.lrg-btn a');  
	      	
	      	for(let i = 0; i < eventList.length; i++) {
	      		links.push('https://wl.seetickets.us' + eventList[ i ].attribs.href);
	      	}     	
	      } 
	 });

	// Amount of Links to Scrape 
	console.log("Amount of Links to Scrape: ", links.length);

	for (let i = 0; i < links.length; i++) {
		let data = await getScrapedData(links[ i ]); 
		eventDataList.push(data);	
	}

	callback(eventDataList);
}	


module.exports = scrapeAvalonHollywood; 