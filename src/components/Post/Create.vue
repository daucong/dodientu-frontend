<template>
    <div class="d-flex w-100">
        <div class="container">
            <div class="top-table-profile">
                <v-breadcrumbs :items="items" class="breadcrumbs">
                </v-breadcrumbs>
                <h1>Đăng tin</h1>
            </div>
            <v-form v-model="form" @submit.prevent="save">
                <v-card class="form-container ">
                    <v-card-item>
                        <div class="d-grid">
                            <div class="col-12">
                                <v-subheader class="text-label-form">Tiêu đề
                                </v-subheader>

                                <v-text-field
                                        v-model="formItem.projectName"
                                        placeholder="Nhập tiêu đề"
                                        variant="outlined"
                                        :rules="rules"
                                        :readonly="loading"
                                ></v-text-field>
                            </div>
                            <div class="col-12">
                                <v-subheader class="text-label-form">Thể loại
                                </v-subheader>

                                <v-select
                                        v-model="formItem.category"
                                        :placeholder="$t('form.place-select')"
                                        :items="categories"
                                        item-title="name"
                                        item-value="id"
                                        variant="outlined"
                                        density="comfortable"
                                        class="select-option"
                                        :rules="rules"
                                        :readonly="loading"
                                ></v-select>
                            </div>
                            <div class="col-12">
                                <v-subheader class="text-label-form">Số lượng
                                </v-subheader>

                                <v-text-field
                                        v-model="formItem.soLuong"
                                        placeholder="Nhập số lượng"
                                        variant="outlined"
                                        type="number"
                                        :rules="rules"
                                        :readonly="loading"
                                ></v-text-field>
                            </div>
                            <div class="col-12">
                                <v-subheader class="text-label-form">Giá tiền
                                </v-subheader>

                                <v-text-field
                                        v-model="formItem.money"
                                        placeholder="Nhập giá tiền"
                                        variant="outlined"
                                        @input="handleInput"
                                        :rules="rules"
                                        :readonly="loading"
                                ></v-text-field>
                            </div>
                            <div class="col-12">
                                <v-subheader class="text-label-form">Ảnh nền
                                </v-subheader>

                                <v-file-input v-if="changeImg" class="input-image border-color-cus" density="counter"
                                              counter
                                              variant="outlined"
                                              prepend-icon="mdi:mdi-camera"
                                              @change="onFileChange" v-model="image" ref="thumbnail"
                                              :rules="rules"
                                              required></v-file-input>
                                <div class="bg-white br-none">
                                    <v-img class="rounded ct-multi-img" v-if="image.length > 0"
                                           :src="urlImageLoad"/>
                                    <v-img class="rounded" id="edit" max-height="280px" width="280px"
                                           v-if="post.id != null && image.length <= 0"
                                           :src="getUrlImage(post.thumbnail)"
                                    />
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="align-self-center"><span class="text-label-form">{{ $t('form.label-image') }}</span>
                                </div>
                                <div class="dropzone-container ct-border-mutil-img"
                                     @dragover="dragover"
                                     @dragleave="dragleave"
                                     @drop="drop"
                                >
                                    <input
                                            type="file"
                                            multiple
                                            name="file"
                                            id="fileInput"
                                            class="hidden-input"
                                            hidden
                                            @change="onChange"
                                            ref="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            :rules="rules"
                                    />
                                    <label for="fileInput" class="file-label">
                                        <div class="pa-5">
                                            <p class="file-input-label mt-2">
                                                <span><v-icon icon="fa fa-file-circle-plus"></v-icon></span>
                                                {{ $t('post-form.select-img') }}
                                                <span>{{ $t('post-form.drop-img') }}</span>
                                            </p>
                                        </div>
                                    </label>
                                    <div class="preview-container d-flex" v-if="files.length">
                                        <div v-for="file in files" :key="file.name" class="preview-card ms-2">
                                            <div class="preview-img "><img class="ct-multi-img"
                                                                           :src="generateURL(file)"/></div>
                                            <p class="p-img-name">
                                                {{ file.name }}
                                            </p>
                                            <button
                                                    class="ml-2 btn-img-delete"
                                                    type="button"
                                                    @click="remove(files.indexOf(file))"
                                                    title="Remove file"
                                            >
                                                <i class="fa-solid fa-circle-xmark "></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mt-3">
                                <v-subheader class="text-label-form">Mô tả chi tiết
                                </v-subheader>

                                <v-textarea
                                        v-model="formItem.description"
                                        counter
                                        :placeholder="$t('form.place-area')"
                                        variant="outlined"
                                        :rules="rules"
                                        :readonly="loading"
                                ></v-textarea>
                            </div>
                            <div class="col-12">
                                <v-subheader class="text-label-form">{{ $t('form.label-type-post') }}</v-subheader>
                                <v-select
                                        v-model="formItem.typePost"
                                        :placeholder="$t('form.place-select')"
                                        :items="typePosts"
                                        item-title="typePostName"
                                        item-value="id"
                                        variant="outlined"
                                        density="comfortable"
                                        class="select-option"
                                        :rules="rules"
                                        :readonly="loading"
                                        @update:modelValue=onChangeTypePost
                                ></v-select>
                            </div>
                            <div class="col-12">
                                <v-subheader class="text-label-form">{{ $t('form.label-time') }}</v-subheader>
                                <v-select
                                        v-model="activateDate"
                                        :placeholder="$t('form.place-select')"
                                        :items="postDay"
                                        variant="outlined"
                                        density="comfortable"
                                        class="select-option"
                                        @update:modelValue=onChangeTypePost
                                ></v-select>
                            </div>
                            <div class="col-12">
                                <v-subheader class="text-label-form">{{ $t('form.label-date-start') }}</v-subheader>
                                <Datepicker class="date-picker select-option" v-model="date" :format="format"
                                            :clearable="false"
                                            :enable-time-picker="false"
                                            :min-date="new Date()"
                                            :rules="rules"
                                            :readonly="loading"
                                            :placeholder="$t('form.place-select')" required/>
                            </div>
                            <div class="col-12 mt-3">
                                <v-subheader class="text-label-form">{{ $t('form.label-date-end') }}</v-subheader>
                                <v-text-field
                                        v-model="endDate"
                                        readonly="true"
                                        :placeholder="$t('form.place-text')"
                                        required
                                        variant="outlined"
                                        :rules="rules"
                                ></v-text-field>
                                <v-subheader class="text-label-form">{{ $t('post-form.post-value') }}: {{ money }}VNĐ
                                </v-subheader>
                                <span class="px-2 text-red"
                                      v-if="enoughMoney">{{ $t('post-form.not-enough-money') }}</span>
                                <div class="my-2" v-if="enoughMoney" @click="this.$router.push({name: 'recharge',})">
                                    <button type="button" class="btn btn-success"> {{ $t('sidebar.money') }}</button>
                                </div>
                            </div>

                            <div class="d-flex row ct-form mt-4">
                                <div class="col-12">
                                    <div class="col-12">
                                        <v-subheader class="text-label-form">{{ $t('form.label-province') }}
                                        </v-subheader>

                                        <v-select
                                                v-model="formItem.province"
                                                :placeholder="$t('form.place-select')"
                                                :items="provinces"
                                                item-title="name"
                                                item-value="id"
                                                variant="outlined"
                                                density="comfortable"
                                                class="select-option"
                                                :rules="rules"
                                                :readonly="loading"
                                                @update:modelValue=onChangeProvince
                                        ></v-select>
                                    </div>
                                    <div class="col-12">
                                        <v-subheader class="text-label-form">{{ $t('form.label-district') }}
                                        </v-subheader>
                                        <v-select
                                                v-model="formItem.district"
                                                :placeholder="$t('form.place-select')"
                                                :items="districts"
                                                item-title="name"
                                                item-value="id"
                                                variant="outlined"
                                                density="comfortable"
                                                class="select-option"
                                                ref="selectedDistrict"
                                                :rules="rules"
                                                :readonly="loading"
                                                @update:modelValue=onChangeDistrict
                                        ></v-select>
                                    </div>

                                    <div class="col-12">
                                        <v-subheader class="text-label-form">{{ $t('form.label-ward') }}
                                        </v-subheader>
                                        <v-select
                                                v-model="formItem.ward"
                                                :placeholder="$t('form.place-select')"
                                                :items="wards"
                                                item-title="name"
                                                item-value="id"
                                                variant="outlined"
                                                density="comfortable"
                                                class="select-option"
                                                ref="selectedWard"
                                                :rules="rules"
                                                :readonly="loading"
                                        ></v-select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <v-subheader class="text-label-form">{{ $t('form.label-address') }}
                                </v-subheader>
                                <v-text-field
                                        v-model="formItem.address"
                                        :placeholder="$t('form.place-text')"
                                        variant="outlined"
                                        :rules="rules"
                                        :readonly="loading"
                                ></v-text-field>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <v-subheader class="text-label-form">Email liên hệ
                                    </v-subheader>
                                    <v-text-field
                                            v-model="post.emailContact"
                                            :placeholder="$t('form.place-text')"
                                            variant="outlined"
                                            :rules="rules"
                                            :readonly="loading"
                                    ></v-text-field>
                                </div>
                                <div class="col-6">
                                    <v-subheader class="text-label-form">Số điện thoại liên hệ
                                    </v-subheader>
                                    <v-text-field
                                            v-model="post.sdtContact"
                                            :placeholder="$t('form.place-text')"
                                            variant="outlined"
                                            :rules="rules"
                                            :readonly="loading"
                                    ></v-text-field>
                                </div>
                            </div>
                        </div>
                    </v-card-item>
                </v-card>
                <v-row class="justify-center">
                    <v-btn :disabled="!form"
                           :loading="loading" type="submit" variant="flat" size="large"
                           class="btn-outside bg-primary-tb">
                        <span class="text-white"> {{ $t('button.post') }}</span>
                    </v-btn>
                    <v-btn @click="saveDraft" variant="text" size="large" class="btn-outside br-primary-tb">
                        {{ $t('button.draft') }}
                    </v-btn>
                </v-row>
            </v-form>
        </div>
    </div>
