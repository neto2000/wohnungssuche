import { json } from '@sveltejs/kit';
import { custom_pool } from '$lib/server/db';
import { eventHub } from '$lib/server/event_handler';

export async function POST({ request, cookies }) {
    const { con_id, message, reciever } = await request.json();

    let sender_id = cookies.get("id") 
    
    const now = new Date();

    const timestamp = now.toISOString().slice(0, 19).replace('T', ' ');

    
    const [rows,fields] = await custom_pool.query('INSERT INTO message (conversation_id, sender_id, message, created_at) VALUES (?, ?, ?, ?)', [con_id, sender_id, message, timestamp])
   
    eventHub.emit('update', { 
	message, 
	sender_id,
	reciever,
	timestamp: Date.now() 
    });
   
    return json({ status: 200 });
}   

