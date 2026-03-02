<script>
	import favicon from '$lib/assets/favicon.svg';
    import MainMenu from '../lib/components/main_menu.svelte';

	import {user_state} from '$lib/store.svelte'

	let { children } = $props();

	let menu_visible = $state(false)

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<header class="head">

	<a href="/">Home</a>
	
	<div>

		{#if !user_state.logged_in}

			<a href="/login">Login</a>
			<a href="/register">Registrieren</a>
		{:else}

			<button onclick={() => {menu_visible = true}}>Menu</button>
		{/if}

		

	</div>

</header>


{#if menu_visible} 
	<MainMenu bind:visible={menu_visible} />
{/if}	




<style>

.head {
	
	display: flex;
	justify-content: space-between;
	position: sticky;
	top: 0;
	padding: 10px 16px;
	background: var(--bg-color);
	color: var(--fg-color);
}

:global(body) {

	margin: 0;
	padding: 0;

	--bg-color: #f700e2;
	--fg-color: #ffffff;
}

</style>

{@render children()}
