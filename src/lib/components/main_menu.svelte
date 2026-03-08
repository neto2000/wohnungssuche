<script>
	
	import { user_state } from '$lib/store.svelte';
	import {invalidateAll} from '$app/navigation'

	let {visible = $bindable()} = $props()


	async function log_out() {
		
		user_state.logged_in = false
		user_state.user_id = -1

		const res = await fetch("/logout", {
			method: 'GET'
		})

		await invalidateAll()
		
	}

</script>


<div class="float">
	

	<button style="flex-grow: 1; background-color: transparent; border: none; font-size: 0;" onclick={() => {visible = false}}>Escape Menu</button>	


	<div class="menu">
		<button onclick={() => {visible = false}}>close</button>

		<button>account</button>
		<a class="link" href="/flats/favourites">Favoriten</a>
		<a class="link" href="/flats/create/">Wohnung inserieren</a>
		<button onclick={log_out}>Ausloggen</button>

	</div>

</div>


<style>

	.float {
		
		position: absolute;

		display: flex;

		right: 0px;
		top: 0px;

		height: 100vh;
		width: 100vw;

	}

	.menu {
		display: flex;
		flex-direction: column;

		background-color: black;
		
		height: 100vh;
		width: 10vw
	}

	.link {

		color: black;
		background-color: lightgray;
	}

</style>
