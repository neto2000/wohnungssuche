import { json } from '@sveltejs/kit';
import { custom_pool } from '$lib/server/db';

export async function POST({request, cookies}) {
	
	const {email, password} = await request.json();

	console.log(email)

	try {

		const [rows,fields] = await custom_pool.query('SELECT user_id FROM user WHERE email = ? AND password = ?', [email, password])

		if(rows.length != 0) {

			return json({logged_in: true, user_id: rows[0].user_id}, {status: 200})
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
