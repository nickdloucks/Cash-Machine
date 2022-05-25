<script lang="ts">
    import type {Writable} from 'svelte/store';

    let inputBox: HTMLInputElement;

    export let drawerSlot: Writable<number>; // configure to be usable by main transaction: use ternary operator
    export let val: number = Number($drawerSlot); // Dollar value for this slot; default to an empty slot
    export let name: string; // IS THIS THE NAME OF THE MONEY VALUE FOUND IN THE TILL STORE?
    export let step: number;
    export const minimum: number = 0;

    // VALIDATE INPUT ON SUBMIT AND PREVENT PAGE LOAD

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
    >

<style>
    .money-in{
        width: 5rem;
        height: min-content;
    }
</style>