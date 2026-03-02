
import { json } from '@sveltejs/kit';
import { custom_pool } from '$lib/server/db';

export async function POST({request, cookies}) {
	
    const {user_id, title, desc, city, address, zip_code, rooms, area, price, created_at, available_from, paths} = await request.json();

    try {

	    const [result] = await custom_pool.query('INSERT INTO flat (user_id, title, description, city, address, zip_code, rooms, area, price, created_at, available_from) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [user_id, title, desc, city, address, zip_code, rooms, area, price, created_at, available_from])
	    
	    const flat_id = result.insertId

	    for (let i = 0; i < paths.length; i++) {

		const [result] = await custom_pool.query('INSERT INTO pictures (file_path, flat_id) VALUES (?, ?)', [paths[i], flat_id])

	    }

	    
	    return json({flat_id: flat_id}, {status: 200})
    }
    catch(e) {

	    console.log(e)

	    return json({status: 500})
    }

    
}
