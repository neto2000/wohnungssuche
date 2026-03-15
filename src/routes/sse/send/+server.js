import { json } from '@sveltejs/kit';
import { custom_pool } from '$lib/server/db';
import { eventHub } from '$lib/server/event_handler';

export async function POST({ request, cookies }) {
    const { con_id, message, reciever } = await request.json();

    let user = cookies.get("id") 


   
    eventHub.emit('update', { 
	message, 
	user,
	reciever,
	timestamp: Date.now() 
    });
   
    return json({ status: 200 });
}   

