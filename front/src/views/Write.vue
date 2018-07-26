<template>
<div class="write_div" ref="delete">
        <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
            <v-text-field dark class="title" type="text" label="제목" v-model="title" prepend-icon='edit' require></v-text-field>
        </v-flex>
    <div id="ckeditor">
        <vue-ckeditor type="classic" v-model="text" :editors="editors1"></vue-ckeditor>
    </div>
    <v-btn color="info" @click="submitClick" id="submit" type="submit" value="Submit">글 수정/쓰기</v-btn>
</div>
    
    
</template>
<script>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon'
import VueCkeditor from 'vue-ckeditor5'

export default {
    components: {
    'vue-ckeditor': VueCkeditor.component
     },
    data() {
        return {
            value: false,
            title: '',
            text: '',
            post_no: '',
            editors1: {
                classic: ClassicEditor
            },
        }
    },
    computed: {
        s_post() {
            return this.$store.getters.s_post;
        },
        is_login() {
            return this.$store.getters.is_login;
        }
    },
    mounted() {
        if (!this.is_login)
            this.$router.push('/login')
        this.$store.commit('title', '글쓰기');

        if(this.s_post != '') {
            this.title = this.s_post.title
            this.text = this.s_post.text
            this.post_no = this.s_post.no
        }

        // var editor
        // if(this.value) {
        //     console.log(ClassicEditor)
        //     ClassicEditor.create(document.getElementById('ckeditor'), {
        //         ckfinder: {
        //             uploadUrl: 'http://127.0.0.1/post/add?command=QuickUpload&type=Files&responseType=json',
        //             filebrowserBrowseUrl: 'http://127.0.0.1/post/add'
        //         },
        //         language: 'ko'
        //     })
        //     .then( newEditor => {
        //         editor = newEditor;
        //     } )
        //     .catch( error => {
        //         console.error( error );
        //     } );
        //     this.value = false
        // }
        // document.querySelector( '#submit' ).addEventListener( 'click', () => {
        //     const editorData = editor.getData();
        //     console.log(editorData)
        //     if (this.title == '') {
        //         alert('타이틀을 입력하세요.')
        //     }
        //     else if (editorData == '') {
        //         alert('내용을 입력하세요')
        //     }
        //     else {
        //         let params = {
        //             title: this.title,
        //             text: editorData
        //         }
        //         this.$store.dispatch('add_post', params)
        //         .then((res) => {
        //             console.log(res) 
        //             alert('11')
        //             editor.destroy()
        //             this.$router.push('/')
        //         })
        //     }
        //     // ...
        // } );

    },
    methods: {
        submitClick() {
            if (this.title == '') {
                alert('타이틀을 입력하세요.')
            }
            else if (this.text == '') {
                alert('내용을 입력하세요')
            }
            else {
                let params = {
                    title: this.title,
                    text: this.text,
                    no: this.post_no
                }
                if (this.post_no == '')
                    this.$store.dispatch('add_post', params)
                    .then((res) => {
                        this.$router.push('/')
                    })
                else
                    this.$store.dispatch('update_post', params)
                    .then((res) => {
                        this.$router.push('/')
                    })

            }
            // console.log(this.editors1.__ob__.dep.subs[0].vm.text)
        }
    }
}
    
</script>
<style>
.write_div {
    width: 100%;
}
.ck-editor {
    width: 100%;
}
.ck-content {
    min-height: 70vh;
}
.title {
    font-size: 1.5rem;
}
.ck-editor * {
    color: black;
}
.ck-file-dialog-button {
    display: none!important;
}
</style>



