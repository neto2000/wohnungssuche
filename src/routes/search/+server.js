import { json } from '@sveltejs/kit';
import { custom_pool } from '$lib/server/db';

export async function POST({request, cookies}) {
	
	const {city, area, price, rooms, created_at, available_from, sort} = await request.json();

	let search_query = "%" + city + "%";
	
	console.log(search_query)

	let flats = []

	if (sort== "area_desc") {
		const [rows,fields] = await custom_pool.query(
			'SELECT * FROM flat WHERE ? <= price AND price <= ? AND ? <= rooms AND rooms <= ? AND ? <= area AND area <= ? AND ? <= available_from AND available_from <= ? ORDER BY area DESC', [price.ug, price.og,rooms.ug, rooms.og, area.ug, area.og, available_from.ug, available_from.og])
			flats = rows
	}
	else if (sort == "area_asc") {
		const [rows,fields] = await custom_pool.query(
			'SELECT * FROM flat WHERE ? <= price AND price <= ? AND ? <= rooms AND rooms <= ? AND ? <= area AND area <= ? AND ? <= available_from AND available_from <= ? ORDER BY area ASC', [price.ug, price.og,rooms.ug, rooms.og, area.ug, area.og, available_from.ug, available_from.og])

	}
	else if (sort == "price_desc") {
		const [rows,fields] = await custom_pool.query(
			'SELECT * FROM flat WHERE ? <= price AND price <= ? AND ? <= rooms AND rooms <= ? AND ? <= area AND area <= ? AND ? <= available_from AND available_from <= ? ORDER BY price DESC', [price.ug, price.og,rooms.ug, rooms.og, area.ug, area.og, available_from.ug, available_from.og])
			flats = rows
	}
	else if (sort == "price_asc") {
		const [rows,fields] = await custom_pool.query(
			'SELECT * FROM flat WHERE ? <= price AND price <= ? AND ? <= rooms AND rooms <= ? AND ? <= area AND area <= ? AND ? <= available_from AND available_from <= ? ORDER BY price ASC', [price.ug, price.og,rooms.ug, rooms.og, area.ug, area.og, available_from.ug, available_from.og])
			flats = rows
	}
	else if (sort == "rooms_desc") {
				const [rows,fields] = await custom_pool.query(
			'SELECT * FROM flat WHERE ? <= price AND price <= ? AND ? <= rooms AND rooms <= ? AND ? <= area AND area <= ? AND ? <= available_from AND available_from <= ? ORDER BY rooms DESC', [price.ug, price.og,rooms.ug, rooms.og, area.ug, area.og, available_from.ug, available_from.og])
			flats = rows
	}
	else if (sort == "rooms_asc") {
						const [rows,fields] = await custom_pool.query(
			'SELECT * FROM flat WHERE ? <= price AND price <= ? AND ? <= rooms AND rooms <= ? AND ? <= area AND area <= ? AND ? <= available_from AND available_from <= ? ORDER BY rooms ASC', [price.ug, price.og,rooms.ug, rooms.og, area.ug, area.og, available_from.ug, available_from.og])
			flats = rows
	}
	else if (sort == "created_at_desc") {
				const [rows,fields] = await custom_pool.query(
			'SELECT * FROM flat WHERE ? <= price AND price <= ? AND ? <= rooms AND rooms <= ? AND ? <= area AND area <= ? AND ? <= available_from AND available_from <= ? ORDER BY created_at DESC', [price.ug, price.og,rooms.ug, rooms.og, area.ug, area.og, available_from.ug, available_from.og])
			flats = rows
	}
	else if (sort == "created_at_asc") {
				const [rows,fields] = await custom_pool.query(
			'SELECT * FROM flat WHERE ? <= price AND price <= ? AND ? <= rooms AND rooms <= ? AND ? <= area AND area <= ? AND ? <= available_from AND available_from <= ? ORDER BY created_at ASC', [price.ug, price.og,rooms.ug, rooms.og, area.ug, area.og, available_from.ug, available_from.og])
			flats = rows
	}
	else if (sort == "available_from_asc") {
				const [rows,fields] = await custom_pool.query(
			'SELECT * FROM flat WHERE ? <= price AND price <= ? AND ? <= rooms AND rooms <= ? AND ? <= area AND area <= ? AND ? <= available_from AND available_from <= ? ORDER BY available_from DESC', [price.ug, price.og,rooms.ug, rooms.og, area.ug, area.og, available_from.ug, available_from.og])
			flats = rows
	}
	else if (sort == "available_from_asc") {
				const [rows,fields] = await custom_pool.query(
			'SELECT * FROM flat WHERE ? <= price AND price <= ? AND ? <= rooms AND rooms <= ? AND ? <= area AND area <= ? AND ? <= available_from AND available_from <= ? ORDER BY available_from ASC', [price.ug, price.og,rooms.ug, rooms.og, area.ug, area.og, available_from.ug, available_from.og])
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
