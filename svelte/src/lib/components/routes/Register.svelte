<script>
    import validator from 'validator'
    
    import Form from "../forms/Form.svelte";
    import { hämta, backendURL } from "../.."

    async function registerFormHandler(formData) {
        const reply = await hämta({
            endpoint: backendURL('/api/user/register'),
            method: 'POST',
            body: formData
        })
        return reply
    }

</script>

<Form 
    submitBtn="register"
    fields={[
        {
            placeholder: 'username',
            required: true,
            validate: val => {
                if (val.trim().length < 2) return "username must be at least 2 characters"
            }
        },
        {
            placeholder: 'email',
            required: true,
            type: 'email'
        },
        {
            placeholder: 'password',
            type: 'password',
            required: true,
            validate: (val, formData) => {
                if (val !== formData.password2) return "passwords do not match"
                if (!validator.isStrongPassword(val, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                })) return "password is not strong enough (8 characters, 1 of each: lowercase, uppercase, number, symbol)"
            }
        },
        {
            placeholder: 'repeat password',
            name: 'password2',
            type: 'password',
            required: true
        },
    ]}
    handler={registerFormHandler}
/>