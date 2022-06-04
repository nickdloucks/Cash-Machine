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

<section class="grid-container main-sale">
    <label class="money-in-label main-sale-in" for="price">Price:</label>
    <svelte:component class="money-in" this={NumberBox} value={0} name={'price'} step={0.01} editable={true}></svelte:component>
    
    <label class="money-in-label main-sale-in" for="paid">Cash given:</label>
    <svelte:component class="money-in" this={NumberBox} value={0} name={'paid'} step={0.01} editable={true}></svelte:component>
    
    <button class="good-button main-sale-button" id="calc-change" on:click={changeWrapper}>Make Change</button>
</section>

<style>
    section{
        width: 1fr;
    }
    button{
        width: max-content;
    }
    .main-sale{
        margin: 0px;
    }
    .main-sale-in{

    }
    .main-sale-button{
        float:inline-end;
    }
</style>