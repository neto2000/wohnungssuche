
<script>

	let username = $state("Hallo")
	let email = $state("");

	let password = $state("")

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

		console.log(data.logged_in)
	}

</script>


<div>

	<input type="text" bind:value={email} />
	<input type="text" bind:value={password} />
	
	<button onclick={login}>login</button>
</div>
