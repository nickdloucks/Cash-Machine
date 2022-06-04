<script lang="ts">
    import type {Writable} from 'svelte/store';

    export let drawerSlot: Writable<number>; // configure to be usable by main transaction: use ternary operator  
    export let name: string; // IS THIS THE NAME OF THE MONEY VALUE FOUND IN THE TILL STORE?
    export let step: number;
    export let editable: boolean;

    export const minimum: number = 0;
    
    const ELEMENT_ID = name.concat('-input-box');

    let slotTotal: number = Number($drawerSlot); // Dollar slotTotalue for this slot; default to an empty slot
    let slotDisplay: string = "$ ".concat(String(slotTotal.toFixed(2)));
    // VALIDATE INPUT ON SUBMIT AND PREVENT PAGE LOAD
    
    const directlyEditable = function(){
        return !editable;
    }
</script>

<input 
    id={ELEMENT_ID}
    class="money-in"
    type="number"
    name={name}
    bind:value={$drawerSlot} 
    placeholder={slotDisplay}
    min={minimum}
    step={step}
    inputmode="numeric"
    readonly={directlyEditable()}
    >

<style>
    .money-in{
        width: 5rem;
        height: min-content;
    }
</style>