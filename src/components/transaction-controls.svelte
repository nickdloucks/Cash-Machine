<script lang="ts">
    import NumberBox from './number-input-box.svelte';
    import { price, paid } from '../stores/cash-drawer';
    import GiveChangeButton from './give-change-button.svelte';
</script>

<section class="wrapper">
    <section class="grid-container main-sale">
        <span class="grid-item main-sale-in">
            <label class="money-in-label" for="price">Price:</label>
            <svelte:component 
                this={NumberBox} 
                name={'price'} 
                step={0.01} 
                drawerSlot={price}
                editable={true}></svelte:component>
        </span>
        <span class="grid-item main-sale-in">
            <label class="money-in-label" for="paid">Paid:</label>
            <svelte:component 
                this={NumberBox} 
                name={'paid'} 
                step={0.01} 
                drawerSlot={paid}
                editable={true}></svelte:component>
        </span>   
    </section>
    <svelte:component this={GiveChangeButton}></svelte:component>
</section>

<style>
    .wrapper{
        background-image: linear-gradient(80deg, #818181, #313131, #111111);
        margin: 0;
    }
    button{
        width: max-content;
    }
    .main-sale{
        margin: 0px;
        background-color: #000000;
        border-radius: .25rem;
        padding: 1.5em;
        height: max-content;
    }
    .main-sale-in{
        width: fit-content;
    }
</style>