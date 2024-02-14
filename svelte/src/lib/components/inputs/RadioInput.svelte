<script>
    export let field
    let selected = 0
    if (field.selected) {
        // console.log(field.selected)
        selected = field.options.findIndex((option, i) => {
            const optionValue = typeof option === 'object' ? option.value : i
            return field.selected == optionValue
        })
        // console.log(selected)
    }
</script>

<ul>
    {#each field.options as option, i}
    {@const optionLabel = typeof option === 'object' ? option.label : option}
    {@const optionValue = typeof option === 'object' ? option.value : i}
        <li>
            <input 
                type="radio" 
                name={field.name||field.placeholder} 
                value={optionValue} 
                checked={i===selected} 
                on:click={()=>{selected=i}}
                >
            {optionLabel}
        </li>
    {/each}
</ul>