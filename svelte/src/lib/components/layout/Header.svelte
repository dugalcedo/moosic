<script>
    import A from "../A.svelte";
    import ModalLink from "../ModalLink.svelte";
    import store from "../../store";
</script>

<header>
    <div id="header">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <A href="/">
            <h1>moosic</h1>
        </A>
        <nav>
            {#if $store.user}
                <ModalLink id="add">add album</ModalLink>
                <ModalLink 
                    id="rymport" 
                    roleCheck={['premium', 'admin', 'mod']}
                >
                    import from RYM
                </ModalLink>
                <A href="/logout">log out</A>
            {:else}
                <A href="/login">log in</A>
                <A href="/register">register</A>
            {/if}
        </nav>
    </div>
</header>