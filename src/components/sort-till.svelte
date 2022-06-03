<script lang="ts">
    import NumberBox from './number-input-box.svelte';
    import { cashInTill, drawerSlots, MONEY } from '../stores/cash-drawer';
    import RandomButton from './random-button.svelte';
    import EmptyButton from './empty-drawer.svelte';
    

// function prevent(e: KeyboardEvent) {e.code != '38' && e.code != '40' && e.preventDefault();}
    // function setSlot(slotName: string, slotValue: number): void{
    //     // search cashInTill global var for the slot name
    //     // when found, update the value of the slot.
    // }

    // function makeChange(): void{ //use as event listener for a button
    //     // useTill(,, cashInTill);
    // }

    // document.getElementById('#calc-change')?.addEventListener('click', makeChange);
    // // ^ calculate change given when user clicks the "Make Change" button



    // bind:value={bill_coin[1]}
    function handleSubmit(e:SubmitEvent): void{
        e.preventDefault();
    }
</script>

<form class="money-pile-display">
    <h4>Customize Cash in drawer before sale:</h4>
    <aside>(Enter the desired dollar value in each slot. Inputs will be rounded to nearest slot value interval.)</aside>
    <ol class="grid-container">
        dynamically generated inputs:
        {#each cashInTill as bill_coin, index}
            <li class="money-in-li">
                <label class="money-in-label" for={MONEY[index][0]}>{MONEY[index][0]}</label>
                <svelte:component 
                    this={NumberBox}   
                    drawerSlot={drawerSlots[index]}
                    name={MONEY[index][0]}
                    step={MONEY[index][1]}
                    >
                </svelte:component>
            </li>
        {/each}
    </ol>
    <button class="good-button" type="submit" on:submit={handleSubmit}>Submit Changes to Till Slots</button>
    <!-- <button class="neutral-button">Generate a Random Cash Drawer State</button> -->
    <svelte:component this={RandomButton}></svelte:component>
    <!-- <button class="bad-button">Empty Cash Drawer</button> -->
    <svelte:component this={EmptyButton}></svelte:component>

</form>

<style>
    .money-pile-display{
        background-image: linear-gradient(45deg, #000000, #808080);
    }
    .money-in-label{
        width: max-content;
        display: inline-block;
        height: max-content;
    }
    .money-in-li{
        width: min-content;
        
    }
    aside{
        font-size: 0.5rem;
    }

</style>