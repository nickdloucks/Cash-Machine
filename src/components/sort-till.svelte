<script lang="ts">
    import NumberBox from './number-input-box.svelte';
</script>

<form>
    
    <label for="price">Price:</label><svelte:component this={NumberBox} value={0} name={'price'}></svelte:component>
    
    <label for="paid">Cash given:</label><svelte:component this={NumberBox} value={0} name={'paid'}></svelte:component>
    
    <h4>Cash in drawer:</h4>
    // DYNAMICALLY RENDER THIS LIST FROM THE LIST OF COIN/BILL TYPES WHICH WILL BE IN THE STORE
    <ol> 
        <li><label for="pennies">pennies</label><input type="number" name="pennies"></li>
        <li><label for="nickles">nickles</label><input type="number" name="nickles"></li>
        <li><label for="dimes">dimes</label><input type="number" name="dimes"></li>
        <li><label for="quarters">quarters</label><input type="number" name="quarters"></li>
        <li><label for="1-dollar-bills">$1 bills</label><input type="number" name="1-dollar-bills"></li>
        <li><label for="5-dollar-bills">$5 bills</label><input type="number" name="5-dollar-bills"></li>
        <li><label for="10-dollar-bills">$10 bills</label><input type="number" name="10-dollar-bills"></li>
        <li><label for="20-dollar-bills">$20 bills</label><input type="number" name="20-dollar-bills"></li>
        <li><label for="50-dollar-bills">$50 bills</label><input type="number" name="50-dollar-bills"></li>
        <li><label for="100-dollar-bills">$100 bills</label><input type="number" name="100-dollar-bills"></li>
    </ol>
    <button id="calc-change" class="good-button">Make Change</button>

</form>