<template>
  <v-container fluid grid-list-md class="product_div">
    <v-data-iterator
      :items="l_product"
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
          <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-layout justify-space-around class="mb-2 close_btn" @click="click_close(props.item)">
            <span class="group pa-2">
              <v-icon medium>close</v-icon>
            </span>
          </v-layout>
          <div @click="click_item(props.item)">
            <v-list dense>
              <div class="img_box">
                <img :src="props.item.img_path"/>
              </div>
              <v-list-tile>
                <v-list-tile-content>공시지원금:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.price }}원</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>선약지원금:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.price1 }}원</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </div>
        </v-card>
      </v-flex>
    </v-data-iterator>
    <popup-dialog :item="s_product"/>
    <div class="product_add_btn">
      <v-btn color="info" @click="add_product">상품 추가</v-btn>
    </div>
  </v-container>
</template>
<script>
import popupDialog from '../components/popupDialog';
  export default {
    components: {
      popupDialog
    },
    data: () => ({
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 8
      },
      s_product: '',
    }),
    computed: {
      l_product() {
        return this.$store.getters.l_product;
      },
      is_login() {
        return this.$store.getters.is_login;
      }
    },
    mounted() {
      if (!this.is_login)
        this.$router.push('/login')
      this.$store.dispatch('l_product', '');
      this.$store.commit('title', '상품 리스트');
      this.$store.commit('s_product', '');
    },
    methods: {
      click_close(product) {
        this.s_product = product;
        this.s_product.confirm = 'product'
        this.$store.commit('dialog', true)
      },
      click_item(item) {
        this.$store.commit('s_product', item)
        this.$router.push('/productInfo');
      },
      add_product() {
        this.$router.push('/productInfo');
      }
    }
  }
</script>
<style>
.img_box {
  width: 100%;
  overflow: hidden;
  padding: 1vw;
  height: 200px;
  text-align: center;
}
.img_box>img {
  width: auto;
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
.v-card__title {
  width: 93%;
}
.product_div {
  position: relative;
}
.product_add_btn {
  position: absolute;
  bottom: 20px;
  left: 20px;
}
</style>

