DROP TABLE IF EXISTS Comments;

DROP TABLE IF EXISTS Reviews;

DROP TABLE IF EXISTS Items;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users(
    id UUID PRIMARY KEY,
    username varchar(50) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    createdDate TIMESTAMP DEFAULT now(),
    modifiedDate TIMESTAMP DEFAULT now()
);

CREATE TABLE Items(
    id UUID PRIMARY KEY,
    name varchar(255) NOT NULL UNIQUE,
    description varchar(500),
    createdDate TIMESTAMP DEFAULT now(),
    modifiedDate TIMESTAMP DEFAULT now()
);

CREATE TABLE Reviews(
    id UUID PRIMARY KEY,
    itemId UUID REFERENCES Items(id) NOT NULL,
    userId UUID REFERENCES Users(id) NOT NULL,
    review varchar(500),
    rating int,
    createdDate TIMESTAMP DEFAULT now(),
    modifiedDate TIMESTAMP DEFAULT now(),
    CONSTRAINT uniqueUserIdItemId UNIQUE(userId,ItemId)
);

CREATE TABLE Comments(
    id UUID PRIMARY KEY,
    comment varchar(500) NOT NULL,
    userId UUID REFERENCES Users(id) NOT NULL,
    reviewId UUID REFERENCES Reviews(id) NOT NULL,
    createdDate TIMESTAMP DEFAULT now(),
    modifiedDate TIMESTAMP DEFAULT now()
);
