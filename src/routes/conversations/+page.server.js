import { error } from "@sveltejs/kit"
import { redirect } from "@sveltejs/kit"

import { custom_pool } from "../../lib/server/db"

export const load = async ({ cookies, url }) => {

    let user = cookies.get("id")

    if (user == undefined) {

	redirect(303, "/login")
    }

    if (url.searchParams.has("vermieter")) {

	const [rows,fields] = await custom_pool.query('SELECT * FROM conversation WHERE user_id = ?', [id])
	    

	    try {

		    let logged_in = false

		    if (cookies.get("id") != undefined) {

			    logged_in = true
		    }


		    const [rows,fields] = await custom_pool.query('SELECT flat.*, user.email, user.user_name FROM flat INNER JOIN user ON flat.user_id = user.user_id WHERE flat_id = ?', [id])

		    const [paths] = await custom_pool.query('SELECT file_path FROM pictures WHERE flat_id = ?', [id])


		    const [favourite] = await custom_pool.query('SELECT * FROM favourite WHERE flat_id = ? AND user_id = ?', [id, cookies.get("id")])

		    console.log(paths)

		    let is_favourite = false

		    if (favourite.length != 0) {
			    is_favourite = true
		    }

		    if(rows.length != 0) {

			    return {data: rows[0], img_paths: paths, is_fav: is_favourite, logged_in: logged_in}
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

    const [rows,fields] = await custom_pool.query('SELECT * FROM conversation WHERE user_id = ?', [user])

    return {conversations: rows}
}
