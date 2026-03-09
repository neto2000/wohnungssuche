# Wohnungssuche

 ## ToDo
  
  - [x] Login logic

  - [x] complete database

  - [x] basic page for a single flat (url arguments for data retrival)

  - [x] search logic (SQL statements)

  - [x] implement search logic in UI

  - [ ] basic list layout for multiple flats

  - [ ] account page

  - [ ] Requests

  - [ ] start page

  - [x] let user create a flat

 ## chat code

  ### lib/handler
   ```
   import { EventEmitter } from 'events';

   // This singleton lives as long as the server is running
   export const eventHub = new EventEmitter();

   ```

  ### /ws/+server.js
   ```
   import { eventHub } from "$lib/ws_handler";

   export function GET() {
     let timer;

     let connected = true

     const stream = new ReadableStream({
       start(controller) {
         const handler = (data) => {

           if (connected) {
             try {

               controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
             }
             catch (e) {
               console.error("Failed to enqueue, closing connection:", e);
               cleanup();
             }
           }
         };
         const cleanup = () => {
           if (connected) {
             connected = false;
             eventHub.off('update', handler);
             try {
               controller.close();
             } catch (e) {
               // Ignore if already closed
             }
           }
         };
         // Listen for the 'update' event from anywhere in the app
         eventHub.on('update', handler); 

       },
       cancel() {

           console.log("conn canceled")

           connected = false

           eventHub.off('update', handler)
       }
     });

     return new Response(stream, {
       headers: {
         'Content-Type': 'text/event-stream',
         'Cache-Control': 'no-cache',
         'Connection': 'keep-alive'
       }
     });
   }
   ```
   ### /+page.svelte

   ```

   import { onMount, onDestroy } from "svelte";

	let messages = [];

	onMount(() => {
		const eventSource = new EventSource('/ws');

		eventSource.onmessage = (event) => {
			const newEntry = JSON.parse(event.data);
			
			console.log(newEntry)

			messages = [...messages, newEntry];
		};

		eventSource.onerror = (err) => {
			console.error("EventSource failed:", err);
			eventSource.close();
		};

		// Cleanup on component destroy
		return () => eventSource.close();
	});


	let msg = ""

	let user = "user"

	async function send_msg() {

		// POST request

		const res = await fetch('/', {
			method: 'POST',
			body: JSON.stringify({message: msg, user: user}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
   ```
  
  ### /+server.js

   ```

   import { json } from '@sveltejs/kit';
   import { eventHub } from '$lib/ws_handler';

   export async function POST({ request }) {
       const { message, user } = await request.json();
       
       eventHub.emit('update', { 
         message, 
         user, 
         timestamp: Date.now() 
       });
       
       return json({ status: 200 });
   }   
   ```

 
