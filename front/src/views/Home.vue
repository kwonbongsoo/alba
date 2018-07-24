<template>
<v-container class="home_div" fluid grid-list-md>
    <v-data-iterator
      :items="l_list"
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
      >
        <v-card>
          <v-card-title><h4>{{ props.item.title }}</h4></v-card-title>
          <v-divider></v-divider>
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
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      post_no: 0,
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 8
      },
      items: [
        {
          no: 0,
          title: 'Frozen Yogurt',
          text: '<p>234234234234234</p>1234124234234'
        }
      ]
    }
  },
  computed: {
    l_list() {
      return this.$store.getters.l_list;
    }
  },
  mounted() {
    this.$store.commit('title', '공지사항');
    this.$store.commit('s_post', '');
    let params = {
      no : this.post_no
    }
    this.$store.dispatch('get_list', params)
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
</style>

