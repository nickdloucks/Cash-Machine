<script lang="ts">
    export let value: number = 0.1;
    export let name: string;
    export const minimum: number = 0;
</script>

<input type="number" name={name} placeholder={String(value)} value={value}>