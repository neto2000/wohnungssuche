<script>

	let {flat} = $props();

</script>

<div class="container">

	<p>{flat.title}</p>

	<p>{flat.price}€</p>

</div>

<style>

.container {

	display: flex;
	
	border-style: solid;
	border-width: 1px;
	border-radius: 10px;

}

</style>
