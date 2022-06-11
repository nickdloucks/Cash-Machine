<script lang="ts">
    import NumberBox from './number-input-box.svelte';
    import { price, paid } from '../stores/cash-drawer';
    import GiveChangeButton from './give-change-button.svelte';

    $: due = `$${String(Number($paid - $price).toFixed(2))}`;
</script>

<section class="wrapper">
    <section class="grid-container main-sale">
        <span class="grid-item main-sale-in">
            <label class="slot-label" for="price">Price:</label>
            <svelte:component 
                this={NumberBox} 
                name={'price'} 
                step={0.01} 
                drawerSlot={price}
                editable={true}></svelte:component>
        </span>
        <span class="grid-item main-sale-in">
            <label class="slot-label" for="paid">Paid:</label>
            <svelte:component 
                this={NumberBox} 
                name={'paid'} 
                step={0.01} 
                drawerSlot={paid}
                editable={true}></svelte:component>
        </span>  
        <span>
            Change Due: <p class="slot-value">{due}</p>
        </span>
    </section>
    <svelte:component this={GiveChangeButton}></svelte:component>
</section>

<style>
    .wrapper{
        background-image: linear-gradient(80deg, #818181, #313131, #111111);
        margin: 0;
    }
    .main-sale{
        margin: 0px;
        background-color: #000000;
        border-radius: .25rem;
        padding: 1.5em;
        height: max-content;
    }
    .slot-value{
        font-size: 1em;
        font-family: 'Courier New', Courier, monospace;
        font-weight: bold;
        width: max-content;
        color: #00ff00;
    }
    .slot-label{
        width: 4rem;
        display: inline-block;
        height: max-content;
        background-color: #000;
        border-radius: 3px;
    }
    .main-sale-in{
        width: 5rem;
        display: grid;
        border-radius: 0.5em;
        justify-content: center;
        text-align: center;
    }
</style>