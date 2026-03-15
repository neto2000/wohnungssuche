import { eventHub } from "$lib/server/event_handler";

export function GET() {

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
			// ignore
		    }
		}
	    };
	    
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

