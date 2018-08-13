// Required Modules 
////////////////////
const connection = require('../config/database_config.js'); 

// Function that Submits Data Into the Database 
const storeDataIntoTheDatabase = async (data) => {
	let venueId		  = data.venueId; 
	let eventMonth    = data.eventMonth;
	let eventDay      = data.eventDay;
	let eventYear     = data.eventYear;
	let location      = data.location; 
	let eventName     = data.eventName; 
	let imageURL      = data.imageURL; 
	let ticketLink    = data.ticketLink; 

	let queryString = `INSERT INTO events (venueId, eventMonth, eventDay, eventYear, eventName, location, imageURL, ticketLink) 
				       VALUES ('${venueId}', '${eventMonth}', '${eventDay}', '${eventYear}', '${eventName}', '${location}', '${imageURL}', '${ticketLink}')`; 

	try {
		await connection.query(queryString); 
	} catch (err) {
		console.log('Catch Error: ', err); 
	}
}


module.exports = storeDataIntoTheDatabase; 


