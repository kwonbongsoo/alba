import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const api_url ="http://127.0.0.1/";

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    l_product: '',
    dialog:false,
    title: 'Application'
  },
  getters: {
    l_product: function(state) {
      return state.l_product;
    },
    dialog: function(state) {
      return state.dialog;
    },
    title: function(state) {
      return state.title;
    },
  },
  mutations: {
    l_product: (state, l_product) => {
      state.l_product = l_product;
    },
    dialog: (state, dialog) => {
      state.dialog = dialog;
    },
    title: (state, title) => {
      state.title = title;
    },
  },
  actions: {
    l_product: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'product/list',
          responseType: 'json',
        })
          .then((res) => {
            console.log('l_product res:', res.data);
            context.commit('l_product', res.data);
            resolve(res.data);
          });
      });
    },
  },
})


