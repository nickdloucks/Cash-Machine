<script lang="ts">
    import type { MoneyInstance } from "../global";

    export let pile: Array<MoneyInstance> | [] = [];

    function classifyMoney(moneyType: string): string{
        switch(moneyType){
            case 'PENNY': return "penny-picture";
            case 'NICKEL': return "cent-picture nickel-picture"
            case 'DIME':
            case 'QUARTER': return "cent-picture";
            default: return 'dollar-picture';
        }
    }

</script>

{#if pile.length}
<h4>Change Given:</h4>
<ol class="grid-container">
    {#each pile as billCoin}
        <li>
            <p>{billCoin[0]}</p>
            <p class={classifyMoney(billCoin[0])}>{'$'.concat(String(Number(billCoin[1]).toFixed(2)))}</p>
        </li>
    {/each}
</ol>

{:else}
<p>No change given yet, or no change was due. Make a transaction.</p>
{/if}

<style>
    h4{
        color: #00ff00;
    }
    /* .money-picture{
        background-color: #cccccc;
        font-weight: bold;
        width: fit-content;
        color: #000000;
        height: 6rem;
    } */
    .cent-picture{
        font-size: 1rem;
        font-weight: bold;
        color: #000;
        display: grid;
        background-image: linear-gradient(45deg, #cccccc, #818181, #111111);
        border-radius: 100%;
        border: 2px dotted #cccccc;
        height: 3.5rem;
        width: 3.5rem;
        text-justify: auto;
        text-align: center;
        align-content: center;
        justify-content: center;
    }
    .dollar-picture{
        font-size: 1rem;
        font-weight: bold;
        color: #000;
        display: grid;
        background-color: #008800;
        border-radius: 5%;
        border: 5px solid #556b2f;
        height: fit-content;
        align-content: center;
        justify-content: center;
    }
    .penny-picture{
        font-size: 1rem;
        font-weight: bold;
        color: #000;
        display: grid;
        background-image: linear-gradient(45deg,  #ffb200, #8b3613, #ff6100);
        border-radius: 100%;
        border: 2px solid #8b3613;
        height: 3.5rem;
        width: 3.5rem;
        align-content: center;
        justify-content: center;
    }
    .nickel-picture{
        border: 2px solid #cccccc;
    }
</style>