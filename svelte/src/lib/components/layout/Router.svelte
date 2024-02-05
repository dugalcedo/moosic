<script>
    import Home from "../routes/Home.svelte";
    import Login from "../routes/Login.svelte";
    import Logout from "../routes/Logout.svelte";
    import NotFound from "../routes/NotFound.svelte";
    import Register from "../routes/Register.svelte";

    let router = {
        routes: [
            {
                path: null,
                component: NotFound
            },
            {
                path: '/',
                component: Home
            },
            {
                path: "/login",
                component: Login
            },
            {
                path: '/register',
                component: Register
            },
            {
                path: '/logout',
                component: Logout
            }
        ]
    }


    const checkHash = () => {
        let path = location.pathname
        router.routes.forEach(r => {
            r.active = r.path === path
            if (r.active) {
                r.loaded = true
            }
        })
        if (!router.routes.some(r => r.active)) {
            router.routes[0].loaded = true
            router.routes[0].active = true
        }
        router = {...router}
        
    }

    checkHash()

    document.addEventListener('moosic-navigate', checkHash)

</script>

{#each router.routes as route}
    {#if route.loaded}
        <div class="route" style="display: {route.active ? 'initial' : 'none'}">
            <svelte:component this={route.component} />
        </div>
    {/if}
{/each}