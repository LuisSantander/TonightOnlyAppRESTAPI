

CREATE TABLE events (
	eventId        VARCHAR(100) NOT NULL,
	venueId	       VARCHAR(50)      NOT NULL, 
	eventMonth     VARCHAR(50)      NOT NULL,
	eventDay       SMALLINT         NOT NULL,
	eventYear      VARCHAR(50)      NOT NULL,
	eventTime      VARCHAR(200)     NOT NULL,
	eventName      VARCHAR(200)     NOT NULL, 
	eventLocation  VARCHAR(50)      NOT NULL, 
	eventImageURL  VARCHAR(200)     NOT NULL,
	eventTicketURL VARCHAR(200)     NOT NULL, 
	PRIMARY KEY(eventId)
);


-- INSERT INTO events(eventMonth, eventDay, eventYear, location, artist) 
-- VALUES ("July", "28", "2018", "Exchange LA", "Bear Grillz");