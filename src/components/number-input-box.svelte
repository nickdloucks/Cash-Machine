<script lang="ts">
    import type {Writable} from 'svelte/store';

    export let value: number | Writable<number> = 0.1;
    export let name: string; // IS THIS THE NAME OF THE MONEY VALUE FOUND IN THE TILL STORE?
    export let step: number;
    export const minimum: number = 0;
    // handler function for updating till slot value connected to this input,
    // or figure out how to link it to a devrived store variable
</script>

<input 
    class="money-in" 
    type="number" 
    name={name} 
    value={value} 
    placeholder={String(value)}
    min={minimum}
    step={step}>

<style>
    .money-in{
        width: 5rem;
        height: min-content;
    }
</style>