<script>
	
	import { user_state } from '$lib/store.svelte';
	import {invalidateAll} from '$app/navigation'
	import {goto} from '$app/navigation'

    import Close from './close.svelte';

	let {visible = $bindable()} = $props()


	async function log_out() {
		
		user_state.logged_in = false
		user_state.user_id = -1

		const res = await fetch("/logout", {
			method: 'GET'
		})

		await invalidateAll()
		
		visible = false

		goto("/")
	}

</script>


<div class="float">
	

	<button style="flex-grow: 1; background-color: rgba(0,0,0,0.1); border: none; font-size: 0;" onclick={() => {visible = false}}>Escape Menu</button>	

	
	<div class="menu">
		<div class="link-container">
			<div class="close-container">
				<button class="close" onclick={() => {visible = false}}><Close color={"black"} /></button>
			</div>

			<a class="link" href="/account">Account</a>
			<a class="link" href="/flats/favourites">Favoriten</a>
			<a class="link" href="/flats/create/">Wohnung inserieren</a>
			<button class="link-button" onclick={log_out}>Ausloggen</button>
		</div>

	</div>

</div>


<style>

	.float {
		
		position: fixed;

		z-index: 10;

		display: flex;

		right: 0px;
		top: 0px;

		height: 100vh;
		width: 100vw;

	}

	.menu {
		display: flex;
		flex-direction: column;

		background-color: white;
		
		height: 100vh;
		width: 20vw
	}

	.link {

		color: black;
		background-color: white;

		text-decoration: none;

		margin-top: 30px;

		margin-left: 20px;

		font-size: 20px;
	}

	.link-button {

		color: black;
		background-color: white;

		text-decoration: none;
		border: none;

		padding: 0;

		text-align: start;

		margin-top: 30px;

		margin-left: 20px;

		font-size: 20px;

		cursor: pointer;
	}


	.close {

		display: flex;

		justify-content: center;

		align-items: center;

		border: none;

		background-color: white;

		height: 40px;
	}

	.close:hover {

		background-color: #eeeeee;

		border-radius: 10px;

		cursor: pointer;
	}

	.close-container {

		display: flex;

		justify-content: end;

		margin-right: 20px;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.link-container {

		display: flex;

		flex-direction: column;

		margin-left: 50px;
	}

</style>
