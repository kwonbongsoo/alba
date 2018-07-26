<template>
    <div class="please_width">
        <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
            <v-text-field dark type="text" label="휴대폰 기종" v-model="p_name" prepend-icon='edit' require></v-text-field>
            <v-text-field dark type="number" label="공시" v-model="p_price" prepend-icon='edit' require></v-text-field>
            <v-text-field dark type="number" label="선약" v-model="p_price1" prepend-icon='edit' require></v-text-field>
            <img :src="imageUrl" height="150" v-if="imageUrl"/>
            <div @click='pickFile'>
                <v-text-field dark placeholder="상품 이미지를 등록 / 변경하세요" v-model='imageName' prepend-icon='add_a_photo' readonly require></v-text-field>
            </div>
            <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
            > 

            <div class="add_update_btn">
                <v-btn color="info" @click="add_update_btn">등록 / 수정</v-btn>
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
        p_price1: '',
        orgName: '',
        no: '',
    }),
    computed: {
        s_product() {
            return this.$store.getters.s_product;
        },
        is_login() {
            return this.$store.getters.is_login;
        }
    },
    mounted() {
        if (!this.is_login)
        this.$router.push('/login')
        this.$store.commit('title', '상품 등록 / 수정')
        if(this.s_product != '') {
            this.p_name = this.s_product.name;
            this.p_price = this.s_product.price;
            this.p_price1 = this.s_product.price1;
            this.imageUrl = this.s_product.img_path;
            this.orgName = this.s_product.imageName;
            this.imageName = this.s_product.imageName;
            this.no = this.s_product.no;
        }
    },
    methods: {
        pickFile () {
            this.$refs.image.click()
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
        },
        add_update_btn() {
            if(this.p_name == '') {
                alert('휴대폰 기종을 입력하세요');
            }
            else if (this.p_price == '') {
                alert('공시지원금을 입력하세요');
            }
            else if (this.p_price1 == '') {
                alert('선약지원금을 입력하세요');
            }
            else if (this.no == '' && this.imageName == '') {
                alert('이미지를 등록 하세요');
            }
            else if (this.p_name.length > 30) {
                alert('상품명이 너무 깁니다.')
            }
            else if (this.p_price1.length > 30) {
                alert('선약지원금이 너무 크거나 깁니다.')
            }
            else if (this.p_price.length > 30) {
                alert('공시지원금이 너무 크거나 깁니다.')
            }
            else {
                let params = {
                    imageName: this.imageName,
                    imageUrl: this.imageUrl,
                    imageFile: this.imageFile,
                    p_name: this.p_name,
                    p_price: this.p_price,
                    p_price1: this.p_price1,
                    p_orgName: this.orgName,
                    no : this.no,
                }
                var formData = new FormData();

                formData.append('file', params.imageFile);
                formData.append('imageName', params.imageName);
                formData.append('imageUrl', params.imageUrl);
                formData.append('p_name', params.p_name);
                formData.append('p_price', params.p_price);
                formData.append('p_price1', params.p_price1);
                formData.append('orgName', params.p_orgName);
                formData.append('no', params.no);

                if (this.s_product == '')
                    this.$store.dispatch('add_product', formData)
                        .then(() => {
                            this.$store.dispatch('broadcast', '')
                            this.$router.push('/product')
                        })
                else
                    this.$store.dispatch('update_product', formData)
                        .then(() => {
                            this.$store.dispatch('broadcast', '')
                            this.$router.push('/product')
                        })
                // console.log(params)
                // console.log(this.s_product)
            }
        },
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
