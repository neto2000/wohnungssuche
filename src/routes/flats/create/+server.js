
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { custom_pool } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export async function POST({request, cookies}) {
	
    const {title, desc, city, address, zip_code, rooms, area, price, created_at, available_from, paths} = await request.json();
    
    console.log(cookies.get("id"))

    if (cookies.get("id") == undefined) {
	console.log("error")
	error(403)
    }

    try {

	    const [result] = await custom_pool.query('INSERT INTO flat (user_id, title, description, city, address, zip_code, rooms, area, price, created_at, available_from) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [cookies.get("id"), title, desc, city, address, zip_code, rooms, area, price, created_at, available_from])
	    
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
