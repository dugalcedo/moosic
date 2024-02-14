import { writable } from "svelte/store";
import { hämta, backendURL } from "./index.js";

export default writable({
    user: null,
    modal: null,
    modalsLoaded: [],
    set modal(id) {
        this.modalId = id
        if (this.modalsLoaded.includes(id) || !id) return
        this.modalsLoaded.push(id)
    },
    get modal() {
        return this.modalId
    },
    save() {
        if (!this.user) return
        this.user.unsavedChanges = true
        localStorage.setItem('moosic-user', JSON.stringify(this.user))
    },
    async loadFromDB() {
        const u = await hämta({endpoint: backendURL('/api/user')})
        if (u.id && u.username && u.email) {
            this.user = u
            localStorage.setItem('moosic-user', JSON.stringify(u))
        }
    },
    async load() {
        // if (this.user && this.user.recentlyUpdated) {
        //     this.user.recentlyUpdated = false
        //     this.loadFromDB()
        //     return
        // }
        const u = JSON.parse(localStorage.getItem('moosic-user')||'null')
        if (!u) {
            this.loadFromDB()
        } else {
            this.user = u
        }
    },
    async addAlbum(newAlbum) {
        if (!this.user?.collection) return
        this.user.collection.push(newAlbum)
        this.save()
    },
    async deleteAlbum(id) {
        
    }
})