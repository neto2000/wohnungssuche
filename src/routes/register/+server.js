import { json } from '@sveltejs/kit';
import { custom_pool } from '$lib/server/db';

export async function POST({request, cookies}) {
	
	const {name, email, password} = await request.json();

	console.log(email)

	try {

		const [rows,fields] = await custom_pool.query('INSERT INTO user (user_name, email, password) VALUES (?, ?, ?)', [name, email, password])

		const [rows2,fields2] = await custom_pool.query('SELECT user_id FROM user WHERE email = ? AND password = ?', [email, password])

		cookies.set('id', rows2[0].user_id, {
			path: '/', 
			sameSite: 'strict'
		})
		
		return json({user_id: rows2[0].user_id}, {status: 200})
	}
	catch(e) {

		console.log(e)

		return json({status: 500})
	}


}
