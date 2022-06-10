<script lang="ts">
    import { drawerSlots, MONEY } from '../stores/cash-drawer';
    import RandomButton from './randomize-button.svelte';
    import EmptyButton from './empty-drawer.svelte';
    import SlotInterface from './slot-interface.svelte';
</script>

<section class="money-pile-display">
    <h4>Customize Cash in Each Drawer Slot Before Sale:</h4>
    <aside>Enter the desired number of bills/coins in each slot. Inputs will be rounded to nearest integer.</aside>
    <ol class="grid-container">
        {#each drawerSlots as slot, index}
            <li class="money-in-li">
                <svelte:component 
                    this={SlotInterface}   
                    drawerSlot={slot}
                    name={MONEY[index][0]}
                    slotUnitVal={MONEY[index][1]}
                    editable={true}
                    >
                </svelte:component>
            </li>
        {/each}
    </ol>
    <svelte:component this={RandomButton}></svelte:component>
    <svelte:component this={EmptyButton}></svelte:component>
</section>

<style>
    h4, aside{
        color: #00ff00;
        font-weight: bold;
    }
    .money-pile-display{
        background-image: linear-gradient(45deg, #111111, #313131, #808080);
    }
    aside{
        font-size: 0.5rem;
    }
</style>