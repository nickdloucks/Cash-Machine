<script lang="ts">
    import type {Writable} from 'svelte/store';
    import { default as makeChange } from '../make-change';
    import { price, paid, cashInTill, changePile } from '../stores/cash-drawer';
    import type { MoneyInstance } from '../global'

    $: prodPrice = $price as number; // price of the product
    $: cashGiven = $paid as number; // payment given by customer
    let change: Array<MoneyInstance> | [];

    function drawerInterface(event: MouseEvent): void {
        event.preventDefault();
        let drawerBuffer: Array<MoneyInstance> = cashInTill.slice(); 
        drawerBuffer.forEach((money: MoneyInstance)=>{
            console.log(money[1])
        })
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
</script>

<button class="good-button" id="calc-change" on:click={drawerInterface}>Make Change</button>