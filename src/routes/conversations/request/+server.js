import { json } from '@sveltejs/kit';
import { custom_pool } from '$lib/server/db';

export async function POST({request, cookies}) {
	
	const {flat_id} = await request.json();

	let user = cookies.get("id")

	const now = new Date();

	const timestamp = now.toISOString().slice(0, 19).replace('T', ' ');

	const [rows,fields] = await custom_pool.query('SELECT conversation WHERE user_id = ? AND flat_id = ?', [user, flat_id])

	if (rows.length > 0) {

		
		return json({status: 200})
	}


	try {

		const [rows,fields] = await custom_pool.query('INSERT INTO conversation (user_id, flat_id, last_msg_at) VALUES (?, ?, ?)', [user, flat_id, timestamp])


				
		return json({status: 200})
	}
	catch(e) {

		console.log(e)

		return json({status: 500})
	}


}
