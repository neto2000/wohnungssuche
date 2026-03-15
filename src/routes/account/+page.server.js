

import { error, redirect } from '@sveltejs/kit'
import { custom_pool } from '../../lib/server/db.js'

export const load = async ({ cookies }) => {

    let user = cookies.get("id")

    if (user == undefined) {

        redirect(303, "/login")
    
    }

    try {

        let [rows, fields] = await custom_pool.query('SELECT flat.flat_id, flat.title, flat.address, flat.city, user.email, user.user_name FROM flat INNER JOIN user ON flat.user_id = user.user_id WHERE flat.user_id = ?', [user])

        if (rows.length == 0) {


            let [rows2, f] = await custom_pool.query('SELECT user.email, user.user_name FROM user WHERE user_id = ?', [user])

            rows = rows2
        }

        return {

            flats: rows

        }
    }

    catch(e) {

        console.log(e)

        error(500, 'Internal Server Error')
    }

}
