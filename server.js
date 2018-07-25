// Tonight Only App REST Server Backend 
// -------------------------------------------
const express 		= require('express'); 
const bodyParser    = require('body-parser');
const mysql 		= require('mysql'); 
const dateFormat    = require('dateformat'); 
const app     		= express(); 
// -------------------------------------------
// Initial Conditions 
const PORT = process.env.PORT || 3000;
// -------------------------------------------
// Imported Stuff 
const artistDataList               = require('./artist_data/august_data'); 
const { scrapeExchangeLA, scrape } = require('./scraper_logic_files/scraperEngineFunctions'); 
const scrapeTimeNightClub          = require('./scraper_logic_files/timeOCScrapeLogic'); 

// REST API Keys 
// --------------------------------------
const secret = require ('./config/dev_keys.js'); 

// Test

// Connect to MySQL Database 
// --------------------------------------
const connection = mysql.createConnection({
					host     : secret.MYSQL_DEV_HOST,
					user     : secret.MYSQL_DEV_USER,
					password : secret.MYSQL_DEV_PASS,
					database : secret.MYSQL_DEV_DB
				});

connection.connect((err) => {

	if(err) {
		console.log('error 1: mysql error connecting: ' + err.stack); 
		return; 
	}

	console.log('connected as id ' + connection.threadId);
});

connection.query('USE tonight_only_db');

// -------------------------------------------
// Middleware
app.use(bodyParser.json());
// -------------------------------------------
// GET Routes 
app.get('/api', (req, res, next) => {
	// Send the API Data Endpoint
	res.send(artistDataList); 
});


const submitIntoDatabase = async (data) => {

	
	for(let i = 0; i < data.length; i++) {

		let convertedDate = new Date(data[ i ].date); 
		let eventMonth    = dateFormat(convertedDate, 'mmmm');
		let eventDay      = dateFormat(convertedDate, 'dd');
		let eventYear     = dateFormat(convertedDate, 'yyyy');
		let location      = data[ i ].venue; 
		let artist        = data[ i ].artist; 

		let query = `INSERT INTO events (eventMonth, eventDay, eventYear, location, artist) 
					 VALUES ('${eventMonth}', '${eventDay}', '${eventYear}', '${location}', '${artist}')`; 

		await connection.query(query); 
	}
}

app.get('/scrape', async (req, res, next) => {

	const venueData = {
		exchangeLA: null,
		avalonHollywood: null,
		timeNightClub: null,
	}

	// await scrapeExchangeLA(data => venueData['exchangeLA'] = data);
	await scrapeTimeNightClub(submitIntoDatabase); 

	// res.send({status: "success", venueData});
	res.send({status: "success"});
});


app.get('/dummy_data', (req, res, next) => {

	    const listOfEvents = [{month: 'August 2018', 
 					   events: ['Aug. 4th | Hard Summer 2018 ',
 					   		  'Aug. 10th  | Timmy Trumpet at Academy LA',
 					   		  'Aug. 11th  | Borgeous at Exchange LA'
 					   		  ]
 					   },
 					   {
 					   	month: 'September 2018',
 					   	events: [ 'Sept. 1st – Ookay at the Fonda Theatre',
 					   			'Sept. 2nd – Nervo at Academy LA',
 					   			'Sept. 14th – Nocturnal Wonderland 2018 at Glen Helen Regional Park'
 					    ]}
 		];

 		res.send({events: listOfEvents}); 
});

app.get('/get_all_events', (req, res, next) => {

	const query = 'SELECT * FROM events WHERE eventMonth="July"'; 

	connection.query(query, (err, rows) => {

		let listOfEvents = [{
			month: 'July 2018',
			events: [] 
		}];

		if (!err) {
			
			// Format The Date 
			for (let i = 0; i < rows.length; i++) {
				let { eventMonth, eventDay, eventYear, location, artist } = rows[ i ]; 
				let eventFullDate = `${eventMonth} ${eventDay}, ${eventYear}`;
				eventFullDate = dateFormat(new Date(eventFullDate), "ddd. mmmm dS yyyy"); 

				listOfEvents[ 0 ].events.push(eventFullDate + ' | ' + artist + ' @ ' + location);
			}	

		 	res.send({status: "success", events: listOfEvents});

		} else {
			console.log(err); 
			res.send({status: "Something Went Wrong", events: []}); 
		}
	})
});



// -------------------------------------------
// POST Routes 



// -------------------------------------------
// Activate Server Engine 
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));