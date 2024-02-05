<script>
    import { backendURL, hämta } from "../..";
    import Form from "../forms/Form.svelte";
</script>

<Form 
    submitBtn="log in"
    fields={[
        {
            placeholder: 'username or email',
            name: 'usernameOrEmail',
            required: true
        },
        {
            placeholder: 'password',
            required: true,
            type: 'password',
        }
    ]}
    handler={async (data) => {
        const reply = await hämta({
            endpoint: backendURL('/api/user/login'),
            method: 'POST',
            body: data
        })

        if (!reply.error) {
            location.href = '/'
        }

        return reply
    }}
/>