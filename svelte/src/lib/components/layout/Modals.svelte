<script>
    import store from "../../store";
    import AddAlbum from "../modals/AddAlbum.svelte";
    import DeleteAlbum from "../modals/DeleteAlbum.svelte";
    import EditAlbum from "../modals/EditAlbum.svelte";
    import Premium from "../modals/Premium.svelte";
    import Rymport from "../modals/Rymport.svelte";
</script>

<div class="modal-backdrop" style="display:{$store.modal?'initial':'none'}">
    <AddAlbum />
    <DeleteAlbum />
    <EditAlbum />
    <Rymport />
    <Premium />
</div>