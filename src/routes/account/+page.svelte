<script>
	import {invalidateAll} from '$app/navigation'
	import {goto} from '$app/navigation'

    let show_newname = $state(false)
    let show_flats = $state(false)
    let {data} = $props()

	let new_name = $state("")


	let old_password = $state("")
	let new_password = $state("")
	let new_password2 = $state("")

	let error_msg = $state("") 

	async function change_name() {

		if (new_name == "") {

			return
		}

		const res = await fetch('/account/username', {
			
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: new_name,
			}) 
		})

		show_newname = false

		await invalidateAll()

	}
	

	async function change_password() {

		if (old_password == "" || new_password == "") {

			error_msg = "ungültiges Passwort"
			return
		}

		if (new_password != new_password2) {

			error_msg = "ungültiges Passwort"
			return
		}

		const res = await fetch('/account/password', {
			
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				old_password: old_password,
				new_password: new_password
			}) 
		})

		if (res.status != 200) {
			
			error_msg = "ungültiges Passwort"

			return
		}
		
		error_msg = ""

		goto("/")
	}

	async function remove_flat(id) {

		const res = await fetch('/flats/' + id, {
			
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		show_flats = false

		await invalidateAll()

	}

</script>


<div class="center">




	
	<form class="container">	
		<div><p class="überschrift">Persönliche Daten</p></div>

        <div class="grid-container">
        
        <div><p class="texte">Benutzername:</p></div>
        <input type="text" class="eingabe" disabled value={data.flats[0].user_name}>
        <button class="update" onclick={() => {show_newname =! show_newname}}>Benutzernamen ändern</button>
        

        {#if show_newname}
            

       
        <div><p class="texte">Neuer Benutzername:</p></div>
        <input type="text" class="eingabe" bind:value={new_name} placeholder="Benutzername">
        <button class="update" onclick={change_name}>Neuen Benutzernamen Speichern</button>
        

        {/if}
        
		<div class="text-container"><p class="texte">E-Mail</p></div>
        <input class="eingabe" type="text" disabled value={data.flats[0].email}>
        <div></div>


        <div><p class="texte">Passwort ändern:</p></div>
		<input class="eingabe" type="text" bind:value={old_password} placeholder="Aktuelles Passwort"/>
        <div style="color: red;">{error_msg}</div>
        <div></div>
		<input class="eingabe" type="text" bind:value={new_password} placeholder="Neues Passwort"/>
        <div></div>
        <div></div>
        <input class="eingabe" type="text" bind:value={new_password2} placeholder="Neues Passwort bestätigen"/>
        <button class="update" onclick={change_password}>Passwort speichern</button>


        </div>

        <div>Meine Wohnungen</div>


        <button onclick={() => {show_flats = !show_flats}}>
            
            {#if show_flats}
            
            verstecken
            
            {:else}
            
            anzeigen
            
            {/if}
        
        </button>

        {#if show_flats && !(data.flats[0].flat_id == undefined)}
            

        {#each data.flats as flat}

        <div class="grid-flat"></div>

        <div><a href={"/flats/" + flat.flat_id}>{flat.title}</a></div>
        <div><p>{flat.address}, {flat.city}</p></div>
        <button class="update" onclick={() => {remove_flat(flat.flat_id)}}>Löschen</button>
            
        {/each}
       


    

        {/if}
	

			<p style="color: red;"></p>
	</form>





</div>



<style>

.center {

	display: flex;

	justify-content: center;

	align-items: center;

	flex-direction: column;

	flex-grow: 1;

	background-image: url("/background.jpg");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}

.container {

background-color: white;
width: auto;
height: auto;
display: flex;

flex-direction: column;
padding: 50px;
border-radius: 15px;


}

.grid-container {

display: grid;
grid-template-columns: 34% 33% 33%;
grid-gap: 20px;
grid-column-gap: 10px;

margin-bottom: 30px;

align-items: center;

}

.text-container {

width: 600px;

}

.eingabe {

height: 30px;
margin-right: 20px;



}

.überschrift {

font-size: 30px;
width: 350px;
height: auto;
margin: 0px;
margin-bottom: 30px;
font-weight: bold;


}

.texte {

margin: 0px;
font-size: 15px;
margin-right: 50px;
align-items: center;

}

.bestätigen {

width: 350px;
background-color: purple;
color: white;
border: none;
padding: 10px;
flex-direction: row;
font-size: 15px;


}

.name {

display: flex;
margin-right: 50px;
align-items: center;
margin-bottom: 30px;

}

.update {

background-color: purple;
color: white;
border: none;
padding: 10px;
font-size: 15px;
border-radius: 20px;

}

.grid-flat {

display: grid;
grid-template-columns: 34% 33% 33%;
grid-gap: 20px;
grid-column-gap: 10px;

margin-bottom: 30px;

align-items: center;

}

</style>
