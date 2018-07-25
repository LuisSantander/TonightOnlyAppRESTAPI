


CREATE TABLE events (
	id INT NOT NULL AUTO_INCREMENT,
	eventMonth VARCHAR(50) NOT NULL,
	eventDay   VARCHAR(50) NOT NULL,
	eventYear  VARCHAR(50) NOT NULL, 
	location   VARCHAR(50) NOT NULL, 
	artist	   VARCHAR(50) NOT NULL,
	PRIMARY KEY(id)
);


INSERT INTO events(eventMonth, eventDay, eventYear, location, artist) 
VALUES ("July", "28", "2018", "Exchange LA", "Bear Grillz");