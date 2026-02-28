<script>
	
	import { user_state } from '$lib/store.svelte';
	import {goto} from '$app/navigation'
		
	let name = $state("")
	let email = $state("")

	let password = $state("")
	let password2 = $state("")


	let msg = $state("")

	async function register() {

		if (name == "" || email == "" || password == "") {

			msg = "Du musst alle Felder ausfüllen!"

			return
		}

		if (password != password2) {

			msg = "Die Passwörter müssen identisch sein!"

			return
		}

		const res = await fetch('/register', {
			
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password
			}) 
		})

		if (res.status != 200) {

			msg = "Error"

			return

		}

		let data = await res.json()

		user_state.logged_in = true
		user_state.user_id = data.user_id

		goto("/")

	}

</script>


<div>
	
	<p>Name:</p>
	<input type="text" bind:value={name}>
	<p>Email:</p>
	<input type="text" bind:value={email}>

	<p>Passwort:</p>
	<input type="text" bind:value={password}>
	<p>Passwort wiederholen:</p>
	<input type="text" bind:value={password2}>
	
	<button onclick={register}>Registrieren</button>

	<p style="color: red;">{msg}</p>
</div>

