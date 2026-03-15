import { json } from '@sveltejs/kit';
import { custom_pool } from '$lib/server/db';

export async function POST({request, cookies}) {
	
	const {name} = await request.json();
        
        let user = cookies.get("id")

	try {

		const [rows,fields] = await custom_pool.query('UPDATE user SET user_name = ? WHERE user_id = ?', [name, user])
                
                return json({status: 200})
	}
	catch(e) {

		console.log(e)

		return json({status: 500})
	}


}