</template>
<script>
    import ImageService from "../../services/image";
    import CategoryService from "../../services/category";
    import DoDienTuService from "../../services/dodientu";
    import PostService from "../../services/post";
    import UserService from "../../services/user";
    import swal from "sweetalert";
    import '@vuepic/vue-datepicker/dist/main.css'

    export default ({
        data() {
            return {
                items: [
                    {
                        title: this.$t('table.user.hrefHome'),
                        disabled: false,
                        href: '/ddt/home',
                    },
                    {
                        title: "Đăng tin",
                        disabled: true,
                        color: "#1479FF",
                    },
                ],
                rules: [
                    v => !!v || this.$t('rules.require.rules'),
                ],
                validate: false,
                activateDate: 7,
                postDay: ['7', '8', '9', '10', '20', '30', '31', '60', '90'],
                endDate: null,
                money: 0,
                files: [],
                typePosts: [],
                provinces: [],
                districts: [],
                wards: [],
                formItem: [],
                categories: [],
                date: null,
                format: null,
                surplus: null,
                loading: false,
                form: false,
                rawInput: "",
                urlImageLoad: '',
                changeImg: true,
                image: '',
                enoughMoney: false,
                post: {
                    id: null,
                    title: null,
                    description: null,
                    thumbnail: null,
                    address: null,
                    price: null,
                    postPrice: null,
                    quantity: null,
                    viewCount: 0,
                    postDate: null,
                    endDate: null,
                    status: 0,
                    userId: null,
                    emailContact: null,
                    sdtContact: null,
                    ward: {
                        id: null,
                    },
                    typePost: {
                        id: null,
                    },
                    category: {
                        id: null
                    },
                },
                typePost: {
                    id: null,
                    typePostName: null,
                    typePostPrice: null
                },
                draftStatus: false,
            }
        },
        setup() {
            let user = JSON.parse(localStorage.getItem("user"))
            return {
                user
            }
        },

        created() {
            this.getDoDienTu();
            this.findUserById();
        },
        mounted() {
            this.post.id = null;
            this.date = new Date()
            this.format = this.formatDate(this.date)
        },
        methods: {
            formatNumber(num) {
                return parseFloat(num).toFixed(2)
            },
            save() {
                this.post.userId = this.user.id
                if (this.draftStatus) {
                    this.post.status = 0;
                } else {
                    this.post.status = 1;
                }

                this.post.postPrice = this.typePost.typePostPrice * this.activateDate * 1000

                const value = this.post.price

                let cleanedString = value.trim().replace(/,/g, '');
                let decimalSplit = cleanedString.split('.');
                let size = decimalSplit.length
                let tam = ""
                for (let i = 0;i< size ;i++){
                    tam = tam + decimalSplit[i]
                }
                let bigDecimalValue = tam + '.00';
                this.post.price = bigDecimalValue

                var data = {
                    title: this.formItem.projectName,
                    description: this.formItem.description,
                    thumbnail: this.post.thumbnail,
                    price: this.post.price,
                    quantity: this.formItem.soLuong,
                    postDate: this.post.postDate,
                    viewCount: this.post.viewCount,
                    postPrice: this.post.postPrice,
                    endDate: this.post.endDate,
                    ward: {id: this.formItem.ward},
                    typePost: {id: this.formItem.typePost},
                    category: {id: this.formItem.category},
                    userId: this.post.userId,
                    address: this.formItem.address,
                    status: this.post.status,
                    emailContact: this.post.emailContact,
                    sdtContact: this.post.sdtContact
                }
                PostService.add(data)
                    .then(response => {
                        let id = response.data.id
                        this.post = response.data
                        if (this.post.status != 0) {
                            this.payPost()
                        }
                        let file = this.$refs.thumbnail.files[0];
                        let formData = new FormData();
                        formData.append('file', file);
                        formData.append('path', "post//" + this.post.id);
                        if (file != null) {
                            ImageService.uploadImage(formData)
                                .then(response => {
                                    this.post.thumbnail = response.data.urlFile
                                    this.post.images = []
                                    PostService.add(this.post).then(() => {
                                    }).catch(e => {
                                        this.notification(e.response.data.message, "error");
                                    });
                                })
                                .catch(e => {
                                    this.notification(e.response.data.message, "error");
                                });
                        }
                        this.updateImages(id)
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });
            },
            saveDraft() {
                this.draftStatus = true;
                this.save()
            },

            updateImages(id) {
                for (let i = 0; i < this.files.length; i++) {
                    let file = this.$refs.file.files[i];
                    let formData = new FormData();
                    formData.append('file', file);
                    formData.append('path', "post//" + id);
                    if (file != null) {
                        ImageService.uploadImage(formData)
                            .then(response => {
                                let postImage = {
                                    urlImage: response.data.urlFile,
                                    nameImage: response.data.fileName,
                                    post: {
                                        id: id,
                                    },
                                }

                                PostService.addImage(postImage).then(() => {

                                }).catch(e => {
                                    this.notification(e.response.data.message, "error");
                                });
                            })
                            .catch(e => {
                                this.notification(e.response.data.message, "error");
                            });
                    }
                }
                swal({
                    title: this.$t('post-form.confrim'),
                    icon: "success",
                    buttons: true,
                    dangerMode: false,
                })
                    .then(() => {
                        this.$router.push({name: 'user-list-post'}).then(() => {
                            this.$router.go()
                        })
                    });
            },

            payPost() {
                var data = {
                    userId: this.user.id,
                    moneyPost: this.post.postPrice
                }
                UserService.payPost(data).then()
            },

            validateForm() {
                const {valid} = this.$refs.form.validate()

                if (!valid) {
                    this.validate = true
                }
            },
            getDoDienTu() {
                var params = {};
                params["isDelete"] = 'false'
                DoDienTuService.list("province", params)
                    .then(response => {
                        this.provinces = response.data;
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });
                DoDienTuService.list("typepost", params)
                    .then(response => {
                        this.typePosts = response.data;
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });
                CategoryService.list()
                    .then(reponse => {
                        this.categories = reponse.data
                    })
            },
            getDistrictsByProvinceId() {
                var params = {};
                params["isDelete"] = 'false'
                DoDienTuService.findByParentId("district", "province", params, this.formItem.province)
                    .then(response => {
                        this.districts = response.data
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });
            },
            getWardsByDistrictId() {
                var params = {};
                params["isDelete"] = 'false'
                DoDienTuService.findByParentId("ward", "district", params, this.formItem.district)
                    .then(response => {
                        this.wards = response.data
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error")
                    });
            },
            findUserById() {
                UserService.findUserById(this.user.id)
                    .then((res) => {
                        this.surplus = res.data.surplus
                    })
            },

            findByID(id) {
                var params = {};
                params["isDelete"] = 'false';
                PostService.findByID(params, id)
                    .then(response => {
                        this.post = response.data;
                        this.formItem.province = response.data.ward.district.province.id
                        this.formItem.district = response.data.ward.district.id

                        const date1 = new Date(response.data.postDate).getTime();
                        const date2 = new Date(response.data.endDate).getTime();
                        const diffTime = date2 - date1;
                        let daysDifference = Math.round(diffTime / 1000 / 60 / 60 / 24);
                        this.date = new Date(response.data.postDate)
                        this.format = this.formatDate(this.date)
                        this.activateDate = daysDifference
                        this.money = (this.post.typePost.typePostPrice * this.activateDate) * 1000
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });
            },

            handleInput() {
                this.rawInput = this.unformatCurrency(this.formItem.money);
                this.formItem.money = this.formatCurrency(this.rawInput);
            },
            formatCurrency(value) {
                if (!value) return "";
                const amount = parseInt(value.toString().replace(/\D/g, ""));
                return new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND"
                }).format(amount).replace('₫', '')
            },
            unformatCurrency(value) {
                return value.toString().replace(/,/g, "").replace(/\./g, "");
            },
            onFileChange(e) {
                try {
                    var input = e.target;
                    var filename = input.files[0].name;
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();
                        reader.onload = (event) => {
                            if (event.target.result != 'data:') {
                                this.urlImageLoad = event.target.result;
                                this.post.thumbnail = filename;
                            } else {
                                this.urlImageLoad = '';
                                e.target.value = '';
                            }
                        };
                        reader.readAsDataURL(input.files[0]);
                    }
                }
                catch (e) {
                    this.urlImageLoad = 'null';
                    this.post.thumbnail = '';
                }
            },
            remove(i) {
                this.files.splice(i, 1)
            },
            generateURL(file) {
                let fileSrc = URL.createObjectURL(file)
                setTimeout(() => {
                    URL.revokeObjectURL(fileSrc)
                }, 1000)
                return fileSrc
            },
            getUrlImage(name) {
                return ImageService.getImage(name);
            },
            onChange() {
                this.files = [...this.$refs.file.files]
            },
            dragover(e) {
                e.preventDefault()
                this.isDragging = true
            },
            dragleave() {
                this.isDragging = false
            },
            drop(e) {
                e.preventDefault()
                this.$refs.file.files = e.dataTransfer.files
                this.onChange()
                this.isDragging = false
            },
            formatDate(dateNew) {
                const day = dateNew.getDate()
                const month = dateNew.getMonth() + 1
                const year = dateNew.getFullYear()

                return `${year}-${month}-${day}`
            },
            notification(message, type) {
                swal({
                    text: message,
                    icon: type,
                    timer: 5000,
                })
            },
            onChangeTypePost() {
                for (let key in this.typePosts) {
                    if (this.typePosts[key].id === this.formItem.typePost) {
                        this.typePost = this.typePosts[key]
                        break
                    }
                }
                this.money = this.typePost.typePostPrice * this.activateDate
                this.money = this.money * 1000
                this.money = this.formatCurrency(this.money)
            },
            onChangeProvince() {
                this.getDistrictsByProvinceId()
                this.districts = []
                this.wards = []
                this.$refs["selectedDistrict"].reset();
                this.$refs["selectedWard"].reset();
            },
            onChangeDistrict() {
                if (this.formItem.district != null) {
                    this.getWardsByDistrictId(this.formItem.district)
                }

                this.wards = []
                this.$refs["selectedWard"].reset();
            }
        },
        watch: {
            activateDate() {
                let dateEnd = new Date()
                let res = dateEnd.setTime(this.date.getTime() + (this.activateDate * 24 * 60 * 60 * 1000))
                this.endDate = this.formatDate(new Date(res))
                let ts1 = this.date.getTime()
                this.post.postDate = ts1
                let resEnd = this.endDate
                let ts = new Date(resEnd).getTime()
                this.post.endDate = ts
            },
            date() {
                let dateEnd = new Date()
                let res = dateEnd.setTime(this.date.getTime() + (this.activateDate * 24 * 60 * 60 * 1000))
                this.endDate = this.formatDate(new Date(res))
                let ts1 = this.date.getTime()
                this.post.postDate = ts1
                let resEnd = this.endDate
                let ts = new Date(resEnd).getTime()
                this.post.endDate = ts
                this.format = this.formatDate(this.date)
            },
            money() {
                this.findUserById()
                if (this.surplus < this.money) {
                    this.enoughMoney = true
                    this.validate = true
                } else {
                    this.enoughMoney = false
                    this.validate = false
                }
            }
        }
    })
</script>
<style>
    .ct-map {
        height: 242px;
    }

    .ct-form {
        justify-content: space-between;
    }

    .ct-multi-img {
        height: 150px;
        width: 150px;
    }

    .ct-border-mutil-img {
        border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
        border-radius: 4px;
    }

    .v-text-field.v-input__details {

    }
</style>