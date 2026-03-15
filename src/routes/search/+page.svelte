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

<div class="main-container">

	<div class="options-box">	

		<div class="search-container">
			<div class="search-element">

				<input class="city-input" type="text" placeholder="Stadt" bind:value={search_city}>

				<button class="filter-button" onclick={() => {show_filters = !show_filters}}>Filter</button>
				
				<button class="search-button" onclick={search}>Suchen</button>
				
			</div>

		</div>

		{#if show_filters}
		<div class="filter-container">
			
			<div class="filter-abschnitt">
				<p>Preis: </p>
				<input class="filter-input" type="text" bind:value={search_price_UG}>
				<p>-</p>
				<input class="filter-input" type="text" bind:value={search_price_OG}>
			</div>


			<div class="filter-abschnitt">
				<p>Fläche: </p>
				<input class="filter-input" type="text" bind:value={search_area_UG}>
				<p>-</p>
				<input class="filter-input" type="text" bind:value={search_area_OG}>
			</div>


			<div class="filter-abschnitt">
				<p>Räume: </p>
				<input class="filter-input" type="text" bind:value={search_rooms_UG}>
				<p>-</p>
				<input class="filter-input" type="text" bind:value={search_rooms_OG}>
			</div>


			<div class="filter-abschnitt">
				<p>Verfügbar ab: </p>
				<input class="filter-input" style="width: 110px;" type="date" bind:value={search_available_from_UG}>
				<p>-</p>
				<input class="filter-input" style="width: 110px;" type="date" bind:value={search_available_from_OG}>
			</div>


			<div class="filter-abschnitt">
				<p>Erstellt am: </p>
				<input class="filter-input" style="width: 110px;" type="date" bind:value={search_created_at_UG}>
				<p>-</p>
				<input class="filter-input" style="width: 110px;" type="date" bind:value={search_created_at_OG}>
			</div>
		</div>
		{/if}

		<div style="display: flex; flex: 0 0 auto; justify-content: space-between;">
			<select class="select" bind:value={sort_type} onchange={search}>
				<option value="price_asc">Preis aufsteigend</option>
				<option value="price_desc">Preis absteigend</option>

				<option value="rooms_asc">Räume aufsteigend</option>
				<option value="rooms_desc">Räume absteigend</option>

				<option value="area_asc">Fläche aufsteigend</option>
				<option value="area_desc">Fläche absteigend</option>

				<option value="created_at_asc">Erstellt am aufsteigend</option>
				<option value="created_at_desc">Erstellt am absteigend</option>

				<option value="available_from_asc">Beziehbar ab aufsteigend</option>
				<option value="available_from_desc">Beziehbar ab absteigend</option>
			</select>
			
			<p class="flat-count">{flats.length} Wohnungen gefunden</p>
		</div>
	</div>

	<div class="flat-list">

		{#each flats as flat}
			<FlatList flat = {flat}/>
		{/each}
	</div>

</div>

<style>

.main-container {

	display: flex;

	flex-direction: column;

	justify-content: center;
	align-items: center;
}

.options-box {

	width: 61vw;

	margin-top: 65px;
}

.search-container {
	
	display: flex;

	/* margin-left: 7vw; */

	margin-bottom: 15px;
}

.filter-container {
	
	display: flex;

	/* margin-left: 7vw; */

	align-items: center;

	margin-bottom: 15px;

	gap: 10px;
}

.filter-abschnitt {

	display: flex;

	align-items: center;

}


.select {
	
	background-color: white;
	
	border: 1px solid #aaaaaa;

	border-radius: 8px;

	height: 30px;
	
	padding: 4px;

	color: #555555;

	cursor: pointer;

}

.flat-list {

	align-items: center;
	
	display: flex;

	flex-direction: column;

	width: 60vw;

	margin-top: 30px;
	margin-bottom: 80px;

	gap: 15px;
}

.search-element {
	display: flex;

	gap: 18px;
}


.city-input {

	border-radius: 20px;

	border: 1px solid black;

	padding: 10px;
}

.filter-input {
	border-radius: 20px;

	border: 1px solid black;

	padding: 10px;

	width: 60px;

	height: 20px;

	margin: 0px 6px;

}

.search-button {

	border: 1px solid;

	padding: 8px 20px;

	border-color: purple;
	background-color: purple;
	border-radius: 25px;

	color: #ffffff;
	text-decoration: none;

	cursor: pointer;

	font-family: "Google Sans", sans-serif;

}
.filter-button {

	border: 1px solid;

	padding: 8px 20px;

	border-color: black;
	background-color: white;
	border-radius: 25px;

	color: black;
	text-decoration: none;

	cursor: pointer;

	font-family: "Google Sans", sans-serif;

}

.flat-count {

	color: #666666;

	font-size: 14px;
}


</style>
