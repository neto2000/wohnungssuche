<script>
    import FlatList from "../../lib/components/flat_list.svelte";


	let search_city = $state("")
	
	let search_price_UG = $state(0)
	let search_price_OG = $state(100000) 

	async function search() {

		const res = await fetch('/search', {
			
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				city: search_city,
			}) 
		})

		let data = await res.json()	

		console.log(data)	


	}
</script>

<div>

	<p>x Wohnungen in Stadt</p>

	<div class="search-container">
		<div class="search-element">
			<p>Stadt:</p>

			<input type="text" bind:value={search_city}>
		</div>

		<button onclick={search}>Suchen</button>
	</div>

	<div></div>

	<FlatList title="test" price=10 />
</div>

<style>

.search-container {
	
	display: flex;
}

.search-element {
	display: flex;
}

</style>
