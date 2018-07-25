<template>
<v-container class="home_div" fluid grid-list-md>
    <v-data-iterator
      :items="l_pList"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
        lg3
        class="item_div"
      >
        <v-card>
          <v-card-title><h4>{{ props.item.title }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-layout justify-space-around class="mb-2 close_btn" @click="click_close(props.item)">
            <span class="group pa-2">
              <v-icon medium>close</v-icon>
            </span>
          </v-layout>
          <div @click="postClick(props.item)">
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>{{ formatRemoveHtml(props.item.text) }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </div>
        </v-card>
      </v-flex>
    </v-data-iterator>
    <popup-dialog :item="s_post"/>
    <div class="post_add_btn">
      <v-btn color="info" @click="add_post">글쓰기</v-btn>
    </div>
  </v-container>
</template>
<script>
import popupDialog from '../components/popupDialog';
export default {
  components: {
    popupDialog
  },
  data() {
    return {
      post_no: 0,
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 8
      },
      s_post: ''
    }
  },
  computed: {
    l_pList() {
      return this.$store.getters.l_pList;
    },
    is_login() {
      return this.$store.getters.is_login;
    }
  },
  mounted() {
    if (!this.is_login)
        this.$router.push('/login')
    this.$store.commit('title', '공지사항');
    this.$store.commit('s_post', '');
    let params = {
      no : this.post_no
    }
    this.$store.dispatch('get_pList', params)
    .then((res) => {
      console.log(res)
    })
  },
  methods: {
    postClick(post) {
      console.log(1)
      this.$store.commit('s_post', post)
      this.$router.push('/write')
    },
    formatRemoveHtml(text) {
      return text.replace(/(<([^>]+)>)/gi, '');
    },
    click_close(post) {
      this.s_post = post;
      this.s_post.confirm = 'post'
      this.$store.commit('dialog', true)
    },
    add_post() {
        this.$router.push('/write');
      }
  }
}
</script>
<style>
.home_div  .v-card__title {
  font-size: 2rem;
}
.home_div .v-list--dense .v-list__tile:not(.v-list__tile--avatar) {
  height: 200px;
}
.home_div  .v-list__tile__content {
  font-size: 1.3rem;
}
.item_div {
  position: relative;
  height: auto;
}
.item_div .close_btn {
  position: absolute;
  z-index: inherit;
  top:0;
  right:0;
}
.home_div {
  position: relative;
}
.post_add_btn {
  position: absolute;
  bottom: 20px;
  left: 20px;
}
</style>

