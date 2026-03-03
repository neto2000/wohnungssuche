<script>

	let {flat} = $props();

</script>

<div class="container">

	<a href={"/flats/" + flat.flat_id}>{flat.title}</a>

	<p>{flat.price}€</p>

	<p>{flat.city}</p>

</div>

<style>

.container {

	display: flex;

	align-items: center;
	
	border-style: solid;
	border-width: 1px;
	border-radius: 10px;

}

p {
	
	margin-left: 10px;
	margin-right: 10px;
}

</style>
