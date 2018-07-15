<template>
    <div class="please_width">
        <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
            <v-text-field dark label="상품 이름" v-model="p_name" prepend-icon='edit' require></v-text-field>
            <v-text-field dark label="상품 가격" v-model="p_price" prepend-icon='edit' require></v-text-field>
            <img :src="imageUrl" height="150" v-if="imageUrl"/>
            <v-text-field dark label="상품 이미지를 등록하세요" @click='pickFile' v-model='imageName' prepend-icon='add_a_photo' readonly require></v-text-field>
            <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
            > 

            <div class="add_update_btn">
                <v-btn color="info">등록 / 수정</v-btn>
            </div>
        </v-flex>
    </div>
</template>
<script>
  export default {
    data: () => ({
        title: "Image Upload",
        dialog: false,
		imageName: '',
		imageUrl: '',
        imageFile: '',
        p_name: '',
        p_price: '',
    }),
    mounted() {
        this.$store.commit('title', '상품 등록 / 수정')
    },
    methods: {
        pickFile () {
            this.$refs.image.click ()
        },
		
		onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		}
    }
  }
</script>
<style>
.please_width {
    width: 100%;
    height: 80vh;
}
.text_please {
    color: black;
}
.add_update_btn {
    position: fixed;
    bottom: 7%;
    right: 20px;
}
</style>
