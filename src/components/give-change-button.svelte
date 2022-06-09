<script lang="ts">
    import type {Writable} from 'svelte/store';
    import { default as makeChange } from '../make-change';
    import { price, paid, cashInTill, changePile, drawerSlots } from '../stores/cash-drawer';
    import type { MoneyInstance } from '../global'

    $: prodPrice = $price as number; // price of the product
    $: cashGiven = $paid as number; // payment given by customer
    let change: Array<MoneyInstance> | [];
    
    let slotNum = 0;
    $: currentSlot = drawerSlots[slotNum];

    function drawerInterface(event: MouseEvent): void {
        event.preventDefault();
        let drawerBuffer: Array<MoneyInstance> = cashInTill.map((money: MoneyInstance, index: number, array)=>{ // convert type: Writable<number> ==> number
            let [name, _value] = money; // destructure the MoneyInstance for type reassignment
            slotNum = index; // change which slot is being focused on
            let bufferVal: number = Number($currentSlot); // save numeric value of current slot
            return [name as string, bufferVal]; 
            // convert value from Writable<number> to a number so it can be used in the make-change program
        });

        // for(let i = 0, i < drawerBuffer.length; i++){
        //     console.log(drawerBuffer[i][1]);
        // }
            
        
        console.log('value:  ^')
        return;
        
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