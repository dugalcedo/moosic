<script>
    export let field
    let selected = 0
</script>

<ul>
    {#each field.options as option, i}
    {@const optionLabel = typeof option === 'object' ? option.label : option}
    {@const optionValue = typeof option === 'object' ? option.value : i}
        <li>
            <input type="radio" name={field.name||field.placeholder} value={optionValue} checked={i===selected} on:click={()=>{selected=i}}>
            {optionLabel}
        </li>
    {/each}
</ul>