<script lang="ts">
	import CashPanel from './components/sort-till.svelte';
	import MoneyPile from './components/money-pile.svelte';
	import TransactionControls from './components/transaction-controls.svelte';
</script>

<main>
	<svelte:component this={TransactionControls}></svelte:component>
	<svelte:component this={CashPanel}></svelte:component>
	<svelte:component this={MoneyPile}></svelte:component>
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