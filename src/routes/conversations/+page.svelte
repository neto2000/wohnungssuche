<script>

	import { onMount, onDestroy } from "svelte";
	

	let { data } = $props();
	
	let conn_index = $state(0)

	let messages = $state([]);

	onMount(() => {
		const eventSource = new EventSource('/sse/open');

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

	async function send_msg(e) {

		e.preventDefault();
		// POST request

		console.log(data.conversations[conn_index].reciever)

		const res = await fetch('/sse/send', {
			method: 'POST',
			body: JSON.stringify({message: msg, reciever: data.conversations[conn_index].reciever}),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		msg = ""
	}


</script>

<div class="main-grid">

	<div class="conn-bar">

		{#each data.conversations as conversation}

			<div class="conn">
				<div>
					<p>title</p>
					<p>{conversation.user_id}</p>

				</div>
				<div>

					<p>new message</p>

				</div>
			</div>

		{/each}

	</div>

	<div class="chat-container">

		{#each messages as message}
			<p>{message.message}</p>
		{/each}
		
		<form onsubmit={(e) => {send_msg(e)}}>
			
			<input type="text" bind:value={msg}>
			<button type="submit">send</button>

		</form>
	</div>


</div>


<style>
	
.main-grid {

	display: grid;

	grid-template-columns: 20vw 80vw;

	flex-grow: 1;
}

.conn-bar {

	display: flex;

	flex-direction: column;

	flex-grow: 1;

	border-right: 1px solid black;
}

.conn {

	border-bottom: 1px solid gray;

	padding: 5px 30px;

	display: flex;

	justify-content: space-between;
}

</style>
