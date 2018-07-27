<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="id" label="Login" type="text"></v-text-field>
                  <v-text-field id="password" v-model="pwd" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="loginClick">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      id: '',
      pwd: ''
    }),
    props: {
      source: String
    },
    methods: {
        loginClick() {
            if (this.id == '') {
                alert('아이디를 입력하세요')
            } else if (this.pwd == '') {
                alert('비밀번호를 입력하세요')
            } else if (this.id.length > 30) {
              alert('입력한 아이디가 너무 깁니다. 30글자미만')
            } else if (this.pwd.length > 30) {
              alert('입력한 패스워드가 너무 깁니다. 30글자미만')
            }else {
                let params = {
                    id : this.id,
                    pwd : this.pwd
                }
                this.$store.dispatch('login', params)
                .then((res) => {
                    this.$router.push('/')
                })
            }
        }
    }
  }
</script>