import { error } from "@sveltejs/kit"
import { redirect } from "@sveltejs/kit"

import { custom_pool } from "../../../lib/server/db"


export const load = async ({ cookies }) => {
	
	if (cookies.get("id") == undefined) {

	    throw redirect(303, "/login")	
	}

	
	let id = cookies.get("id")


	try {
		
		const query = 'SELECT flat.*, pictures.file_path FROM (SELECT flat.* FROM flat INNER JOIN favourite ON flat.flat_id = favourite.flat_id WHERE favourite.user_id = ?) flat LEFT OUTER JOIN (SELECT flat_id, MIN(file_path) as file_path FROM pictures GROUP BY flat_id) pictures ON flat.flat_id = pictures.flat_id'

		const [rows,fields] = await custom_pool.query(query, [id])


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
