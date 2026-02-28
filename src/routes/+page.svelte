<script>

	import {user_state} from '$lib/store.svelte'

	let {data} = $props();
	
</script>


<p>Status: {user_state.logged_in}</p>
<p>ID: {user_state.user_id}</p>

<a href="/login">Login</a>
