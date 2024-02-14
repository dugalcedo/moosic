<script>
    import store from "../../store";
</script>

<div id="collection">
    {#each $store.user.collection as item, i (item.id)}
        <div class="item">
            <div class="cover">
                <img src={item.cover||'/img/moose.png'} alt="">
                <div class="rank">
                    {i+1}
                </div>
            </div>
            <div class="info invert">
                <div class="head">
                    <div class="title">
                        <h3>{item.album}</h3>
                        <p>by {item.artist}</p>
                    </div>
                    <div class="spacer"></div>
                    <div class="buttons">
                        <button on:click={()=>{
                            $store.albumToEdit = item
                            $store.modal = 'edit'
                        }}>
                            edit
                        </button>
                        <button on:click={()=>{
                            $store.albumToDelete = item
                            $store.modal = 'delete'
                        }}>
                            del
                        </button>
                    </div>
                </div>
                <div class="body">
                    <div class="year">
                        <div>{item.year}</div>
                    </div>
                    <div class="len">
                        <div>{item.len} min</div>
                    </div>
                    <div class="rating">
                        <div>{item.rating}/10</div>
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>