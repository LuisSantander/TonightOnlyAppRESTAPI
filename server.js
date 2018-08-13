// Tonight Only App REST Server Backend 
// -------------------------------------------
const express 		= require('express'); 
const bodyParser    = require('body-parser');
const dateFormat    = require('dateformat'); 
const app     		= express(); 
// -------------------------------------------
// Initial Conditions 
const PORT = process.env.PORT || 3000;
// -------------------------------------------

// Get Database MYSQL pool 
// -------------------------------------------
const pool = require('./config/database_config');

// Imported Scraper Logic 
// const runScraperEngine = require('./scraper_logic_files/master_scraper_engine'); 
const getLosAngelesEvents = require('./api/eventbrite_aggregation_engine'); 

// REST API Keys and Database Configuration
// --------------------------------------
const secret = require ('./config/dev_keys.js'); 

// -------------------------------------------
// Middleware
app.use(bodyParser.json());
// -------------------------------------------

///////////////////////////////////////////////////////////////////////// 
/////////  GET Requests 
app.get('/get_event_data', async (req, res, next) => {

	const status = await getLosAngelesEvents(); 
	res.send(status); 
});

// Gets the specified venue data for 
app.post('/get_venue_events', (req, res, next) => { // change to app.post for axios 

	const { venueId } = req.body; 

	// Do the Database Abstraction Work Here 
	// ---------------------
	pool.getConnection(function(err, connection) {
		  if (err) throw err; // not connected!

		  const eventsQueryString = `SELECT eventMonth, eventDay, eventYear, eventName FROM events WHERE events.venueId="${venueId}" 
		  					         AND (events.eventMonth="August" OR events.eventMonth="September") ORDER BY events.eventMonth`;

		  const getVenueInfoQueryString = `SELECT * FROM venues WHERE venues.id=${venueId}`;

		  // Use the connection
		  connection.query(eventsQueryString, function (error, results, fields) {
		    // Handle error after the release.
		    if (error) {
		    	console.log(error); 
		    	res.send({data: [{error: 'Database Error: Cant connect'}]});
		    }

		  	// Construct payload for the client 
		    const payload = [
		    	{
		    		eventMonth: 'August',
		    		eventYear: '2018',
		    		events: []
		    	},
		    	{
		    		eventMonth: 'September',
		    		eventYear: '2018',
		    		events: []
		    	}
		    ]

		    // When done with the connection, release it.
		    connection.release(); 

		   	results.map((event) => {

		   		const formattedDate = dateFormat(`${event.eventMonth} ${event.eventDay} ${event.eventYear}`, 'mmm. dS')

		    	if (event.eventMonth === "August") {
		    		payload[ 0 ].events.push(`${formattedDate} - ${event.eventName}`); 
		    	} else {
		    		payload[ 1 ].events.push(`${formattedDate} - ${event.eventName}`); 
		    	}
		    });

		   	connection.query(getVenueInfoQueryString, function(error, results, fields) {

		   		res.send({venueEvents: payload, venueInfo: results[ 0 ]});  
		   	});

		  });
	});
	// ---------------------
});

// -------------------------------------------
// Activate Server Engine 
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

/////////////////////
// Previous Logic 
// GET Routes 
// app.get('/scrape', async (req, res, next) => {
// 	let status = ''; 
// 	// await runScraperEngine('timeoc', () => status = 'ok'); 
// 	// await runScraperEngine('sound', () => status = 'ok'); 
// 	// await runScraperEngine('avalon', () => status = 'ok'); 
// 	// await runScraperEngine('exla', () => status = 'ok'); 
// 	await runScraperEngine('academy', () => status = 'ok'); 

// 	res.send({status});
// });