<script>
	
	let {data} = $props()

</script>

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

	

</div>
