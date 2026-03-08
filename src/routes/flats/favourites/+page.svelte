<script>
    import FlatList from '../../../lib/components/flat_list.svelte';


	const {data} = $props()

</script>

<div>
	<p>Favoriten</p>

	{#each data.data as flat}
		<FlatList flat={flat} />
	{/each}
</div>
