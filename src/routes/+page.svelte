<script>

	import {user_state} from '$lib/store.svelte'
	import  {goto} from '$app/navigation'

	let {data} = $props();

	let search_query = $state("")

	function search(e) {
		
		e.preventDefault();

		goto('/search?search=' + search_query)
	}
	
</script>

<form onsubmit={(e) => {search(e)}}>
	<input type="text" bind:value={search_query}>
	<button type="submit">Suchen</button>
</form>

<p>Status: {user_state.logged_in}</p>
<p>ID: {data.user_id}</p>

<a href="/login">Login</a>
