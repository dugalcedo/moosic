<script>
    export let id
    export let roleCheck = null
    import store from "../store";
    const unauth = roleCheck && !roleCheck.includes($store.user?.role)

</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<a href="#" class:premium={unauth} on:click|preventDefault={() => {
    if (unauth) {
        $store.modal = 'premium'
        return
    }
    $store.modal = id
}}>
    <slot />
</a>
