import { json } from '@sveltejs/kit';
import { error } from "@sveltejs/kit"
import { custom_pool } from '$lib/server/db';

export async function POST({request, cookies}) {
	
    const {old_password, new_password} = await request.json();
    
    let user = cookies.get("id")

    try {

        const [rows,fields] = await custom_pool.query('SELECT user_id FROM user WHERE user_id = ? AND password = ?', [user, old_password])

        if(rows.length == 0) {
            
            throw new Error("invalid")
        }
             

        await custom_pool.query('UPDATE user SET password = ? WHERE user_id = ?', [new_password, user])
            
        return json({status: 200})
    }
    catch(e) {

        console.log(e)
        
        error(500, "Error")
    }


}
