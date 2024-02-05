<script>
    import { hämta, backendURL } from "../..";
    import Form from "./Form.svelte";
    import store from "../../store";
</script>

<h3>Hey, {$store.user.username}. Verify your email address.</h3>

<p>An email was sent to you containing a key.</p>

<Form
    submitBtn="verify"
    fields={[
        {
            placeholder: 'login key',
            name: 'key',
            type: 'password',
            validate(v) {
                if (v.length !== 20) return "Invalid key"
            }
        }
    ]}
    handler={async data => {
        const reply = await hämta({
            endpoint: backendURL('/api/user/verify'),
            method: 'PUT',
            body: data
        }) 

        console.log(reply)
    }}
/>