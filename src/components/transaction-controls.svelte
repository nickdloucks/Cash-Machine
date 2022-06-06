<script lang="ts">
    import NumberBox from './number-input-box.svelte';
    import {default as makeChange} from '../make-change';
    import { price, paid, cashInTill, changePile } from '../stores/cash-drawer';
    import type { MoneyInstance } from '../global';

    $: prodPrice = $price as number; // price of the product
    $: cashGiven = $paid as number; // payment given by customer
    let change: Array<MoneyInstance> | [];

    function drawerInterface(): void {
        let drawerBuffer: Array<MoneyInstance> = cashInTill.slice(); 
        console.log(...drawerBuffer);
        return;
        drawerBuffer.forEach((money)=>{ // convert type: Writable<number> ==> number
            let [name, value] = money; // destructure the MoneyInstance for type reassignment
            return [name as string, value as number]; 
            // convert value from Writable<number> to a number so it can be used in the make-change program
        });

        
        // copy the list of money slots in the cash drawer as well as their current values
        //^ NB: the buffer array above will be mutated during the makeChange function execution. 
        // It's value will need to be written to the store after the mackChange function has run.
        let transaction = makeChange(prodPrice, cashGiven, drawerBuffer);
        change = transaction.change; // update store value
        // MIGHT BE A CONCURRENT MODIFFICATION PROBLEM? ERRORS GO AWAY WHEN '$' IS REMOVED FROM <cashInTill> argument
        // cashInTill = drawerBuffer;
        // tillPennies.set(change[0][1]);
        console.log('Till status: '.concat(transaction.status, transaction.message as string))
        console.log(...change);
    }
    // NEED DRAWER SLOT PROPS BELOW:
</script>

<section class="wrapper">
    <section class="grid-container main-sale">
        <span class="grid-item main-sale-in">
            <label class="money-in-label" for="price">Price:</label>
            <svelte:component 
                this={NumberBox} 
                 
                name={'price'} 
                step={0.01} 
                drawerSlot={price}
                editable={true}></svelte:component>
        </span>
        <span class="grid-item main-sale-in">
            <label class="money-in-label" for="paid">Paid:</label>
            <svelte:component 
                this={NumberBox} 
                
                name={'paid'} 
                step={0.01} 
                drawerSlot={paid}
                editable={true}></svelte:component>
        </span>   
    </section>
    <button class="good-button" id="calc-change" on:click={drawerInterface}>Make Change</button>
</section>

<style>
    .wrapper{
        width: 100%;
        background-image: linear-gradient(80deg, #818181, #313131, #111111);
        margin: 0;
    }
    button{
        width: max-content;
    }
    .main-sale{
        margin: 0px;
        background-color: #000000;
        border-radius: .25rem;
        padding: 1.5em;
        height: max-content;
    }
    .main-sale-in{
        width: fit-content;
    }
</style>