
<script>

	import {goto} from '$app/navigation'
	import { user_state } from '$lib/store.svelte';
	import {invalidateAll} from '$app/navigation'


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

		await invalidateAll()

		if (data.logged_in) {
			
			goto('/')
		}

		error_msg = "Falsche Email oder Passwort!"	

	}

</script>


<div class="background">




	
	<form class="container" onsubmit={login}>	
		<div><p class="überschrift">Einloggen bei FlatFinder</p></div>
		<div class="text-container"><p class="texte">E-Mail</p></div>
		<input class="eingabe" type="text" bind:value={email} />
		<div class="text-container"><p class="texte">Passwort</p></div>
		<input class="eingabe" type="text" bind:value={password} />
	
		<button class="bestätigen" type="submit">Log In</button>

		<div><p class="registrieren">Noch nicht registriert? <a class="registerlink" href="/register">Registrieren</a></p></div>

			<p style="color: red;">{error_msg}</p>
	</form>





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
padding: 50px;
border-radius: 15px;


}

.text-container {

width: 350px;

}

.eingabe {

width: 342px;
height: 30px;
margin-bottom: 15px;



}

.überschrift {

font-size: 30px;
width: 350px;
height: auto;
margin: 0px;
margin-bottom: 30px;


}

.texte {

margin: 0px;
font-size: 15px;
margin-bottom: 3px;

}

.bestätigen {

width: 350px;
background-color: purple;
color: white;
border: none;
padding: 10px;
font-size: 15px;


}

.registrieren {

width: 350px;
font-size: 15px;
align-items: center;
justify-content: center;

}


.registerlink {

margin-left: 5px;

}

</style>
