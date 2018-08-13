class EventInfo {
	constructor(venue, venuePhone, venueAddress) {
		this.venue        = venue        || ''; 
		this.venuePhone   = venuePhone   || '';
		this.venueAddress = venueAddress || ''; 
	}

	setEventName(eventName) {
		this.eventName = eventName; 
	}

	setEventDate(eventDate) {
		this.eventDate = eventDate; 
	}

	setTicketLink(ticketLink) {
		this.ticketLink = ticketLink; 
	}

	setImageLink(imageURL) {
		this.imageURL = imageURL;
	}

	getEventDataObject() {
		return {
			eventDate:    this.eventDate, 
			eventName:    this.eventName,
			venue:        this.venue,
			venuePhone:   this.venuePhone, 
			venueAddress: this.venueAddress,
			imageURL: 	  this.imageURL, 
			ticketLink:   this.ticketLink,
		}
	}
}

module.exports = EventInfo; 