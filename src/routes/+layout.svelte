<script>
	import favicon from '$lib/assets/favicon.svg';
    import MainMenu from '../lib/components/main_menu.svelte';

	import {user_state} from '$lib/store.svelte'
    import Menu from '../lib/components/menu.svelte';

	let { data, children } = $props();

	let menu_visible = $state(false)


</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<header class="head">

	<a href="/"><img class="logo" src="/logo.webp" alt="FlatFinder"></a>
	
	<div>

		{#if data.user_id == null}

			<a class="login" href="/login">Login</a>
			<a class="register" href="/register">Registrieren</a>
		{:else}

			<button class="menu-button" onclick={() => {menu_visible = true}}><Menu color={"black"} /></button>
		{/if}

		

	</div>

</header>


{#if menu_visible} 
	<MainMenu bind:visible={menu_visible} />
{/if}	




<style>
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Stack+Sans+Text:wght@200..700&display=swap');
.head {
	
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0;

	height: 7vh;
	max-height: 70px;
	min-height: 68px;
	padding: 0px 15px;

	background: var(--bg-color);
	color: var(--fg-color);

	border-bottom: 1px solid black;
}

.menu-button {

	border: none;

	background: white;

	cursor: pointer;
}

.menu-button:hover {

	background: #eeeeee;

	border-radius: 5px;
}

.login {

	border: 1px solid;

	padding: 8px 20px;

	margin-right: 10px;

	border-color: black;
	border-radius: 25px;

	color: #000000;
	text-decoration: none;

	font-family: "Google Sans", sans-serif;
}

.register {

	border: 1px solid;

	padding: 8px 20px;

	border-color: purple;
	background-color: purple;
	border-radius: 25px;

	color: #ffffff;
	text-decoration: none;

	font-family: "Google Sans", sans-serif;

}

:global(body) {

	margin: 0;
	padding: 0;

	font-family: "Google Sans", sans-serif;

	--bg-color: #ffffff;
	--fg-color: #ffffff;
}

.logo {

height: 60px;
width: auto;

}

</style>

{@render children()}
