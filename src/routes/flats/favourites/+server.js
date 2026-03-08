import { json } from '@sveltejs/kit';
import { custom_pool } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function POST({request, cookies}) {
	
	const {flat_id} = await request.json();

	if (cookies.get("id") == undefined) {
		
		error(403)
	}

	const user_id = cookies.get("id")

	const [rows,fields] = await custom_pool.query('INSERT INTO favourite (user_id, flat_id) VALUES (?, ?)', [user_id, flat_id])

	return json({status: 200})
}

export async function DELETE({request, cookies}) {
	
	const {flat_id} = await request.json();

	if (cookies.get("id") == undefined) {
		
		error(403)
	}

	const user_id = cookies.get("id")

	const [rows,fields] = await custom_pool.query('DELETE FROM favourite WHERE user_id = ? AND flat_id = ?', [user_id, flat_id])


	return json({status: 200})
}
