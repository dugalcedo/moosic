<script>
    import Modal from "../layout/Modal.svelte";
    import Form from "../forms/Form.svelte";
    import { backendURL, hämta } from "../..";

    let submitBtn
</script>

<Modal id='add'>
    <div slot="head">
        <h3>add new album</h3>
    </div>
    <div slot="body">
        <Form
            refer={submitBtn}
            fields={[
                {
                    placeholder: 'artist',
                    required: true
                },
                {
                    placeholder: 'album',
                    required: true
                },
                {
                    placeholder: 'length',
                    name: 'len',
                    required: true
                },
                {
                    placeholder: 'year',
                    required: true
                },
                {
                    placeholder: 'rating',
                    required: true
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
                    ]
                },
                {
                    label: 'tags',
                    name: 'tags',
                    type: 'textarea'
                }
            ]}
            handler={async (data) => {
                const reply = await hämta({
                    endpoint: backendURL('/api/collection'),
                    method: 'POST',
                    body: data
                })
                return reply
            }}
        />
    </div>
    <div slot="foot">
        <button bind:this={submitBtn}>
            save changes
        </button>
    </div>
</Modal>