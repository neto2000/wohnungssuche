<script>
    import FlatList from '../../../lib/components/flat_list.svelte';


	const {data} = $props()

</script>

<div class="center">
<div style="width:60vw">
	<p style="font-size: 20px;">Favoriten:</p>

	{#each data.data as flat}
		<FlatList flat={flat} />
	{/each}
</div>
</div>

<style>

.center {

	display: flex;
	justify-content: center;

}

</style>
