<script lang="ts">
    import { drawerSlots } from '../stores/cash-drawer';

    const emptyDrawer = function(event: MouseEvent): void{
        event.preventDefault();
        drawerSlots.forEach((slot): void =>{
            // set all slots to 0
            slot.set(0);
        });
    }
</script>

<button
    class="bad-button"
    on:click={emptyDrawer}
>
    Empty cash drawer
</button>
