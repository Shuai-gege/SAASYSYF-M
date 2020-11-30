import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import eventInfo from './modules/checkoutEvent';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        eventInfo
    },
    getters,
});

export default store;