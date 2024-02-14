<script>
    export let href = "/"
    export let roleCheck = null
    import store from "../store.js";
</script>

<a href={href} on:click|preventDefault={e => {
    if (roleCheck && !roleCheck.includes($store.user?.role)) {
        $store.modal = 'premium'
        return
    }
    history.pushState({}, "", href)
    document.dispatchEvent(new CustomEvent('moosic-navigate'))
}}>
    <slot />
</a>