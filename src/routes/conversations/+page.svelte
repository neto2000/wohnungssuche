<script>

	let { conversations } = $props();


</script>

<div class="main-grid">

	<div class="conn-bar">

		{#each conversations as conversation}

			<div class="conn">
				<div>
					<p>title</p>
					<p>{conversation}</p>

				</div>
				<div>

					<p>new message</p>

				</div>
			</div>

		{/each}

	</div>

	<div class="chat-container">

	</div>


</div>


<style>
	
.main-grid {

	display: grid;

	grid-template-columns: 20vw 80vw;

	flex-grow: 1;
}

.conn-bar {

	display: flex;

	flex-direction: column;

	flex-grow: 1;

	border-right: 1px solid black;
}

.conn {

	border-bottom: 1px solid gray;

	padding: 5px 30px;

	display: flex;

	justify-content: space-between;
}

</style>
