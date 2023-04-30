import { defineStore, createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
const pinia = createPinia();

const persistedState = createPersistedState({
    key: 'PiniaPersistedstate',
    paths: ['isAuthenticated', 'isAuthorizated'],
    storage: localStorage,
});

pinia.use(persistedState);

export const useStore = defineStore({
    id: 'Authenticated',
    state: () => ({
        isAuthenticated: false,
        isAuthorizated: false,
    }),
    actions: {
        setIsAuthenticated(isAuthenticated) {
            this.isAuthenticated = isAuthenticated;
        },
        setIsAuthorizated(isAuthorizated) {
            this.isAuthenticated = isAuthorizated;
        },
    },
    persist: true,
})