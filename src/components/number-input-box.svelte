<script lang="ts">
    import type {Writable} from 'svelte/store';

    let inputBox: HTMLInputElement;

    export let drawerSlot: Writable<number>; // configure to be usable by main transaction: use ternary operator
    export let val: number = 0; // Dollar value for this slot; default to an empty slot
    export let name: string; // IS THIS THE NAME OF THE MONEY VALUE FOUND IN THE TILL STORE?
    export let step: number;
    export const minimum: number = 0;

    // VALIDATING INPUT FUNCTION
    
    // TODO: event needs to have a type, is setting a drawerslot and value attributes redundant? maybe inconsistent?

    function validateSlotIn(inputVal: number = val, interval: number = step): void{ // validate user input for the drawer slot
        if ((inputVal % interval) > 0){ // if user input is not evenly divisible by the money value for the current slot, round down to nearest interval
            inputBox.value = String(inputVal - (inputVal % interval));
        }
    }
    function inevent(e){
        e.target.value
    }
</script>

<input 
    bind:this={inputBox}
    class="money-in"
    type="number" 
    name={name}
    bind:value={$drawerSlot} 
    placeholder={"$ ".concat(String(val))}
    min={minimum}
    step={step}
    on:change={validateSlotIn}>

<style>
    .money-in{
        width: 5rem;
        height: min-content;
    }
</style>