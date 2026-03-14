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

<div class="background">

<div class="container">
	
	<div><p class="überschrift"> Registrieren bei FlatFinder</p></div>
	<div class="text-container"><p class="texte">Benutzername:</p></div>
	<input class="eingabe" type="text" bind:value={name}>
	<div class="text-container"><p class="texte">Email:</p></div>
	<input class="eingabe" type="text" bind:value={email}>

	<div class="text-container"><p class="texte">Passwort:</p></div>
	<input class="eingabe" type="text" bind:value={password}>
	<div class="text-container"><p class="texte">Passwort wiederholen:</p></div>
	<input class="eingabe" type="text" bind:value={password2}>
	
	<button class="bestätigen" onclick={register}>Registrieren</button>

	<div><p class="registrieren">Bereits registriert? <a class="loginlink" href="/login">Einloggen</a></p></div>

	<p style="color: red;">{msg}</p>

</div>

</div>

<style>

.background {

background-color: blueviolet;
height: 100%;
display: flex;
align-items: center;
justify-content: center;

}

.container {

background-color: white;
width: auto;
height: auto;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 50px;rgb(15, 15, 116);
border-radius: 15px;

}

.text-container {

width: 358px;

}

.eingabe {

width: 350px;
height: 30px;
margin-bottom: 15px;


}

.überschrift {

font-size: 30px;
width: 358px;
height: auto;
margin: 0px;
margin-bottom: 30px;


}

.texte {

margin: 0px;
font-size: 15px;

}

.bestätigen {

width: 358px;
background-color: purple;
color: white;
border: none;
padding: 10px;
font-size: 15px;


}

.registrieren {

width: 358px;
font-size: 15px;
align-items: center;
justify-content: center;

}


.loginlink {

margin-left: 5px;

}

</style>

