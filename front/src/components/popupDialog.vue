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
          정말 상품을 지우시겠습니까?
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
