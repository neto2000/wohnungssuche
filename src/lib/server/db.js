import mysql from 'mysql2/promise'

import {MYSQL_DATABASE, MYSQL_PASSWORD, MYSQL_USER, TEST} from "$env/static/private"



export const pool = mysql.createPool({
	host: 'database',
	user: MYSQL_USER,
	password: MYSQL_PASSWORD,
	database: MYSQL_DATABASE,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
})

