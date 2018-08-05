//////////////////////////////////////////////////////////
// Eventbrite API Logic for Los Angeles Events  
// -------------------------------------------------------
// Required Modules 
//////////////////////////////////
const request                   = require('request-promise'); 
const dateFormat                = require('dateformat'); 

const { EVENTBRITE_API_KEY }    = require('../config/dev_keys'); 
const storeDataIntoTheDatabase  = require('./store_into_db_function'); 

// Los Angeles Promoting group id's
const promotingGroupIds = {
	'Academy':       '17291335966',
	// 'Exchange LA':   '17588567121'
};

const venueIds = {
	'24829018': 'Academy',
	'25852648': 'Exchange LA',
};

// Eventbrite URL 
const eventBriteURL = 'https://www.eventbriteapi.com/v3'; 

const getVenueNameIfNotInVenueIds = async (venue_id) => {

	const queryAPIString = `${eventBriteURL}/venues/${venue_id}/?token=${EVENTBRITE_API_KEY}`; 

	try {
		const obj    = await request(queryAPIString); 
		const result = JSON.parse(obj);

		venueIds[ venue_id ] = result.name; 

		return result.name; 

	} catch (err) {
		console.log(err); 

		return ''; 
	}
};

const getVenueData = async (venue_id) => {

	if (!venueIds[ venue_id ]) {
		const name = await getVenueNameIfNotInVenueIds(venue_id); 
		return name; 
	}

	return venueIds[ venue_id ]; 
}; 

// Creates Object Payload to be prepared to store into the database. 
const createEventPayloadToStoreToDB = async (event) => {

	let convertedDate = new Date(event.start.local); 
	let location 	  = await getVenueData(event.venue_id);

	return {
		venueId: 	event.venue_id,
		eventMonth: dateFormat(convertedDate, 'mmmm'),
		eventDay:   dateFormat(convertedDate, 'dd'),
		eventYear:  dateFormat(convertedDate, 'yyyy'),
		eventName:  event.name.text,
		location:   location,  
		imageURL:   event.logo.url,
		ticketLink: event.url
	};
};

const getLosAngelesEvents = async () => {
	// Master compiled event list in order to store into the database 
	let losAngelesEvents = []; 
	
	// Get date formatted for API call
	const isoDate = dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM:ss");

	try {
		
		// Iterate through the promoting group id's 
		for (let id in promotingGroupIds) {

			// Do API call to the Eventbrite API 
			const queryAPIString = `${eventBriteURL}/organizers/${promotingGroupIds[id]}/events/?order_by=start_asc&start_date.range_start=${isoDate}&token=${EVENTBRITE_API_KEY}`
			const result 		 = JSON.parse(await request(queryAPIString)); 

			// Get Events Array for specific venue 
			const { events } = result; 

			// Iterate through all the events in los angeles

			for (let i = 0; i < events.length; i++) {
				const payload = await createEventPayloadToStoreToDB(events[ i ]);
				losAngelesEvents.push(payload);
			}
		}

	} catch (err) {
		console.log(err); 
	}

	// Store Events into the Database 
	for (let i = 0; i < losAngelesEvents.length; i++) {
		await storeDataIntoTheDatabase(losAngelesEvents[ i ]); 
	}

	return 'success'; 
};	

module.exports = getLosAngelesEvents; 