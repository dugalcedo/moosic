<script>
    import { backendURL, hämta } from "../..";
    import store from "../../store";
    import Modal from "../layout/Modal.svelte";

    let album
    $: if ($store.albumToDelete) album = $store.albumToDelete

</script>

<Modal id="delete">
    <div slot="head">
        <h3>deleting album</h3>
    </div>
    <div slot="body">
        are you sure you want to permanently delete <i>{album.album}</i> by <b>{album.artist}</b>?
    </div>
    <div slot="foot">
        <button on:click={async ()=>{
            const reply = await hämta({
                endpoint: backendURL('/api/collection'),
                method: 'DELETE',
                body: {id: album.id}
            })
            if (reply.error) {
                console.log(reply)
                return
            }
            location.href = '/'
        }}>
            delete permanently
        </button>
    </div>
</Modal>