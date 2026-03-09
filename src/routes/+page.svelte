<script>

	import {user_state} from '$lib/store.svelte'
	import  {goto} from '$app/navigation'

	let {data} = $props();

	let search_query = $state("")

	function search(e) {
		
		e.preventDefault();

		goto('/search?search=' + search_query)
	}
	
</script>

<div class="center">
<div class="search-container">

	<form onsubmit={(e) => {search(e)}}>
		<input class="input" placeholder="Stadtname" type="text" bind:value={search_query}>
		<button class="search" type="submit">Suchen</button>
	</form>
</div>
</div>

<style>


.center {

	display: flex;

	justify-content: center;

	align-items: center;

	flex-grow: 1;

	background-image: url("/background.jpg");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}

.search-container {

	padding: 8px 8px;
	
	border: 0px solid white;

	border-radius: 30px;

	background-color: white;


}

.input {
	
	border: none;

	margin-left: 12px;
}
.input:focus {
	
	outline: none;
}


.search {
	border: 1px solid;

	padding: 8px 20px;

	border-color: purple;
	background-color: purple;
	border-radius: 25px;

	color: #ffffff;
	text-decoration: none;

	font-family: "Google Sans", sans-serif;
	
	cursor: pointer;

}

</style>

