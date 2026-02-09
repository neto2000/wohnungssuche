<script>
	
	let {data} = $props()

</script>

<div>

	<p>{data.title}</p>
	 
	<p>{data.description}</p>

	<div style="display: flex; ">

		<p style="margin-right: 10px;">{data.price}€</p>
		<p style="margin-right: 10px;">{data.rooms}</p>
		<p style="margin-right: 10px;">{data.area} m²</p>

	</div>

	<p>{data.zip_code} {data.city}</p>

	<p>vermietet von {data.user_name}</p>

</div>
