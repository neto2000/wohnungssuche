<script>
	
	import {invalidateAll} from '$app/navigation'
	import {goto} from '$app/navigation'

    import Heart from '../../../lib/components/heart.svelte';

	let {data} = $props()

	let current_image = $state(0)

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

	async function request_conversation() {

		const res = await fetch("/conversations/request", {

			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				flat_id: data.data.flat_id
			})

		})
		
		if (res.status != 200) {

			return
		}

		goto("/conversations")

	}

	function next_picture(value) {

		if (value < 0) {

			if (current_image > 0) {

				current_image--;
			}

			return

		}

		if (current_image < data.img_paths.length - 1) {

			current_image++;

		}

		return

	}

</script>

<svelte:head>
	<title>{data.data.title}</title>
</svelte:head>

<div class="center">

	<div class="image-container">

		<button class="arrow-button" onclick={() => {next_picture(-1)}}>&lt;</button>

			{#if data.img_paths.length == 0}
				 
				<img class="image" src="https://placehold.jp/1920x1080.png" alt="">
			{:else}
				 
				<img class="image" src={"/uploads/" + data.img_paths[current_image].file_path} alt="">	
			{/if}


		<button class="arrow-button" onclick={() => {next_picture(1)}}>&gt;</button>
	</div>

	<div class="info-container">
		
		<div>

			<p class="title">{data.data.title}</p>
			
		 
			<p>{data.data.description}</p>


		</div>

		<div>

			<div class="price-box">

				<div class="price-grid">

					<p style="font-size: 20px;">Preis:</p>
					<p style="font-size: 20px;">{data.data.price}€</p>
					<p style="font-size: 20px;">Räume:</p>
					<p style="font-size: 20px;">{data.data.rooms}</p>
					<p style="font-size: 20px;">Fläche:</p>
					<p style="font-size: 20px;">{data.data.area} m²</p>

				</div>
				
				<p style="font-size: 20px; font-style: italic;">{data.data.address}, {data.data.zip_code} {data.data.city}</p>

				<div style="display: flex; justify-content: space-between; margin-top: 10px;">

					<p>Vermieter: {data.data.user_name}</p>

					{#if data.logged_in}
				 
						<button class="heart-button" onclick={favourite}><Heart filled={data.is_fav} /></button>
					
					{/if}

				</div>
			</div>



			{#if data.logged_in}
				
				<button class="request-button" onclick={request_conversation}>Anfragen</button>
			
			{/if}
			

		</div>

		
		
	</div>

</div>

<style>

.center {

	display: flex;

	flex-direction: column;


	align-items: center;
}

.image-container {
	
	display: flex;

	align-items: center;

	margin-top: 50px;
}

.image {

	width: 40vw;
	height: 45vh;

	border-radius: 20px;
}

.info-container {

	display: flex;

	justify-content: space-between;

	width: 40vw;

}


.price-box {

	display: flex;

	flex-direction: column;

	border: 1px solid black;

	border-radius: 10px;

	margin-top: 40px;

	padding: 15px 30px;

	width: 350px;
}

.price-grid {

	display: grid;

	grid-template-columns: 30% 70%;
}

.arrow-button {
	
	border: none;

	background-color: white;

	font-family: "Google Sans", sans-serif;

	font-size: 30px;
	
	margin: 0px 20px;

	cursor: pointer;
}

.arrow-button:hover {

	border: none;


	border-radius: 10px;

	background-color: #dddddd;

	font-family: "Google Sans", sans-serif;

	font-size: 30px;
	
	margin: 0px 20px;

	cursor: pointer;

}

.request-button {

	margin-top: 15px;
	margin-bottom: 50px;

	width: 100%;
	height: 40px;

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

.heart-button {

	border: none;

	background-color: white;

	cursor: pointer;
}

.title {

	font-size: 50px;
}



</style>
