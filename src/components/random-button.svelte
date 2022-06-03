<script lang="ts">
    import {drawerSlots, MONEY} from '../stores/cash-drawer';

    const randomize = function(): void{
        const randNum = function(val: number): number{
            // Use a money value to multiply with a randomly generated number.
            let num = Math.round((Math.random() * Math.random() - Math.random() + Math.random()) * 100);
            return (num < 0) ? 0 : num * val; // no negative values allowed
        }
        drawerSlots.forEach((slot, index: number): void =>{
            // use randomly generated numbers to change each slot value
            slot.set(randNum(MONEY[index][1]));
        });
    }
</script>

<button
    class="neutral-button"
    on:click={randomize}
>
    Randomize cash drawer
</button>
