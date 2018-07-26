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
// Imported Scraper Logic 
const runScraperEngine = require('./scraper_logic_files/master_scraper_engine'); 

// REST API Keys and Database Configuration
// --------------------------------------
const secret = require ('./config/dev_keys.js'); 

// Connect to MySQL Database 
// --------------------------------------
const connection = mysql.createConnection({
					host     : secret.MYSQL_DEV_HOST,
					user     : secret.MYSQL_DEV_USER,
					password : secret.MYSQL_DEV_PASS,
					database : secret.MYSQL_DEV_DB
				});

// connection.connect((err) => {

// 	if(err) {
// 		console.log('error 1: mysql error connecting: ' + err.stack); 
// 		return; 
// 	}

// 	console.log('connected as id ' + connection.threadId);
// });

// connection.query('USE tonight_only_db');

// -------------------------------------------
// Middleware
app.use(bodyParser.json());
// -------------------------------------------
// GET Routes 
app.get('/scrape', async (req, res, next) => {
	let status = ''; 
	// await runScraperEngine('timeoc', () => status = 'ok'); 
	// await runScraperEngine('sound', () => status = 'ok'); 
	await runScraperEngine('avalon', () => status = 'ok'); 

	res.send({status});
});

app.get('/get_all_events', (req, res, next) => {

	const query = 'SELECT * FROM events WHERE eventMonth="July"'; 

	// Query The Database 
	connection.query(query, (err, rows) => {

		let listOfEvents = [{
			month: 'July 2018',
			events: [] 
		}];

		if (!err) {
			// Format The Date 
			for (let i = 0; i < rows.length; i++) {
				let { eventMonth, eventDay, eventYear, location, eventName } = rows[ i ]; 
				let eventFullDate = `${eventMonth} ${eventDay}, ${eventYear}`;
				eventFullDate = dateFormat(new Date(eventFullDate), "ddd. mmmm dS yyyy"); 

				listOfEvents[ 0 ].events.push(eventFullDate + ' - ' + eventName + ' @ ' + location);
			}	

		 	res.send({status: "success", events: listOfEvents});

		} else {
			console.log(err); 
			res.send({status: "Something Went Wrong", events: []}); 
		}
	})
});

// -------------------------------------------
// Activate Server Engine 
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

// Expose Dependant Modules to Other Files 
// -------------------------------------------
module.exports = connection; 