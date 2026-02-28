
<script>

	import {goto} from '$app/navigation'
	import { user_state } from '$lib/store.svelte';

	let username = $state("Hallo")
	let email = $state("");

	let password = $state("")



	let error_msg = $state("")

	async function login() {

		const res = await fetch('/login', {
			
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			}) 
		})

		let data = await res.json()	

		user_state.logged_in = data.logged_in
		user_state.user_id = data.user_id

		if (data.logged_in) {
			
			goto('/')
		}

		error_msg = "wrong email or password"	

	}

</script>


<div>

	<input type="text" bind:value={email} />
	<input type="text" bind:value={password} />
	
	<button onclick={login}>login</button>

	<p style="color: red;">{error_msg}</p>
</div>
