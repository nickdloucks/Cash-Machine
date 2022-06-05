<script lang="ts">
    import { cashInTill, MONEY } from '../stores/cash-drawer';
    import type {Writable} from 'svelte/store';
    import type { MoneyInstance } from '../global';

    // export let pileType; // the type of money "pile" can be either cashInTill or changePile
    // use destructuring to access bill names/values
    let dollar_value = MONEY[0][1];

    // PASS THE STORE VALUE <changePile> to the <pile> prop here:
    export let pile: Array<MoneyInstance> | [];
    export const editable: boolean = true;
    
    $: thisPile = pile;

    function moneyCharacter(value: number): string{
        return (value >= 1) ? String.fromCharCode(0x24) : String.fromCharCode(0xA2); 
        // if input value is greater than or equal to 1, 
        // return the dollar sign character, 
        // otherwise return the cent character
    }
</script>

<h2>MONEY PILE COMPONENT:</h2>
<ol class="grid-container">
    {#each cashInTill as bill_coin, index} <!-- this should map to the pile type-->
        <li class="grid-item money-picture">{bill_coin[0].concat(` ${moneyCharacter(MONEY[index][1])} - $${MONEY[index][1].toFixed(2)} X <quantity>`)}</li>
    {/each}
</ol>


<ol class="grid-container">
    <li class="grid-item money-picture cent-picture">1&cent;</li>
    <li class="grid-item money-picture penny-picture">1&cent;</li>
    <li class="grid-item money-picture dollar-picture">1&#36;</li>
</ol>

<!-- THE CHANGEPILE IN STORE IS UNDEFINED UNTIL CHANGE IS MADE: NEED A STARTER/DEFAULT VALUE THAT IS ARRAY-LIKE IN ORDER TO MAP THIS COMPONENT OVER THE DATA -->
<!-- <ol class="grid-container">
    {#each thisPile as bill_coin, index}
        <li class="grid-item money-picture">{bill_coin[0]}:{bill_coin[1]}</li>
    {/each}
</ol> -->

<style>
    .money-picture{
        background-color: #cccccc;
        font-weight: bold;
        width: fit-content;
        color: #000000;
        height: 6rem;
    }
    .cent-picture{
        background-image: linear-gradient(45deg, #cccccc, #818181, #111111);
        border-radius: 100%;
        height: fit-content;
    }
    .dollar-picture{
        background-color: #008800;
        border-radius: 5%;
        border: 5px solid #556b2f;
        height: fit-content;
    }
    .penny-picture{
        background-image: linear-gradient(45deg,  #ffb200, #8b3613, #ff6100);
        border-radius: 100%;
        height: fit-content;
    }
</style>