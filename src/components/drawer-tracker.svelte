<script lang="ts">
    import {drawerSlots, MONEY} from '../stores/cash-drawer';
    import StoreDisplay from '../components/display-writable.svelte';
</script>

<ol>
    {#each drawerSlots as slot, index}
        <li>type: {MONEY[index][0]}, $ 
            <svelte:component this={StoreDisplay} storeVal={drawerSlots[index]}></svelte:component></li>
    {/each}
</ol>