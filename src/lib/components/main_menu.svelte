<script>
	

	let {visible = $bindable()} = $props()


	function log_out() {

		
	}

</script>


<div class="float">
	

	<button style="flex-grow: 1; background-color: transparent; border: none; font-size: 0;" onclick={() => {visible = false}}>Escape Menu</button>	


	<div class="menu">
		<button onclick={() => {visible = false}}>close</button>

		<button>account</button>
		<button>Anfragen</button>
		<button>Wohnung erstellen</button>
		<button>Ausloggen</button>

	</div>

</div>


<style>

	.float {
		
		position: absolute;

		display: flex;

		right: 0px;
		top: 0px;

		height: 100vh;
		width: 100vw;

	}

	.menu {
		display: flex;
		flex-direction: column;

		background-color: black;
		
		height: 100vh;
		width: 10vw
	}

</style>
