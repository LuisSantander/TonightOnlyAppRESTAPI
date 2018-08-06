



CREATE TABLE venues (
	id           VARCHAR(20) NOT NULL,
	venueName    VARCHAR(50) NOT NULL,
	venueAddress VARCHAR(50) NOT NULL, 
	venuePhone   VARCHAR(50) NOT NULL,
	venueWebsite VARCHAR(50) NOT NULL,
	venueLogo 	 VARCHAR(50) NOT NULL,
	PRIMARY KEY(id)
);

# Store Academy Data 
INSERT INTO venues(id, venueName, venueAddress, venuePhone, venueWebsite, venueLogo) 
VALUES ("24829018", "Academy", "6021 Hollywood Blvd, Los Angeles, CA 90028", " (323) 785-2680", "https://www.academy.la/", "academy.jpeg");



