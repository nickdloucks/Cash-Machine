<script lang="ts">
	import CashPanel from './components/sort-till.svelte';
</script>

<main>
	<svelte:component this={CashPanel}></svelte:component>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>