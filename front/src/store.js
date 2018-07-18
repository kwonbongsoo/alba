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
    title: 'Application',
    s_product: {},
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
    s_product: function(state) {
      return state.s_product;
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
    s_product: (state, s_product) => {
      state.s_product = s_product;
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
            context.commit('l_product', res.data);
            resolve(res.data);
          });
      });
    },
    add_product: (context, params) => {
      return new Promise((resolve, reject) => {
          axios.post( api_url + 'product/add',
          params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
          .then((res) => {
            resolve(res.data);
          });
      });
    },
    update_product: (context, params) => {
      return new Promise((resolve, reject) => {
          axios.post( api_url + 'product/update',
          params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
          .then((res) => {
            console.log('update_product res:', res.data);
            // context.commit('l_product', res.data);
            resolve(res.data);
          });
      });
    },
    delete_product: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          params: params,
          url: api_url + 'product/delete',
          responseType: 'json',
        })
          .then((res) => {
            // console.log('delete_product res:', res.data);
            resolve(res.data);
          });
      });
    },
  },
})


