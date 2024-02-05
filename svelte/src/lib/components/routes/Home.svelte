<script>
    import Verification from "../forms/Verification.svelte";
    import store from "../../store";
    import Collection from "../layout/Collection.svelte";

    let loadingMessage = "checking if you are logged in..."

    $: if (localStorage.getItem('moosic-token')) {
        loadingMessage = "logging you in..."
        setTimeout(() => {
            loadingMessage = "still waiting? something must be wrong."
        }, 5000);
    } else {
        loadingMessage = "you are not logged in"
    }

</script>

{#if !$store.user}
    {loadingMessage}
{:else if $store.user.role === 'unverified'}
    <Verification />
{:else}
    <Collection />
{/if}