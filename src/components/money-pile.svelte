<script lang="ts">
    import { cashInTill, MONEY } from '../stores/cash-drawer';

    // export let pileType; // the type of money "pile" can be either cashInTill or changePile
    // use destructuring to access bill names/values
    let dollar_value = MONEY[0][1];

    export const editable: boolean = true;

    function moneyCharacter(value: number): string{
        return (value >= 1) ? String.fromCharCode(0x24) : String.fromCharCode(0xA2); // if input value is greater than or equal to 1, 
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
    <li class="grid-item money-picture dollar-picture">1&#36;</li>
</ol>

<style>
    .money-picture{
        background-color: #cccccc;
        font-weight: bold;
        width: fit-content;
        color: #000000;
        height: 6rem;
    }
    .cent-picture{
        background-color: #cccccc;
        border-radius: 100%;
        height: fit-content;
    }
    .dollar-picture{
        background-color: #008800;
        border-radius: 5%;
        height: fit-content;
    }
</style>