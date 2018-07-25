


class EventInfo {
	constructor(venue, venueEmail, venueAddress) {
		this.venue        = venue        || ''; 
		this.venueEmail   = venueEmail   || ''; 
		this.venueAddress = venueAddress || ''; 
	}

	setArtist(artist) {
		this.artist = artist; 
	}

	setDate(date) {
		this.date = date; 
	}

	setTicketLink(ticketLink) {
		this.ticketLink = ticketLink; 
	}

	setImageLink(imageURL) {
		this.imageURL = imageURL;
	}

	getEventDataObject() {
		return {
			artist:       this.artist,
			date:         this.date, 
			venue:        this.venue,
			venueEmail:   this.venueEmail,
			venueAddress: this.venueAddress,
			ticketLink:   this.ticketLink,
			imageURL:     this.imageURL
		}
	}
}



module.exports = EventInfo; 