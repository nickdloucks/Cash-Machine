<script lang="ts">
    import type {Writable} from 'svelte/store';

    export let drawerSlot: Writable<number>; // configure to be usable by main transaction: use ternary operator  
    export let name: string;
    export let billCoinVal: number; // the dollar value of one bill or coin in this drawer slot. EX: a penny slot's "billCoinVal" would be ($) 0.01
    export let editable: boolean; // WHAT IF EDITABLE PROP IS NOT PROVIDED??

    const minimum: number = 0;
    

    $: slotTotal = Math.round(100 * Number($drawerSlot)) / 100 || 0; // Dollar value Total for this slot; default to an empty slot
    $: slotDisplay = "$ ".concat(String(slotTotal.toFixed(2)));
    $: remainder = slotTotal % billCoinVal;

    const validate = function(event: MouseEvent):void{ // validate user input and alter the value in the drawer store
        event.preventDefault();

        if((remainder) !== 0){
            slotTotal -= (remainder);
        }

        drawerSlot.update(n => n = Math.floor(100 * slotTotal) / 100);
    }

    const directlyEditable = function(){
        return !editable;
    }
</script>

<span>
    <label for={name}>{name}</label>
    <input 

        class="money-in"
        type="number"
        inputmode="numeric"
        name={name}
        bind:value={slotTotal} 
        placeholder={'$ 0.00'}
        min={minimum}
        step=1

        readonly={directlyEditable()}
        >
    <button on:click={validate}>set</button>
    <p>{slotDisplay}</p>
    <p>{$drawerSlot}</p>
    <p>{remainder}</p>
</span>