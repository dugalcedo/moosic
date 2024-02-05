<script>
    import store from "../../store";
    import AddAlbum from "../modals/AddAlbum.svelte";
    import DeleteAlbum from "../modals/DeleteAlbum.svelte";
</script>

<div class="modal-backdrop" style="display:{$store.modal?'initial':'none'}">
    <AddAlbum />
    <DeleteAlbum />
</div>