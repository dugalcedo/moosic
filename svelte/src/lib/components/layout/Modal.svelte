<script>
    export let id
    import store from "../../store";

    // these modals should be destroyed on close
    const destroy = ['add', 'edit']

    function closeModal() {
        if (destroy.includes($store.modal)) {
            let index = $store.modalsLoaded.indexOf($store.modal)
            $store.modalsLoaded.splice(index, 1)
        }
        $store.modal = null
    }
</script>

{#if $store.modalsLoaded.includes(id)}
    <div class="modal invert" style="display:{$store.modal===id?'flex':'none'}">
        <div class="head">
            <slot name="head" />
            <button on:click={closeModal}>
                X
            </button>
        </div>
        <div class="body">
            <slot name="body" />
        </div>
        <div class="foot">
            <slot name="foot" />
        </div>
    </div>
{/if}