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
    l_list: '',
    dialog:false,
    title: 'Application',
    s_product: '',
    s_post: '',
  },
  getters: {
    l_list: function(state) {
      return state.l_list;
    },
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
    s_post: function(state) {
      return state.s_post;
    },
  },
  mutations: {
    l_list: (state, l_list) => {
      state.l_list = l_list;
    },
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
    s_post: (state, s_post) => {
      state.s_post = s_post;
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
    add_post: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          params: params,
          url: api_url + 'post/add',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.data);
        })
      })
    },
    update_post: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          params: params,
          url: api_url + 'post/update',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.data);
        })
      })
    },
    get_list: (context, params) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'post/get',
          responseType: 'json'
        })
        .then((res) => {
          context.commit('l_list', res.data);
          resolve(res.data);
        })
      })
    }
  },
})


