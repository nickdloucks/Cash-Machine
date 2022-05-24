<script lang="ts">
    import type {Writable} from 'svelte/store';

    let inputBox;

    export let drawerSlot: Writable<number>; // configure to be usable by main transaction: use ternary operator
    export let value: number = 0.1;
    export let name: string; // IS THIS THE NAME OF THE MONEY VALUE FOUND IN THE TILL STORE?
    export let step: number;
    export const minimum: number = 0;

    // VALIDATING INPUT FUNCTION

    // export let editable: boolean = false;
    // handler function for updating till slot value connected to this input,
    // or figure out how to link it to a devrived store variable
</script>

<input 
    bind:this={inputBox}
    class="money-in"
    type="number" 
    name={name}
    bind:value={$drawerSlot} 
    placeholder={"$ ".concat(String(value))}
    min={minimum}
    step={step}
    >

<style>
    .money-in{
        width: 5rem;
        height: min-content;
    }
</style>