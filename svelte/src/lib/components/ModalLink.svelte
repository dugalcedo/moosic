<script>
    export let id

    import store from "../store";


</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<a href="#" on:click|preventDefault={() => {
    $store.modal = id
}}>
    <slot />
</a>
