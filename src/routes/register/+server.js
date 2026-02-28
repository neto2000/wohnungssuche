import { json } from '@sveltejs/kit';
import { custom_pool } from '$lib/server/db';

export async function POST({request, cookies}) {
	
	const {name, email, password} = await request.json();

	console.log(email)

	try {

		const [rows,fields] = await custom_pool.query('INSERT INTO user (user_name, email, password) VALUES (?, ?, ?)', [name, email, password])

		
		return json({status: 200})
	}
	catch(e) {

		console.log(e)

		return json({status: 500})
	}


}
