import { json } from '@sveltejs/kit';
import { custom_pool } from '$lib/server/db';

export async function POST({request}) {
	
	const {user_id, flat_id, message} = await request.json();

	console.log(email)

	const now = new Date();

	const date = now.toISOString().slice(0, 19).replace('T', ' ');


	try {

		const [rows,fields] = await custom_pool.query('INSERT INTO request (user_id, flat_id, request_date, message) VALUES (?,?,?,?)', [user_id, flat_id, date, message])

		return({status: 200})
	}
	catch(e) {

		console.log(e)

		return json({status: 500})
	}


}
