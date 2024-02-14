<script>
    import Header from "./lib/components/layout/Header.svelte";
    import Router from "./lib/components/layout/Router.svelte";

    import { hämta, backendURL } from "./lib";
    import store from "./lib/store";
    import Footer from "./lib/components/layout/Footer.svelte";
    import Modals from "./lib/components/layout/Modals.svelte";
    let storeLoaded = false

    // getUser()
    // async function getUser() {
    //   const u = await hämta({endpoint: backendURL('/api/user')})
    //   if (u.id && u.username && u.email) {
    //       $store.user = u
    //       localStorage.setItem('moosic-user', JSON.stringify(u))
    //   }
    // }
    $store.load()

    $: if ($store) {
      console.log(`store ${storeLoaded?'change':'init'}`, $store)
      storeLoaded = true
    }

</script>

<Header />

<main>
  <Router />
</main>

<Footer />

<Modals />