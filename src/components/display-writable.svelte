<script lang="ts">
    import type {Writable} from 'svelte/store';
    export let storeVal: Writable<number>;
</script>

<p>{'$ '.concat($storeVal.toFixed(2))}</p>