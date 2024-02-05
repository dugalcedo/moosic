<script>
    export let id
    import store from "../../store";
</script>

{#if $store.modalsLoaded.includes(id)}
    <div class="modal" style="display:{$store.modal===id?'flex':'none'}">
        <div class="head">
            <slot name="head" />
            <button on:click={()=>{$store.modal = null}}>
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