<script lang="ts">
    import NumberBox from './number-input-box.svelte';
    import { cashInTill, drawerSlots, MONEY } from '../stores/cash-drawer';
    import RandomButton from './random-button.svelte';
    import EmptyButton from './empty-drawer.svelte';
    import SlotInterface from './slot-interface.svelte';
    

    function handleSubmit(e:SubmitEvent): void{
        e.preventDefault();
    }
</script>

<section class="money-pile-display">
    <h4>Customize Cash in drawer before sale:</h4>
    <aside>Enter the desired number of bills/coins in each slot. Inputs will be rounded to nearest integer.</aside>
    <ol class="grid-container">
        {#each cashInTill as bill_coin, index}
            <li class="money-in-li">
                <!-- <label class="money-in-label" for={MONEY[index][0]}>{MONEY[index][0]}</label> -->
                <svelte:component 
                    this={SlotInterface}   
                    drawerSlot={drawerSlots[index]}

                    name={MONEY[index][0]}
                    slotUnitVal={MONEY[index][1]}
                    editable={true}
                    >
                </svelte:component>
            </li>
        {/each}
    </ol>
    <!-- <button class="good-button" type="submit" on:submit={handleSubmit}>Submit Changes to Till Slots</button> -->
    <!-- <button class="neutral-button">Generate a Random Cash Drawer State</button> -->
    <svelte:component this={RandomButton}></svelte:component>
    <!-- <button class="bad-button">Empty Cash Drawer</button> -->
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

    .money-in-li{
        width: min-content;
        
    }
    aside{
        font-size: 0.5rem;
    }

</style>