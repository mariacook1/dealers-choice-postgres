
const pg = require('pg');
const postgresUrl = 'postgres://localhost/coffee'; 
const client = new pg.Client(postgresUrl);


const syncAndSeed = async()=>{
    const SQL = `
    DROP TABLE IF EXISTS coffee_beans;
    DROP TABLE IF EXISTS roasters;
    
    CREATE TABLE roasters(
        id INTEGER PRIMARY KEY, 
        name VARCHAR(100),
        location VARCHAR(100)
    );
    CREATE TABLE coffee_beans(
        id INTEGER PRIMARY KEY,
        roaster_id INTEGER REFERENCES roasters(id),
        name VARCHAR(100),
        origin VARCHAR(100),
        price DECIMAL(5, 2)
    );
    INSERT INTO roasters(id, name, location) VALUES(1, 'Mythical Coffee', 'Arizona');
    INSERT INTO roasters(id, name, location) VALUES(2, 'Brandywine Coffee', 'Delaware');
    INSERT INTO roasters(id, name, location) VALUES(3, 'Onyx Coffee', 'Arkansas');


    INSERT INTO coffee_beans(id, roaster_id, name, origin, price) VALUES(1, 1, 'Apollo', 'Costa Rica', 21.00);
    INSERT INTO coffee_beans(id, roaster_id, name, origin, price) VALUES(2, 1, 'Kitsune', 'Kenya', 20.00);
    INSERT INTO coffee_beans(id, roaster_id, name, origin, price) VALUES(3, 1, 'Harmonia', 'Costa Rica', 20.00);
    INSERT INTO coffee_beans(id, roaster_id, name, origin, price) VALUES(4, 2, 'Delagua', 'Colombia', 25.00);
    INSERT INTO coffee_beans(id, roaster_id, name, origin, price) VALUES(5, 2, 'Edwin Ferrenbach', 'Panama', 28.00);
    INSERT INTO coffee_beans(id, roaster_id, name, origin, price) VALUES(6, 2, 'Cosmic Turkey', 'Honduras', 23.00);
    INSERT INTO coffee_beans(id, roaster_id, name, origin, price) VALUES(7, 3, 'Geometry', 'Colombia', 18.50);
    INSERT INTO coffee_beans(id, roaster_id, name, origin, price) VALUES(8, 3, 'Tropical Weather', 'Ethiopia', 21.00);
    INSERT INTO coffee_beans(id, roaster_id, name, origin, price) VALUES(9, 3, 'Monarch', 'Colombia', 18.00);
    `;
    await client.query(SQL);
};

module.exports = {
    client, 
    syncAndSeed
}



