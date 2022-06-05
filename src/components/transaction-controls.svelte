<script lang="ts">
    import type {Writable} from 'svelte/store';
    import NumberBox from './number-input-box.svelte';
    import {default as makeChange} from '../make-change';
    import * as Drawer from '../stores/cash-drawer';

    let price: number = 0;
    let cashGiven: number = 0;
    let change: Array<[string, (Writable<number> | number)]> | [];

    function changeWrapper(): void {
        let drawerBuffer = Drawer.cashInTill.slice(); 
        // : Array<[string, number]>
        drawerBuffer.forEach((money)=>{ // convert type: Writable<number> ==> number
            let [name, value] = money;
            return [name as string, value as number];
        });
        
        
        
        // forEach((money: [string, (Writable<number> | number)]) => {
        //     [money[0], money[1] as number];
        // }): Array<[string, number]>
        
        
        // copy the list of money slots in the cash drawer as well as their current values
        //^ NB: the buffer array above will be mutated during the makeChange function execution. It's value will need to be written to the store after the mackChange function has run.
        change = makeChange(price, cashGiven, drawerBuffer).change; // update store value
        // MIGHT BE A CONCURRENT MODIFFICATION PROBLEM? ERRORS GO AWAY WHEN '$' IS REMOVED FROM <cashInTill> argument
        // cashInTill = drawerBuffer;
        // tillPennies.set(change[0][1]);
    }
</script>

<section class="wrapper">
    <section class="grid-container main-sale">
        <span class="grid-item main-sale-in">
            <label class="money-in-label" for="price">Price:</label>
            <svelte:component 
                class="money-in" 
                this={NumberBox} 
                value={13.75} 
                name={'price'} 
                step={0.01} 
                drawerSlot={Drawer.price}
                editable={true}></svelte:component>
        </span>
        <span class="grid-item main-sale-in">
            <label class="money-in-label" for="paid">Paid:</label>
            <svelte:component 
                class="money-in" 
                this={NumberBox} 
                value={20} 
                name={'paid'} 
                step={0.01} 
                drawerSlot={Drawer.paid}
                editable={true}></svelte:component>
        </span>   
    </section>
    <button class="good-button main-sale-button" id="calc-change" on:click={changeWrapper}>Make Change</button>
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
    .main-sale-button{
        /* float:inline-end; */
    }
</style>