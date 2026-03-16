import { error } from "@sveltejs/kit"
import { redirect } from "@sveltejs/kit"

import { custom_pool } from "../../lib/server/db"

export const load = async ({ cookies, url }) => {

    let user = cookies.get("id")

    if (user == undefined) {

	redirect(303, "/login")
    }

    if (url.searchParams.has("vermieter")) {

	const [rows,fields] = await custom_pool.query('SELECT conversation.*, conversation.user_id as reciever FROM conversation INNER JOIN flat ON conversation.flat_id = flat.flat_id WHERE flat.user_id = ?', [user])
	
	    
	return {conversations: rows}
    }

    const [rows,fields] = await custom_pool.query('SELECT conversation.*, flat.user_id as reciever FROM  conversation INNER JOIN flat ON conversation.flat_id = flat.flat_id WHERE conversation.user_id = ?', [user])

    console.log(rows)


    return {conversations: rows}
}
