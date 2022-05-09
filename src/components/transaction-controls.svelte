<script lang="ts">
    import NumberBox from './number-input-box.svelte';
    import {default as makeChange} from '../make-change';
    import { cashInTill, changePile } from '../stores/cash-drawer';

    let price: number = 0;
    let cashGiven: number = 0;
    let change: Array<[string, number]> | null;

    function changeWrapper(): void {
        change = makeChange(price, cashGiven, $cashInTill).change; // update store value
    }
</script>

<section class="grid-container main-sale">
    <label class="money-in-label main-sale-in" for="price">Price:</label><svelte:component class="money-in" this={NumberBox} value={0} name={'price'}></svelte:component>
    
    <label class="money-in-label main-sale-in" for="paid">Cash given:</label><svelte:component class="money-in" this={NumberBox} value={0} name={'paid'}></svelte:component>
    
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

    }
</style>