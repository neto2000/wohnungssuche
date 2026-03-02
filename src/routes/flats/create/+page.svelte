<script>

	import { user_state } from '$lib/store.svelte';
    import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
	import {goto} from '$app/navigation'

	onMount(() => {

		if (!user_state.logged_in) {
			
			goto("/login")
		}
	})


	let files = $state()
	let previewUrl = $state([])



	function display_image() {

		for (let i = 0; i < files.length; i++) {

			previewUrl.push(URL.createObjectURL(files[i]));
		}

		console.log(previewUrl)
	}
	

	async function upload_images() {

		const formData = new FormData();

		if (!previewUrl.length) {

			return []
		}


		for (let i = 0; i < previewUrl.length; i++) {

			const res = await fetch(previewUrl[i])

			const blob = await res.blob()

			formData.append('image', blob);
		}

		
		const res = await fetch('/image/upload', {
			method: 'POST',
			body: formData 	
		});

		if (res.status != 200) {

			console.log("error")
		} 		


		const data = await res.json();

		return data.paths

	}

	
	onDestroy(() => {
		if (previewUrl) {

			for(let i = 0; i < previewUrl.length; i++) {

				URL.revokeObjectURL(previewUrl[i]);
			}

		}
	});



	let title = $state("")
	let desc = $state("")
	let city = $state("")
	let address = $state("")
	let zip_code = $state("")
	let rooms = $state(0)
	let area = $state(0)
	let price = $state(0)
	let available_from = $state("1971-01-01")


	async function create_flat() {
		
		const paths = await upload_images();	
		
		const now = new Date();

		const date = now.toISOString().slice(0, 19).replace('T', ' ');

		const res = await fetch('/flats/create', {
			
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_id: user_state.user_id,
				title: title,
				desc: desc,
				city: city,
				address: address,
				zip_code: zip_code,
				rooms: rooms,
				area: area,
				price: price,
				available_from: available_from,
				created_at: date,
				paths: paths
			}) 
		})

	}
	
</script>

<p>title</p>
<input type="text" bind:value={title}>

<p>desc</p>
<textarea bind:value={desc}></textarea>

<p>city</p>
<input type="text" bind:value={city}>

<p>address</p>
<input type="text" bind:value={address}>

<p>zip code</p>
<input type="text" bind:value={zip_code}>

<p>rooms</p>
<input type="number" bind:value={rooms}>

<p>area</p>
<input type="number" bind:value={area}>

<p>price</p>
<input type="number" bind:value={price}>

<p>Verfügbar ab</p>
<input type="date" bind:value={available_from}>


{#each previewUrl as u}

	<img src={u} alt="not loaded">
{/each}


<input type="file" bind:files onchange={() => {display_image()}} accept=".png,.jpg,.webm">

<button onclick={create_flat}>submit</button>
