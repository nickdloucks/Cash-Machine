<script lang="ts">
    import type {Writable} from 'svelte/store';
    export let storeVal: Writable<number>;
</script>

<p>{$storeVal}</p>