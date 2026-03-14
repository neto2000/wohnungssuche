<script>

	let {flat} = $props();

</script>

<div class="container">

	<div>

		{#if flat.file_path == null}
			 
			<img class="image" src="https://placehold.jp/150x150.png" alt="">
		{:else}
			<img class="image" src={"/uploads/" + flat.file_path} alt="">
		{/if}


	</div>

	<div class="heading-box">
		
		<a class="heading" href={"/flats/" + flat.flat_id}>{flat.title}</a>

		
		<p>{flat.description.slice(0,100)}</p>

		<p class="address">{flat.address}, {flat.city}</p>
		

	</div>

	<div class="details-box">
		
		<p>{flat.rooms} Räume</p>
		<p>{flat.area}m²</p>
		<p>{flat.price}€</p>

	</div>




</div>

<style>

.container {

	display: flex;

	/*align-items: center;*/
	
	border-style: solid;
	border-width: 1px;
	border-radius: 10px;

	width: 100%;

	padding: 10px;

	gap: 50px;

}

.heading-box {

	margin-top: 30px;

	width: 300px;
}

.details-box {

	margin-top: 30px;
	flex-grow: 1;

}

.heading {

	font-size: 30px;

	margin-bottom: 60px;

}

.address {

	font-size: 15px;
	
	margin-top: 30px;
}


.image {

	width: 200px;
	height: 200px;

	object-fit: cover;
}


p {
	

	font-size: 18px;
}

</style>
