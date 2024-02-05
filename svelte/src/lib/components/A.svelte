<script>
    export let href = "/"
</script>

<a href={href} on:click|preventDefault={e => {
    history.pushState({}, "", href)
    document.dispatchEvent(new CustomEvent('moosic-navigate'))
}}>
    <slot />
</a>