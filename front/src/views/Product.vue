<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="items"
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
        @click="click_item"
      >
        <v-card>
          <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-layout justify-space-around class="mb-2 close_btn" @click="click_close">
            <span class="group pa-2">
              <v-icon medium>close</v-icon>
            </span>
          </v-layout>
          <v-list dense>
            <div class="img_box">
              <img src="https://s3.ap-northeast-2.amazonaws.com/tdpay.s3/data/img/hb_coffee_0215.png" />
            </div>
            <v-list-tile>
              <v-list-tile-content>가격:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.price }}원</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Calcium:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.calcium }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Iron:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.iron }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
    <popup-dialog/>
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
      items: [
        {
          value: false,
          name: 'Frozen Yogurt',
          price: 1000,
          calcium: '14%',
          iron: '1%'
        },
        {
          value: false,
          name: 'Ice cream sandwich',
          price: 1100,
          calcium: '8%',
          iron: '1%'
        },
        {
          value: false,
          name: 'Eclair',
          price: 1200,
          calcium: '6%',
          iron: '7%'
        },
        {
          value: false,
          name: 'Cupcake',
          price: 1300,
          calcium: '3%',
          iron: '8%'
        },
        {
          value: false,
          name: 'Gingerbread',
          price: 1400,
          calcium: '7%',
          iron: '16%'
        },
        {
          value: false,
          name: 'Jelly bean',
          protein: 0.0,
          price: 1500,
          calcium: '0%',
          iron: '0%'
        },
        {
          value: false,
          name: 'Lollipop',
          price: 1600,
          calcium: '0%',
          iron: '2%'
        },
        {
          value: false,
          name: 'Honeycomb',
          price: 1700,
          calcium: '0%',
          iron: '45%'
        },
        {
          value: false,
          name: 'Donut',
          price: 1800,
          calcium: '2%',
          iron: '22%'
        },
        {
          value: false,
          name: 'KitKat',
          price: 1900,
          calcium: '12%',
          iron: '6%'
        }
      ]
    }),
    mounted() {
      this.$store.commit('title', '상품 리스트')
    },
    methods: {
      click_close() {
        this.$store.commit('dialog', true)
      },
      click_item() {
        this.$router.push('/productInfo');
      }
    }
  }
</script>
<style>
.img_box {
  width: 100%;
  overflow: hidden;
}
.img_box>img {
  width: 100%;
}
.item_div {
  position: relative;
}
.item_div .close_btn {
  position: absolute;
  top:0;
  right:0;
}
.v-card__title {
  width: 93%;
}
</style>

