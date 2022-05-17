<script lang="ts">
    import NumberBox from './number-input-box.svelte';
    import MoneyPile from './money-pile.svelte';
    
    // function setSlot(slotName: string, slotValue: number): void{
    //     // search cashInTill global var for the slot name
    //     // when found, update the value of the slot.
    // }

    // function makeChange(): void{ //use as event listener for a button
    //     // useTill(,, cashInTill);
    // }

    // document.getElementById('#calc-change')?.addEventListener('click', makeChange);
    // // ^ calculate change given when user clicks the "Make Change" button
</script>

<form>
    

    
    <h4>Customize Cash in drawer before sale:</h4>
    <aside>(Enter the desired dollar value in each slot.)</aside>
    <!-- DYNAMICALLY RENDER THIS LIST FROM THE LIST OF COIN/BILL TYPES WHICH WILL BE IN THE STORE -->
    <ol class="grid-container"> 
        <li class="grid-item money-in-li"><label class="money-in-label" for="pennies">pennies:</label><input class="money-in" type="number" step=0.01 name="pennies"></li>
        <li class="grid-item money-in-li"><label class="money-in-label" for="nickles">nickles:</label><input class="money-in" type="number" step=0.05 name="nickles"></li>
        <li class="grid-item money-in-li"><label class="money-in-label" for="dimes">dimes:</label><input class="money-in" type="number" step=0.10 name="dimes"></li>
        <li class="grid-item money-in-li"><label class="money-in-label" for="quarters">quarters:</label><input class="money-in" type="number" step=0.25 name="quarters"></li>
        <li class="grid-item money-in-li"><label class="money-in-label" for="1-dollar-bills">$1 bills:</label><input class="money-in" type="number" step=1.0 name="1-dollar-bills"></li>
        <li class="grid-item money-in-li"><label class="money-in-label" for="5-dollar-bills">$5 bills:</label><input class="money-in" type="number" step=5.0 name="5-dollar-bills"></li>
        <li class="grid-item money-in-li"><label class="money-in-label" for="10-dollar-bills">$10 bills:</label><input class="money-in" type="number" step=10.0 name="10-dollar-bills"></li>
        <li class="grid-item money-in-li"><label class="money-in-label" for="20-dollar-bills">$20 bills:</label><input class="money-in" type="number" step=20.0 name="20-dollar-bills"></li>
        <li class="grid-item money-in-li"><label class="money-in-label" for="50-dollar-bills">$50 bills:</label><input class="money-in" type="number" step=50.0 name="50-dollar-bills"></li>
        <li class="grid-item money-in-li"><label class="money-in-label" for="100-dollar-bills">$100 bills:</label><input class="money-in" type="number" step=100.0 name="100-dollar-bills"></li>
    </ol>
    <svelte:component this={MoneyPile} editable={true}></svelte:component>
</form>

<style>
    .money-in{
        width: 100px;
        height: min-content;
    }
    .money-in-label{
        width: max-content;
        display: inline-block;
        height: max-content;
    }
    .money-in-li{
        width: min-content;
        
    }
    aside{
        font-size: 0.5rem;
    }

</style>