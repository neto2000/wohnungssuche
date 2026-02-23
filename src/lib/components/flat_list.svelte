<script>

	let {title, price} = $props();

</script>

<div class="container">

	<p>{title}</p>

	<p>{price}€</p>

</div>

<style>

.container {

	display: flex;
	
	border-style: solid;
	border-width: 1px;
	border-radius: 10px;

}

</style>
