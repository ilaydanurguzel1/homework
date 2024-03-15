const {Client} = require('pg');

const connection = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgre_db',
  password: 'postgres',
  port: 5432
});

module.exports = connection;