<script lang="ts">
    import { default as makeChange } from '../make-change';
    import { price, paid, cashInTill, changePile, drawerSlots } from '../stores/cash-drawer';
    import type { MoneyInstance } from '../global'

    $: prodPrice = $price as number; // price of the product
    $: cashGiven = $paid as number; // payment given by customer
    // let change: Array<MoneyInstance> | [];

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
        // DEBUGGING:
        // drawerBuffer.forEach((money) => {
        //     console.log(money[0], ' ', money[1])
        // })
        // console.log('value:  ^')   
        
        
        
        
        // copy the list of money slots in the cash drawer as well as their current values
        //^ NB: the buffer array above will be mutated during the makeChange function execution. 
        // It's value will need to be written to the store after the makeChange function has run.
        let transaction = makeChange(prodPrice, cashGiven, drawerBuffer);
        let change: Array<MoneyInstance> | [] = transaction.change; // update store value

        
        // cashInTill.forEach((storeVal)=>storeVal.update(n => n= newVal))
        console.log('Till status: '.concat(transaction.status));
        status = transaction.status;
        if(transaction.message){
            console.log('errormessage:', transaction.message as string);
        }
        console.log('change given:', ...change);
        console.log(...drawerBuffer)
        drawerSlots.forEach((slot, index)=>{
            slot.update(n => drawerBuffer[index][1] as number);
            // use the drawerBuffer to update the state of the cash drawer
        });
        return;
    }
</script>

<button class="good-button" id="calc-change" on:click={drawerInterface}>Make Change</button>
<p>Status: {status}</p>