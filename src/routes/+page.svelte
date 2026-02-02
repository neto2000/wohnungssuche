<script>

	import {user_state} from '$lib/store.svelte'

	let {data} = $props();
	
</script>

<h1>Welcome to SvelteKit</h1>

<p>Status: {user_state.logged_in}</p>

<a href="/login">Login</a>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
