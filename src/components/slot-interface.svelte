<script lang="ts">
    import type {Writable} from 'svelte/store';
    // import validate function for event handler, test separately

    export let drawerSlot: Writable<number>; // configure to be usable by main transaction: use ternary operator  

    export let name: string;
    export let slotUnitVal: number; // the dollar value of ONE bill/coin in this particular drawer slot. EX: a penny slot's "slotUnitVal" would be ($) 0.01
    export let editable: boolean; // WHAT IF EDITABLE PROP IS NOT PROVIDED??
    


    const minimum: number = 0;
    // slot total will initially be 0, while store value for the slot is displayed to side

    $: roundedSlot = Math.round(100 * Number($drawerSlot)) / 100 || 0; // Dollar value Total for this slot; default to an empty slot
    $: slotDisplay = "$ ".concat(String(roundedSlot.toFixed(2)));


    $: validatedTotal = Math.round(roundedSlot / slotUnitVal);

    const validate = function(event: any, userInput: number = validatedTotal, unitVal: number = slotUnitVal):void{ // validate user input and alter the value in the drawer store
        event.preventDefault(); // Prevent page reload
        userInput = Number(Math.round(userInput)) || 0; // validate input: must be an integer
        let newSlotTotal = userInput * unitVal; // multiply the slot's unit value by the unit count (example: 2 $5 bills means a total slot value of $10)
        drawerSlot.update(n => n = Math.round(100 * newSlotTotal) / 100); // update the drawersSlot store value, rounded to the nearest penny
    }

    const directlyEditable = function(){
        return !editable;
    }
</script>

<li class="grid-item">
    <div class="slot-card">
        <label for={name} class="slot-label">{name}</label>
        <input 
            class="money-slot-input"
            type="number"
            inputmode="numeric"
            step=1
            name={name}
            min={minimum}
            placeholder={String(minimum)}
            bind:value={validatedTotal}
            readonly={directlyEditable()}
            on:input={validate}
            on:change={validate}
            >

        <p class="slot-value">{slotDisplay}</p>
    </div>
</li>

        <!-- <button on:click={validate}>set</button> -->

<style>
    .slot-label{
        width: max-content;
        display: inline-block;
        height: max-content;
    }
    .slot-card{
        width: min-content;
        background-image:radial-gradient(#556b2f, #008800);
        border-radius: 0.5em;
    }
    .money-slot-input{
        width: 3rem;
        height: min-content;
        
    }
    .slot-value{
        width: max-content;
    }
</style>