<script lang="ts">
    import type {Writable} from 'svelte/store';
    import { default as makeChange } from '../make-change';
    import { price, paid, cashInTill, changePile, drawerSlots } from '../stores/cash-drawer';
    import type { MoneyInstance } from '../global'

    $: prodPrice = $price as number; // price of the product
    $: cashGiven = $paid as number; // payment given by customer
    let change: Array<MoneyInstance> | [];
    
    // let slotNum = 0;
    // const currentSlot = function(index: number = slotNum){
    //     return drawerSlots[index];
    // }

    let [p,n,d,q,o,f,t,tw,h] = drawerSlots;
    $: totPennies = Number($p);
    $: totNickles = Number($n);
    $: totDimes = Number($d);    
    $: totQuarters = Number($q);
    $: totOnes = Number($o);    
    $: totFives = Number($f);
    $: totTens = Number($t);    
    $: totTwenties = Number($tw);
    $: totHundreds = Number($h);




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
        ]

        drawerBuffer.forEach((money) => {
            console.log(money[0], ' ', money[1])
        })
            
        
        console.log('value:  ^')
        return;
        
        // copy the list of money slots in the cash drawer as well as their current values
        //^ NB: the buffer array above will be mutated during the makeChange function execution. 
        // It's value will need to be written to the store after the makeChange function has run.
        let transaction = makeChange(prodPrice, cashGiven, drawerBuffer);
        change = transaction.change; // update store value
        // cashInTill.forEach((storeVal)=>storeVal.update(n => n= newVal))
        console.log('Till status: '.concat(transaction.status, transaction.message as string))
        console.log(...change);
    }
</script>

<button class="good-button" id="calc-change" on:click={drawerInterface}>Make Change</button>