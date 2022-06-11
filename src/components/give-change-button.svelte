<script lang="ts">
    import { default as makeChange } from '../utilities/make-change';
    import { price, paid, drawerSlots } from '../stores/cash-drawer';
    import type { MoneyInstance } from '../global';
    import MoneyPile2 from './money-pile2.svelte';
    import { default as precise } from '../utilities/precise'; // tool for keeping Javascript numbers precise when they are decimals


    $: prodPrice = $price as number; // price of the product
    $: cashGiven = $paid as number; // payment given by customer


    // destructure array of slot store values and create a reactive, numeric variable for each:
    let [p,n,d,q,o,f,t,tw,h] = drawerSlots;
    // These Writable<number> stores need to be converted to primitive numbers for use in the make-change program.
    $: totPennies = Number($p);
    $: totNickles = Number($n);
    $: totDimes = Number($d);    
    $: totQuarters = Number($q);
    $: totOnes = Number($o);    
    $: totFives = Number($f);
    $: totTens = Number($t);    
    $: totTwenties = Number($tw);
    $: totHundreds = Number($h);
    // ^ Not the most elegant solution, but store values have to be defined/ subscribed to/ declared 
    // at the top level of the component in the version of Svelte that I am using. Thus, abstracting this out
    // with a loop or callback function would not work.

    // TO-DO: CREATE DEBUGGING DISPLAY FOR drawerBuffer
    $: status = 'OPEN';
    $: errorMessage = '';
    $: message = errorMessage || '';
    
    // Array representing change given to customer after a sale:
    let changePile: Array<MoneyInstance> | [] = [];

    function stackUpChange(newPile: Array<MoneyInstance>){
        changePile.length = 0; // delete the record of change given on the previous transaction
        changePile = [...newPile]; // update the changePile to the new set of money given out by the most recent transaction
    }

    $: pileOfChange = changePile; // reactive to any updates to the changePile, which is updated with each transaction

    function drawerInterface(event: MouseEvent): void {
        event.preventDefault();

        let drawerBuffer: Array<MoneyInstance> = [
            // needs to be inside handler function to copy values w/o breaking relationship between the reactive variables above and the storeVals
            ['PENNY', totPennies],
            ['NICKEL', totNickles],
            ['DIME', totDimes],
            ['QUARTER', totQuarters],
            ['ONE', totOnes],
            ['FIVE', totFives],
            ['TEN', totTens],
            ['TWENTY', totTwenties], // ADD $50 BILL SPOT
            ['ONE HUNDRED', totHundreds],
        ];
              
        
        // copy the list of money slots in the cash drawer as well as their current values
        //^ NB: the buffer array above will be mutated during the makeChange function execution. 
        // It's value will need to be written to the store after the makeChange function has run.
        let transaction = makeChange(prodPrice, cashGiven, drawerBuffer);
        let change: Array<MoneyInstance> | [] = transaction.change; // update store value
        stackUpChange(change);

        status = transaction.status;

        if(transaction.message){
            console.log('error message:', transaction.message as string);
            errorMessage = transaction.message;
            return; // if there is an error message, cancel the transaction without taking money out of the drawer
        }else{
            errorMessage = ''; // make sure the error message does not remain on screen from a previous error
        }
        console.log('change given:', ...change);
        console.log('remaining in drawer: ', ...drawerBuffer)
        drawerSlots.forEach((slot, index)=>{
            // if this block is reached, money needs to be taken out of the drawer
            slot.update(n => precise(drawerBuffer[index][1] as number));
            // use the drawerBuffer to update the state of the cash drawer and the change pile
        });
        return;
    }
</script>

<button class="good-button" id="calc-change" on:click={drawerInterface}>Make Change</button>
<p>Drawer Status: {status}</p>
{#if (errorMessage.length)}
    <p class='error-message'>{message}</p>
{/if}
<svelte:component this={MoneyPile2} pile={pileOfChange}></svelte:component>

<style>
    .error-message{
        color: #ff0000;
        font-family: 'Courier New', Courier, monospace;
        font-size: 1rem;
        font-weight: bold;
    }
</style>