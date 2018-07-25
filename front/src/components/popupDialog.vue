<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card class="popup_box">
        <v-layout justify-space-around class="mb-2 close_btn" @click="close_click">
          <span class="group pa-2">
            <v-icon medium>close</v-icon>
          </span>
        </v-layout>
        <v-card-title
          class="headline lighten-2"
          title
        >
          Warning
        </v-card-title>

        <v-card-text>
          {{item.name}} 정말 삭제하겠습니까?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" @click="confirm_click">삭제</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    name: "popupDialog",
    props: ['item'],
    data () {
      return {
        
      }
    },
    computed: {
      dialog() {
        return this.$store.getters.dialog;
      }
    },
    mounted() {
      this.$store.commit('dialog', false)
    },
    methods: {
      close_click() {
        this.$store.commit('dialog', false)
      },
      confirm_click() {
        this.$store.commit('dialog', false)
        let params;
        if(this.item.confirm == 'product') {
            params = {
            'orgName': this.item.imageName,
            'no': this.item.no
          }
          this.$store.dispatch('delete_product', params)
              .then((res) => {
                  this.$store.dispatch('l_product', '')
              })
        } else if (this.item.confirm == 'post') {
          params = {
            no : this.item.no
          }
          this.$store.dispatch('delete_post', params)
          .then((res) => {
            this.$store.dispatch('get_pList', {
              no: 0
            })
          })
        }
      }
    }
  }
</script>
<style>
.v-dialog>.v-card>.v-card__title {
  width:100%;
  background-color: black;
}
.popup_box {
  position: relative;
}
.popup_box .close_btn {
  position: absolute;
  top:10px;
  right:0;
}
</style>
