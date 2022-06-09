<script lang="ts">
    import type {Writable} from 'svelte/store';

    export let drawerSlot: Writable<number>; // configure to be usable by main transaction: use ternary operator  
    export let name: string; // IS THIS THE NAME OF THE MONEY VALUE FOUND IN THE TILL STORE?
    export let step: number;
    export let editable: boolean;

    const minimum: number = 0;
    
    $: slotTotal = Math.round(100 * Number($drawerSlot)) / 100 || 0; // Dollar value Total for this slot; default to an empty slot
    $: slotDisplay = "$ ".concat(String(slotTotal.toFixed(2)));

    $: validatedIn = slotTotal; // validated input

    const validate = function(event: any):void{ // validate user input and alter the value in the drawer store
        event.preventDefault();
        validatedIn = Number(validatedIn) || 0; // ensures the validated input is always a number even if a letter key is pressed
        drawerSlot.update(n => n = Math.round(100 * validatedIn) / 100);
    }

    const directlyEditable = function(){
        return !editable;
    }
</script>

<span>
    <input 
        
        class="money-in"
        type="number"
        inputmode="numeric"
        name={name}
        bind:value={validatedIn} 
        placeholder={'$ 0.00'}
        min={minimum}
        step={step}
        on:input={validate}
        readonly={directlyEditable()}
        >
    <p class="slot-value">{slotDisplay}</p>
</span>

<style>
    .money-in{
        width: 5rem;
        height: min-content;
    }
    .slot-value{
        width: max-content;
    }
</style>