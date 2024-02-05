<script>
    import { backendURL, hämta } from "../..";
    import store from "../../store";
    import Modal from "../layout/Modal.svelte";

    let album
    $: if ($store.albumToDelete) album = $store.albumToDelete

</script>

<Modal id="delete">
    <div slot="head">
        deleting album
    </div>
    <div slot="body">
        are you sure you want to permanently delete <i>{album.album}</i> by <b>{album.artist}</b>?
    </div>
    <div slot="foot">
        <button on:click={async ()=>{
            
            // premium
            return
            const reply = await hämta({
                endpoint: backendURL('/api/collection'),
                method: 'DELETE',
                body: album
            })
        }}>
            delete permanently
        </button>
    </div>
</Modal>