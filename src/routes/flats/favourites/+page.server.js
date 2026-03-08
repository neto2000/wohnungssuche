import { error } from "@sveltejs/kit"
import { redirect } from "@sveltejs/kit"

import { custom_pool } from "../../../lib/server/db"


export const load = async ({ cookies }) => {
	
	if (cookies.get("id") == undefined) {

	    throw redirect(303, "/login")	
	}

	
	let id = cookies.get("id")


	try {

		const [rows,fields] = await custom_pool.query('SELECT flat.* FROM flat INNER JOIN favourite ON flat.flat_id = favourite.flat_id WHERE favourite.user_id = ?', [id])


		if(rows.length != 0) {

			return {data: rows}
		}
		else {

			return {data: null}
		}

	}
	catch(e) {

		console.log(e)
		
		error(404, 'Not Found')	

	}

}
