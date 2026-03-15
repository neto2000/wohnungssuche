import { json } from '@sveltejs/kit';
import { eventHub } from '$lib/server/event_handler';

export async function POST({ request, cookies }) {
    const { message } = await request.json();

    let user = cookies.get("id") 
   
    eventHub.emit('update', { 
	message, 
	user, 
	timestamp: Date.now() 
    });
   
    return json({ status: 200 });
}   

