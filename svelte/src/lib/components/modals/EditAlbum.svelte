<script>
    import store from "../../store";
    import Modal from "../layout/Modal.svelte";
    import Form from "../forms/Form.svelte";

    let editBtn

</script>

<Modal id="edit">
    <div slot="head">
        <h3>editing <i>{$store.albumToEdit.album}</i> by <b>{$store.albumToEdit.artist}</b></h3>
    </div>
    <div slot="body">
        <Form
            refer={editBtn}
            fields={[
                {
                    placeholder: 'artist',
                    required: true,
                    value: $store.albumToEdit.artist
                },
                {
                    placeholder: 'album',
                    required: true,
                    value: $store.albumToEdit.album
                },
                {
                    placeholder: 'length',
                    name: 'len',
                    required: true,
                    value: $store.albumToEdit.len
                },
                {
                    placeholder: 'year',
                    required: true,
                    value: $store.albumToEdit.year
                },
                {
                    placeholder: 'rating',
                    required: true,
                    value: $store.albumToEdit.rating
                },
                {
                    label: 'familiarity',
                    name: 'fam',
                    type: 'radio',
                    options: [
                        'never heard',
                        'first listen',
                        'somewhat familiar',
                        'familiar',
                        'very familiar'
                    ],
                    selected: $store.albumToEdit.fam
                },
                {
                    label: 'tags',
                    name: 'tags',
                    type: 'textarea',
                    value: $store.albumToEdit.tags.join(' ')
                }
            ]}
        />
    </div>
    <div slot="foot">
        <button bind:this={editBtn}>
            save changes
        </button>
    </div>
</Modal>