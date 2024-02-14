<script>
    import RadioInput from "../inputs/RadioInput.svelte";

    export let fields
    if (!fields) {
        console.warn('Missing form fields')
    }
    export let submitBtn = 'submit'
    export let handler = null
    export let refer = null

    let submitting = false
    let form

    $: if (refer && form) {
        refer.addEventListener('click', (e) => {
            e.preventDefault()
            form.dispatchEvent(new Event('submit'))
        })
    }

    let errors = []
    let fetchError = ""

    fields.forEach(field => {
        if (!field.validate) {
            field.validate = (val, data) => {}
        }
        if (field.required) {
            let v = field.validate
            field.validate = (val, data) => {
                if (val.trim() === "") {
                    errors.push('field required')
                    return
                }
                return v(val, data)
            }
        }
    })

    async function handleSubmit(e) {
        if (submitting) return
        e.preventDefault()
        submitting = true
        errors = []
        fetchError = ""
        if (!handler) {
            submitting = false
            return
        }
        const data = Object.fromEntries(new FormData(e.target))

        fields.forEach(field => {
            const value = data[field.name||field.placeholder]
            const error = field.validate(value, data)
            errors.push(error)
        })

        errors = [...errors]
        if (errors.some(e => e)) {
            submitting = false
            return
        }

        let reply = await handler(data, e.target)
        if (reply.error) {
            fetchError = "Server side error: " + reply.message
        }

        submitting = false
    }

</script>

<form on:submit={handleSubmit} bind:this={form}>
    {#each fields as field, fI}
        <label class="field">
            {#if field.label}
                <span>{field.label}</span>
            {/if}

            <div class="input">
                {#if !field.type}
                    <input type="text"
                        placeholder={field.placeholder}
                        name={field.name||field.placeholder}
                        value={field.value||""}
                    >
                {:else if field.type === 'email'}
                    <input
                        type="email"
                        placeholder={field.placeholder}
                        name={field.name||field.placeholder}
                        value={field.value||""}
                    >
                {:else if field.type === 'textarea'}
                    <textarea name={field.name||field.placeholder} style="resize:none;">{field.value||""}</textarea>
                {:else if field.type === 'password'}
                    <input
                        type="password"
                        placeholder={field.placeholder}
                        name={field.name||field.placeholder}
                        value={field.value||""}
                    >
                {:else if field.type === 'radio'}
                    <RadioInput {field} />
                {/if}
                <span class="error">
                    {errors[fI]||""}
                </span>
            </div>
        </label>
    {/each}
    {#if !refer}
        <button type="submit">
            {submitBtn}
        </button>
    {/if}
    <span>
        {fetchError}
    </span>
</form>