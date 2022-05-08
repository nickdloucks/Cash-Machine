<script lang="ts">
    export let value: number = 0.1;
    export let name: string;
    export const minimum: number = 0;
</script>

<input class="money-in" type="number" name={name} placeholder={String(value)} value={value}>

<style>
    .money-in{
        width: 5rem;
        height: min-content;
    }
</style>