<script>
	
	import {invalidateAll} from '$app/navigation'

	let {data} = $props()

	async function favourite() {
		
		console.log(data.is_fav)

		if (data.is_fav) {

			await fetch("/flats/favourites", {

				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					flat_id: data.data.flat_id
				})

			})
		}
		else {
			
			await fetch("/flats/favourites", {

				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					flat_id: data.data.flat_id
				})

			})


		}

		await invalidateAll()
	}

</script>

<svelte:head>
	<title>{data.data.title}</title>
</svelte:head>

<div>

	<p>{data.data.title}</p>
	 
	<p>{data.data.description}</p>

	<div style="display: flex; ">

		<p style="margin-right: 10px;">{data.data.price}€</p>
		<p style="margin-right: 10px;">{data.data.rooms}</p>
		<p style="margin-right: 10px;">{data.data.area} m²</p>

	</div>

	<p>{data.data.zip_code} {data.data.city}</p>

	<p>vermietet von {data.data.user_name}</p>

	{#each data.img_paths as path}
		<img src={"/uploads/" + path.file_path} alt="">	
	{/each}

	
	{#if data.logged_in}
		 
		<button onclick={favourite}>Favorit</button>
	{/if}


</div>
