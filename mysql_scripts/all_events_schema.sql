

CREATE TABLE events (
	id INT NOT NULL AUTO_INCREMENT,
	venueId	   VARCHAR(50) NOT NULL, 
	eventMonth VARCHAR(50) NOT NULL,
	eventDay   SMALLINT NOT NULL,
	eventYear  VARCHAR(50) NOT NULL,
	eventName  VARCHAR(200) NOT NULL, 
	location   VARCHAR(50) NOT NULL, 
	imageURL   VARCHAR(200) NOT NULL,
	ticketLink VARCHAR(200) NOT NULL,
	PRIMARY KEY(id)
);


-- INSERT INTO events(eventMonth, eventDay, eventYear, location, artist) 
-- VALUES ("July", "28", "2018", "Exchange LA", "Bear Grillz");