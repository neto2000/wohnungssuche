<script>
    import FlatList from "../../lib/components/flat_list.svelte";

	import { onMount } from "svelte";
	import { page } from '$app/state';


	let search_city = $state("")
	
	let search_area_UG = $state(0)
	let search_area_OG = $state(10000) 
	let search_price_UG = $state(0)
	let search_price_OG = $state(5000000)
	let search_rooms_UG = $state(0)
	let search_rooms_OG = $state(100)
	let search_created_at_UG = $state("1970-01-01")
	let search_created_at_OG = $state("2030-01-01")
	let search_available_from_UG = $state("1970-01-01")
	let search_available_from_OG = $state("2030-01-01")

	let sort_type = $state("created_at_desc")
	
	let show_filters = $state(false)

	onMount(() => {

		search_city = page.url.searchParams.get("search")

		if (search_city == null) {
			
			search_city = ""
		}
		
		search()
	})


	let flats = $state([])


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
				sort: sort_type,

			}) 
		})

		let data = await res.json()	

		console.log(data)	

		flats = data.flats

	}
</script>

<div>

	<p>x Wohnungen in Stadt</p>

	<div class="search-container">
		<div class="search-element">

			<input class="city-input" type="text" placeholder="Stadt" bind:value={search_city}>

			<button onclick={() => {show_filters = !show_filters}}>Filters</button>
	
		</div>
		

		
		<select bind:value={sort_type} onchange={search}>
			<option value="price_asc">Preis aufsteigend</option>
			<option value="price_desc">Preis absteigend</option>

			<option value="rooms_asc">Räume aufsteigend</option>
			<option value="rooms_asc">Räume absteigend</option>

			<option value="area_asc">Fläche aufsteigend</option>
			<option value="area_desc">Fläche absteigend</option>

			<option value="created_at_asc">Erstellt am aufsteigend</option>
			<option value="created_at_desc">Erstellt am absteigend</option>

			<option value="available_from_asc">Beziehbar ab aufsteigend</option>
			<option value="available_from_desc">Beziehbar ab absteigend</option>
		</select>


		<button onclick={search}>Suchen</button>
	</div>

	{#if show_filters}
	<div class="search-element">

		<p>Preis</p>
		<input class="filter-input" type="text" bind:value={search_price_UG}>
		<p>-</p>
		<input class="filter-input" type="text" bind:value={search_price_OG}>


		<p>Fläche</p>
		<input class="filter-input" type="text" bind:value={search_area_UG}>
		<p>-</p>
		<input class="filter-input" type="text" bind:value={search_area_OG}>


		<p>Räume</p>
		<input class="filter-input" type="text" bind:value={search_rooms_UG}>
		<p>-</p>
		<input class="filter-input" type="text" bind:value={search_rooms_OG}>


		<p>Verfügbar ab</p>
		<input class="filter-input" type="date" bind:value={search_available_from_UG}>
		<p>-</p>
		<input class="filter-input" type="date" bind:value={search_available_from_OG}>


		<p>Erstellt am</p>
		<input class="filter-input" type="date" bind:value={search_created_at_UG}>
		<p>-</p>
		<input class="filter-input" type="date" bind:value={search_created_at_OG}>
	</div>
	{/if}
	<div class="flat-list">

		{#each flats as flat}
			<FlatList flat = {flat}/>
		{/each}
	</div>

</div>

<style>

.search-container {
	
	display: flex;

	margin-left: 6vw;
}

.flat-list {

	align-items: center;
	
	display: flex;

	flex-direction: column;

	width: 50vw;

	margin-top: 40px;
	margin-left: 10vw;

	gap: 10px;
}

.search-element {
	display: flex;
}


.city-input {

	border-radius: 20px;

	border: 1px solid black;

	padding: 10px
}

.filter-input {
	
	width: 50px;

}

</style>
