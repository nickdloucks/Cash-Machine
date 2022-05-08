<script lang="ts">
    import NumberBox from './number-input-box.svelte';
</script>

<section class="grid-container main-sale">
    <label class="money-in-label main-sale-in" for="price">Price:</label><svelte:component class="money-in" this={NumberBox} value={0} name={'price'}></svelte:component>
    
    <label class="money-in-label main-sale-in" for="paid">Cash given:</label><svelte:component class="money-in" this={NumberBox} value={0} name={'paid'}></svelte:component>
    
    <button class="good-button main-sale-button" id="calc-change">Make Change</button>
</section>

<style>
    section{
        width: 1fr;
    }

    .main-sale{

    }
    .main-sale-in{

    }
    .main-sale-button{

    }
</style>