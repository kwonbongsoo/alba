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
  },
  getters: {
    l_product: function(state) {
      return state.l_product;
    },
  },
  mutations: {
    l_product: (state, l_product) => {
      state.l_product = l_product;
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