<script>
	
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

