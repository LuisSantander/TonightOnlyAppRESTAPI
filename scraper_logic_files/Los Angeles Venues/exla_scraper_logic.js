// Required Modules 
////////////////////
const request    = require('request-promise'); 
const cheerio    = require('cheerio'); 



//////////////////////////////////////////////////////////
// Scraper Logic for ExchangeLA 
// -------------------------------------------------------

async function getScrapedData(link, callback1, callback2) {
	const payload = {
			artist: '',
			venue: '',
			date: '',
			ticketLink: '',
			bottleServiceNumber: '213.444.3388',
			venueEmail: 'vip@exchangela.com'
	};

	await request(link, (err, res, htmlCraweled) => {

		$ = cheerio.load(htmlCraweled); 

  		payload.artist      = $('div.two-third-block p span a').first().text();
  		payload.ticketLink  = $('.event-ticket a')[ 0 ].attribs.href;
  		payload.venue       = $('.event-venue').text();
  		payload.date        = $('.event-date strong').text();

  	});	

  	return payload; 
}




const scrapeExchangeLA = async (callback) => {

	let url = 'http://exchangela.com/events/';
	let links         = []; 
	let eventDataList = []; 

	await request(url, function(error, response, html){
	      if (!error) {
	      	let $         = cheerio.load(html);
	      	let eventList = $('.carousel-hover-title h3 a');  
	      	
	      	for(let i = 0; i < eventList.length; i++) {
	      		links.push(eventList[ i ].attribs.href);
	      	}	      	
	      } 
	 });

	// Amount of Links to Scrape from Exchange LA 
	console.log("Amount of Links to Scrape: ", links.length);

	for (let i = 0; i < links.length; i++) {
		let data = await getScrapedData(links[ i ]); 
		eventDataList.push(data);	
	}




	callback(eventDataList);
}	



module.exports = { scrapeExchangeLA }; 