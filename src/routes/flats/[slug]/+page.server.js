import { error } from "@sveltejs/kit"

import { custom_pool } from "../../../lib/server/db"

export const load = async ({ params }) => {

	if (!isNaN(params.slug)) {

		const id = Number(params.slug)

		if (id == NaN) {

			error(404, 'Not Found')	
		}


		try {

			const [rows,fields] = await custom_pool.query('SELECT flat.*, user.user_name FROM flat INNER JOIN user ON flat.user_id = user.user_id WHERE flat_id = ?', [id])

			if(rows.length != 0) {

				return rows[0]
			}
			else {

				throw new Error("result is empty")
			}

		}
		catch(e) {

			console.log(e)
			
			error(404, 'Not Found')	

		}

	}

	error(404, 'Not Found')	
}
