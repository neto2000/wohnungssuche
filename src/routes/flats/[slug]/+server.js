import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { custom_pool } from "../../../lib/server/db"

export async function DELETE({params, cookies}) {
   

    if (!isNaN(params.slug)) {

	const flat_id = Number(params.slug)

		
	if (flat_id == NaN) {

		error(404, 'Not Found')	
	}


	if (cookies.get("id") == undefined) {
		
		error(403)
	}

	await custom_pool.query('DELETE FROM favourite WHERE flat_id = ?', [flat_id])
	await custom_pool.query('DELETE FROM conversation WHERE flat_id = ?', [flat_id])

	const [rows,fields] = await custom_pool.query('DELETE FROM flat WHERE flat_id = ?', [flat_id])


	return json({status: 200})

    }
    
    error(404, 'Not Found')	
}
