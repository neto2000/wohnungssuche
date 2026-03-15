import { json } from '@sveltejs/kit';
import { custom_pool } from '$lib/server/db';

export async function POST({request, cookies}) {
	
    const {con_id} = await request.json();

    let user = cookies.get("id")

    if (user == undefined) {

	redirect(303, "/login")
    }

    
    const [rows,fields] = await custom_pool.query('SELECT message.* FROM conversation INNER JOIN message ON conversation.conversation_id = message.conversation_id WHERE conversation.conversation_id = ?', [con_id])


    return json({messages: rows})

}
