import { json } from '@sveltejs/kit';
import { custom_pool } from '$lib/server/db';

export async function POST({request, cookies}) {
	
	const {city, area, price, rooms, created_at, available_from, sort} = await request.json();

	let search_query = "%" + city + "%";
	
	console.log(search_query)

	let flats = []


	const query_conditions = 'LEFT OUTER JOIN (SELECT flat_id, MIN(file_path) as file_path FROM pictures GROUP BY flat_id) pictures ON flat.flat_id = pictures.flat_id WHERE ? <= price AND price <= ? AND ? <= rooms AND rooms <= ? AND ? <= area AND area <= ? AND ? <= available_from AND available_from <= ? AND city LIKE ?';
	let query_data = [price.ug, price.og,rooms.ug, rooms.og, area.ug, area.og, available_from.ug, available_from.og, search_query]

	if (sort== "area_desc") {

		const [rows,fields] = await custom_pool.query('SELECT flat.*,pictures.* FROM flat ' + query_conditions + ' ORDER BY area DESC', query_data)
		
		flats = rows
	}
	else if (sort == "area_asc") {
		
		const [rows,fields] = await custom_pool.query('SELECT * FROM flat ' + query_conditions + ' ORDER BY area ASC', query_data)
		flats = rows
	}
	else if (sort == "price_desc") {
		const [rows,fields] = await custom_pool.query('SELECT * FROM flat ' + query_conditions + ' ORDER BY price DESC', query_data)
		flats = rows
	}
	else if (sort == "price_asc") {
		const [rows,fields] = await custom_pool.query('SELECT * FROM flat ' + query_conditions + ' ORDER BY price ASC', query_data)
		flats = rows
	}
	else if (sort == "rooms_desc") {
		const [rows,fields] = await custom_pool.query('SELECT * FROM flat ' + query_conditions + ' ORDER BY rooms DESC', query_data)
		flats = rows
	}
	else if (sort == "rooms_asc") {
		const [rows,fields] = await custom_pool.query('SELECT * FROM flat ' + query_conditions + ' ORDER BY rooms ASC', query_data)
		flats = rows
	}
	else if (sort == "created_at_desc") {
		const [rows,fields] = await custom_pool.query('SELECT * FROM flat ' + query_conditions + ' ORDER BY created_at DESC', query_data)
		flats = rows
	}
	else if (sort == "created_at_asc") {
		const [rows,fields] = await custom_pool.query('SELECT * FROM flat ' + query_conditions + ' ORDER BY created_at ASC', query_data)
		flats = rows
	}
	else if (sort == "available_from_desc") {
		const [rows,fields] = await custom_pool.query('SELECT * FROM flat ' + query_conditions + ' ORDER BY available_from DESC', query_data)
		flats = rows
	}
	else if (sort == "available_from_asc") {
		const [rows,fields] = await custom_pool.query('SELECT * FROM flat ' + query_conditions + ' ORDER BY available_from ASC', query_data)
		flats = rows
	}

	/*try {

		const [rows,fields] = await custom_pool.query('SELECT * FROM flat WHERE city LIKE ?', [search_query])

		if(rows.length != 0) {

			return json(rows)
		}
		else {
			throw new Error("result is empty")
		}

	}
	catch(e) {

		console.log(e)

		return json({logged_in: false}, {status: 500})
	}*/


	return json({flats:flats}, {status:200})
}
