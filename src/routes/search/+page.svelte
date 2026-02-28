<script>
    import FlatList from "../../lib/components/flat_list.svelte";


	let search_city = $state("")
	
	let search_area_UG = $state(0)
	let search_area_OG = $state(10000) 
	let search_price_UG = $state(0)
	let search_price_OG = $state(100000)
	let search_rooms_UG = $state(0)
	let search_rooms_OG = $state(100)
	let search_created_at_UG = $state("1970-01-01")
	let search_created_at_OG = $state("2030-01-01")
	let search_available_from_UG = $state("1970-01-01")
	let search_available_from_OG = $state("2030-01-01")

	async function search() {

		const res = await fetch('/search', {
			
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				city: search_city, 
				area: {
					ug: search_area_UG,
					og: search_area_OG
				},
				price: {
					ug: search_price_UG,
					og: search_price_OG
				},
				rooms: {
					ug: search_rooms_UG,
					og: search_rooms_OG
				},
				created_at: {
					ug: search_created_at_UG,
					og: search_created_at_OG
				},
				available_from: {
					ug: search_available_from_UG,
					og: search_available_from_OG
				},
				sort: "",

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

	<div class="flat-list">

		<FlatList title="test" price=20 />
	</div>

</div>

<style>

.search-container {
	
	display: flex;
}

.flat-list {
	
	display: flex;

	width: 200px;
}

.search-element {
	display: flex;
}

</style>
