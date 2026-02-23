import { json } from '@sveltejs/kit';
import { custom_pool } from '$lib/server/db';

export async function POST({request, cookies}) {
	
	const {city, area, price, rooms, created_at, available_from, sort} = await request.json();

	let search_query = "%" + city + "%";
	
	console.log(search_query)

	try {

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
	}


}
