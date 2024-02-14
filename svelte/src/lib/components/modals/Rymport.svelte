<script>
    import { hämta, backendURL } from "../../index.js";
    import Modal from "../layout/Modal.svelte";

    let fileInput
    let minRating
    let toImport = []
    let reader = new FileReader()
    reader.addEventListener('load', e => {
        try {
            const csv = e.target.result
            const rows = csv.split('\n').slice(1)
            toImport = rows.map(row => {
                const [
                    rymId,
                    firstName,
                    lastName,
                    firstNameLocalized,
                    lastNameLocalized,
                    title,
                    year,
                    rating
                ] = row.split('","').map(c => c.replaceAll('"',''))
                let artist = ""
                // if foreign name
                if (lastNameLocalized) {
                    artist = lastNameLocalized
                    if (firstNameLocalized){
                        artist = `${firstNameLocalized} ${lastNameLocalized}`
                    }
                // if no foreign name
                } else {
                    artist = lastName
                    if (firstName) {
                        artist = `${firstName} ${lastName}`
                    }
                }

                return {
                    artist,
                    album: title,
                    rating: Number(rating)||0,
                    len: 1,
                    tags: [],
                    tempId: rymId,
                    fam: 1,
                    year: Number(year)||0,
                    import: true
                }
            }).filter(r => r.artist && (r.rating >= minRating.value))
        } catch (error) {
            console.log(error)
        }
    })

    function rymport() {
        if (!fileInput.files.length) {
            console.log('no files')
            return
        }
        reader.readAsText(fileInput.files[0])
    }

    async function confirmImport() {
        let _toImport = toImport.filter(x => x.import)
        let reply = await hämta({
            endpoint: backendURL('/api/collection/many'),
            method: 'POST',
            body: _toImport
        })
        console.log(reply)
    }
</script>

<Modal id="rymport">
    <div slot="head">
        <h3>import from RateYourMusic</h3>
    </div>
    <div slot="body">
        <div>
            <input type="file" accept="text/csv" bind:this={fileInput}>
            <div>
                ignore albums with ratings of 
                <select bind:this={minRating}>
                    {#each new Array(8).fill().map((_,i)=>i+2) as n}
                        <option value={n} selected={n==4}>{n}</option>
                    {/each}
                </select>
                or lower
            </div>
            <br>
            <button on:click={rymport}>import</button>
        </div>
        <div id="to-import">
            {#if toImport.length}
                {toImport.length}
                <table>
                    <thead>
                        <tr>
                            <th>import?</th>
                            <th>album</th>
                            <th>artist</th>
                            <th>rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each toImport as album}
                            <tr>
                                <td>
                                    <input type="checkbox" bind:checked={album.import}>
                                </td>
                                <td>
                                    {album.album}
                                </td>
                                <td>
                                    {album.artist}
                                </td>
                                <td>
                                    {album.rating}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                <button on:click={confirmImport}>
                    confirm
                </button>
            {/if}
        </div>
    </div>
</Modal>