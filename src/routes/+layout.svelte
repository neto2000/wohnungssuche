<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="head">
	<p>test</p>
	<button>Menu</button>
</header>

<style>

.head {
	
	display: flex;
	justify-content: space-between;
	position: sticky;
	top: 0;
	padding: 10px 16px;
	background: #555;
	color: #f1f1f1;
}

:global(body) {

	margin: 0;
	padding: 0;
}

</style>

{@render children()}
