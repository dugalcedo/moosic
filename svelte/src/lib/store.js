import { writable } from "svelte/store";

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
    }
})