// Required Modules 
////////////////////
const connection = require('../../server'); 
const dateFormat = require('dateformat'); 


// Function that Submits Data Into the Database 
const submitIntoDatabase = async (data) => {

	let convertedDate = new Date(data.eventDate); 
	let eventMonth    = dateFormat(convertedDate, 'mmmm');
	let eventDay      = dateFormat(convertedDate, 'dd');
	let eventYear     = dateFormat(convertedDate, 'yyyy');
	let location      = data.venue; 
	let eventName     = data.eventName; 
	let imageURL      = data.imageURL; 
	let ticketLink    = data.ticketLink; 

	let query = `INSERT INTO events (eventMonth, eventDay, eventYear, eventName, location, imageURL, ticketLink) 
				 VALUES ('${eventMonth}', '${eventDay}', '${eventYear}', '${eventName}', '${location}', '${imageURL}', '${ticketLink}')`; 

	try {
		await connection.query(query); 
	} catch (err) {
		console.log(err); 
	}
}


module.exports = submitIntoDatabase; 


