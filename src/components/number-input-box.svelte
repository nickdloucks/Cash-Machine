<script lang="ts">
    import type {Writable} from 'svelte/store';
    import DisplayWritable from './display-writable.svelte';


    export let drawerSlot: Writable<number>; // configure to be usable by main transaction: use ternary operator  
    export let name: string; // IS THIS THE NAME OF THE MONEY VALUE FOUND IN THE TILL STORE?
    export let step: number;
    export let editable: boolean;

    const minimum: number = 0;
    
    const ELEMENT_ID = name.concat('-input-box');

    $: slotTotal = Number($drawerSlot); // Dollar slotTotal for this slot; default to an empty slot
    $: slotDisplay = "$ ".concat(String(slotTotal.toFixed(2)));
    // VALIDATE INPUT ON SUBMIT AND PREVENT PAGE LOAD
    
    const directlyEditable = function(){
        return !editable;
    }
</script>

<span>
    <input 
        id={ELEMENT_ID}
        class="money-in"
        type="number"
        inputmode="numeric"
        name={name}
        bind:value={$drawerSlot} 
        placeholder={'$ 0.00'}
        min={minimum}
        step={step}

        readonly={directlyEditable()}
        >
    <!-- <svelte:component this={DisplayWritable} storeVal={drawerSlot}></svelte:component> -->
    <p>{slotDisplay}</p>
</span>

<style>
    .money-in{
        width: 5rem;
        height: min-content;
    }
</style>