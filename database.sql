CREATE TABLE user (
    user_id INT NOT NULL AUTO_INCREMENT,
    user_name varchar(255),
    password varchar(255),
    email varchar(255),
    PRIMARY KEY (user_id)
);

CREATE TABLE flat (
    flat_id INT NOT NULL,
    user_id INT,
    title varchar(255),
    description varchar(255),
    city varchar(255),
    address varchar(255),
    zip_code varchar(255),
    rooms INT,
    area INT,
    price FLOAT,
    created_at DATE,
    available_from DATE,
    
    PRIMARY KEY (flat_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)

);

CREATE TABLE pictures (
    file_path varchar(255),
    flat_id INT,

    PRIMARY KEY(file_path),
    FOREIGN KEY(flat_id) REFERENCES flat(flat_id)
);

CREATE TABLE request (
    user_id INT NOT NULL,
    flat_id INT NOT NULL,
    request_date TIMESTAMP,
    message varchar(255),

    PRIMARY KEY(user_id, flat_id),

    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(flat_id) REFERENCES flat(flat_id)

);

CREATE TABLE favourite (
    user_id INT NOT NULL,
    flat_id INT NOT NULL,
    
    PRIMARY KEY(user_id, flat_id),

    FOREIGN KEY(user_id) REFERENCES user(user_id),
    FOREIGN KEY(flat_id) REFERENCES flat(flat_id)

);
