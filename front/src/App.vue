<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="home_go">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>공지사항</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="dashboard_go">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>휴대폰 기종</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="broadcastClick">
          <v-list-tile-action>
            <v-icon>settings_input_antenna</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>푸시보내기</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-right>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>

</template>


<script>
export default {
  name: 'App',
    data: () => ({
      drawer: true,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      push: true,
    }),
    props: {
      source: String
    },
    computed: {
      title() {
        return this.$store.getters.title;
      }
    },
    methods: {
      dashboard_go() {
        this.$router.push('/product');
      },
      home_go() {
        this.$router.push('/');
      },
      broadcastClick() {
        if(this.push) {
          this.push = false
          var this_ = this
          this.$store.dispatch('broadcast', '')
          .then(function(res) {
            alert('푸시를 보냈습니다.')
            this_.push = true
          })
        }
      }
    }
  }
</script>

