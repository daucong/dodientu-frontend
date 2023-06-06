<template>
    <div class="d-flex w-100">
        <div class="container">
            <div class="top-table-profile">
                <v-breadcrumbs :items="items" class="breadcrumbs">
                </v-breadcrumbs>
                <h1>Sửa tin đăng</h1>
            </div>
            <v-form v-model="form" @submit.prevent="save">
                <v-card class="form-container">
                    <v-card-item>
                        <div class="text-title-color">
                            I.{{ $t('post-form.base-information') }}
                        </div>
                    </v-card-item>
                    <v-card-item>
                        <div class="d-grid">
                            <div class="col-12">
                                <v-subheader class="text-label-form">Tiêu đề
                                </v-subheader>

                                <v-text-field
                                        v-model="post.title"
                                        placeholder="Nhập tiêu đề"
                                        variant="outlined"
                                        :rules="rulesDefault"
                                        :readonly="loading"
                                ></v-text-field>
                            </div>
                            <div class="col-12">
                                <v-subheader class="text-label-form">Thể loại
                                </v-subheader>

                                <v-select
                                        v-model="post.category"
                                        :placeholder="$t('form.place-select')"
                                        :items="categories"
                                        item-title="name"
                                        item-value="id"
                                        variant="outlined"
                                        density="comfortable"
                                        class="select-option"
                                        :rules="rulesDefault"
                                        :readonly="loading"
                                        @update:modelValue=onChangeCategory
                                ></v-select>
                            </div>
                            <div class="col-12">
                                <v-subheader class="text-label-form">Số lượng
                                </v-subheader>

                                <v-text-field
                                        v-model="post.quantity"
                                        placeholder="Nhập số lượng"
                                        variant="outlined"
                                        type="number"
                                        :rules="rulesDefault"
                                        :readonly="loading"
                                ></v-text-field>
                            </div>
                            <div class="col-12">
                                <v-subheader class="text-label-form">{{ $t('form.label-province') }}
                                </v-subheader>

                                <v-select
                                        v-model="post.province"
                                        :placeholder="$t('form.place-select')"
                                        :items="provinces"
                                        item-title="name"
                                        item-value="id"
                                        variant="outlined"
                                        density="comfortable"
                                        class="select-option"
                                        :rules="rulesDefault"
                                        :readonly="loading"
                                        @update:modelValue=onChangeProvince
                                ></v-select>
                            </div>
                            <div class="col-12">
                                <v-subheader class="text-label-form">{{ $t('form.label-district') }}
                                </v-subheader>
                                <v-select
                                        v-model="post.district"
                                        :placeholder="$t('form.place-select')"
                                        :items="districts"
                                        item-title="name"
                                        item-value="id"
                                        variant="outlined"
                                        density="comfortable"
                                        class="select-option"
                                        ref="selectedDistrict"
                                        :rules="rulesDefault"
                                        :readonly="loading"
                                        @update:modelValue=onChangeDistrict
                                ></v-select>
                            </div>

                            <div class="col-12">
                                <v-subheader class="text-label-form">{{ $t('form.label-ward') }}
                                </v-subheader>
                                <v-select
                                        v-model="post.ward"
                                        :placeholder="$t('form.place-select')"
                                        :items="wards"
                                        item-title="name"
                                        item-value="id"
                                        variant="outlined"
                                        density="comfortable"
                                        class="select-option"
                                        ref="selectedWard"
                                        :rules="rulesDefault"
                                        :readonly="loading"
                                ></v-select>
                            </div>
                            <div class="col-12">
                                <v-subheader class="text-label-form">{{ $t('form.label-address') }}
                                </v-subheader>
                                <v-text-field
                                        v-model="post.address"
                                        :placeholder="$t('form.place-text')"
                                        variant="outlined"
                                        :rules="rulesDefault"
                                        :readonly="loading"
                                ></v-text-field>
                            </div>
                        </div>
                    </v-card-item>
                </v-card>

                <v-card class="form-container">
                    <v-card-item>
                        <div class="text-title-color">
                            II.THÔNG TIN MÔ TẢ
                        </div>
                    </v-card-item>
                    <v-card-item>
                        <div class="d-flex flex-column">
                            <div class="col-12">
                                <v-subheader class="text-label-form">{{ $t('form.label-price') }} (VNĐ)*
                                </v-subheader>

                                <v-text-field
                                        v-model="post.price"
                                        placeholder="Nhập giá tiền"
                                        variant="outlined"
                                        @input="handleInput"
                                        :rules="rulesDefault"
                                        :readonly="loading"
                                ></v-text-field>
                            </div>
                            <div class="col-12">
                                <v-subheader class="text-label-form">{{ $t('form.label-description') }}
                                </v-subheader>
                                <v-textarea
                                        v-model="post.description"
                                        counter
                                        :placeholder="$t('form.place-area')"
                                        variant="outlined"
                                        :rules="rulesDefault"
                                        @input="validateForm"
                                ></v-textarea>
                            </div>
                        </div>
                    </v-card-item>
                </v-card>

                <v-card class="form-container">

                    <v-card-item>
                        <div class="text-title-color">
                            III.{{ $t('post-form.img-information') }}
                        </div>
                    </v-card-item>
                    <v-card-item class="pa-5">
                        <div class="py-2 my-1">
                            <div class="row">
                                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 pb-3 align-self-center"><span
                                        class="text-label-form">{{ $t('form.label-image-thumbnail') }}</span>
                                </div>
                                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 align-self-center">
                                    <v-file-input v-if="changeImg" class="input-image border-color-cus"
                                                  density="counter"
                                                  counter
                                                  variant="outlined"
                                                  prepend-icon="mdi:mdi-camera"
                                                  @change="onFileChange" v-model="image" ref="thumbnail"
                                                  required></v-file-input>
                                </div>

                            </div>
                            <div class="bg-white br-none">
                                <v-img class="rounded" max-height="280px" width="280px" v-if="image.length > 0"
                                       :src="urlImageLoad"/>

                                <v-img class="rounded" id="edit" max-height="280px" width="280px"
                                       v-if="post.id != null && image.length <= 0"
                                       :src="getUrlImage(post.thumbnail)"/>
                            </div>
                        </div>
                        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 pb-3 align-self-center"><span
                                class="text-label-form">{{ $t('form.label-image') }}</span></div>
                        <div
                                class="dropzone-container"
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
                            <div class="preview-container mt-4" v-if="files.length">
                                <div v-for="file in files" :key="file.name" class="preview-card">
                                    <div class="preview-img"><img :src="generateURL(file)"/></div>
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

                            <div class="preview-container mt-4" v-if="getSizeImages > 0">
                                <div v-for="item in post.images" :key="item.id" class="preview-card">
                                    <div class="preview-img"><img :src="getUrlImage(item.urlImage)"/></div>
                                    <p class="p-img-name">
                                        {{ item.nameImage }}
                                    </p>
                                    <button
                                            class="ml-2 btn-img-delete"
                                            type="button"
                                            @click="removeEdit(item.id)"
                                            title="Remove file"
                                    >
                                        <i class="fa-solid fa-circle-xmark "></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </v-card-item>
                </v-card>

                <v-card class="form-container">
                    <v-card-item>
                        <div class="text-title-color">
                            IV. {{ $t('post-form.type-and-pay') }}
                        </div>
                    </v-card-item>
                    <v-card-item class="pa-5">
                        <v-row>
                            <v-col cols="8" md="3">
                                <v-subheader class="text-label-form">{{ $t('form.label-type-post') }}</v-subheader>
                                <v-select
                                        v-model="post.typePost"
                                        :placeholder="$t('form.place-select')"
                                        :items="typePosts"
                                        item-title="typePostName"
                                        item-value="id"
                                        variant="outlined"
                                        density="comfortable"
                                        class="select-option"
                                        @update:modelValue=onChangeTypePost
                                        :readonly=blockEdit
                                ></v-select>
                            </v-col>
                            <v-col cols="8" md="3">
                                <v-subheader class="text-label-form">{{ $t('form.label-time') }}</v-subheader>
                                <v-select
                                        v-model="activateDate"
                                        :placeholder="$t('form.place-select')"
                                        :items="postDay"
                                        variant="outlined"
                                        density="comfortable"
                                        class="select-option"
                                        :readonly=blockEdit
                                        @update:modelValue=onChangeTypePost
                                ></v-select>
                            </v-col>
                            <v-col cols="8" md="3">
                                <v-subheader class="text-label-form">{{ $t('form.label-date-start') }}</v-subheader>
                                <Datepicker class="date-picker select-option" v-model="date" :format="format"
                                            :clearable="false"
                                            :enable-time-picker="false"
                                            :min-date="new Date()"
                                            :readonly=blockEdit
                                            :placeholder="$t('form.place-select')" required/>
                            </v-col>
                            <v-col cols="8" md="3">
                                <v-subheader class="text-label-form">{{ $t('form.label-date-end') }}</v-subheader>
                                <v-text-field
                                        v-model="endDate"
                                        readonly="true"
                                        :placeholder="$t('form.place-text')"
                                        required
                                        variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-subheader class="text-label-form">{{ $t('post-form.post-value') }}: {{ money }} VNĐ
                        </v-subheader>
                        <span class="px-2 text-red" v-if="enoughMoney">{{ $t('post-form.not-enough-money') }}</span>
                        <div class="my-2" v-if="enoughMoney" @click="$router.push({name: 'recharge',})">
                            <button type="button" class="btn btn-success"> {{ $t('sidebar.money') }}</button>
                        </div>
                    </v-card-item>
                </v-card>

                <v-card class="form-container">
                    <v-card-item>
                        <div class="text-title-color">
                            V. {{ $t('post-form.contact-information') }}
                        </div>
                    </v-card-item>
                    <v-card-item class="pa-5">
                        <div class="d-flex flex-wrap px-3">
                            <div class="col-12">
                                <div class="col-12">
                                    <v-subheader class="text-label-form">{{ $t('form.label-address') }}
                                    </v-subheader>
                                    <v-text-field
                                            v-model="post.address"
                                            :placeholder="$t('form.place-text')"
                                            variant="outlined"
                                            :rules="rulesDefault"
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
                                                :rules="rulesDefault"
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
                                                :rules="rulesDefault"
                                                :readonly="loading"
                                        ></v-text-field>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-card-item>
                </v-card>

                <v-row class="justify-center">
                    <v-btn
                            :loading="loading" type="submit" variant="flat" size="large"
                            class="btn-outside bg-primary-tb">
                        <span class="text-white"> {{ $t('button.post') }}</span>
                    </v-btn>
                    <v-btn v-if="post.status == 0" @click="saveDraft" variant="text" size="large"
                           class="btn-outside br-primary-tb">
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
                        title: this.$t('sidebar.admin.reatly.title'),
                        disabled: false,
                        href: 'user-list-post',
                    },
                    {
                        title: this.$t('sidebar.admin.reatly.post'),
                        disabled: true,
                        href: 'breadcrumbs_link_2',
                    },
                ],
                validate: true,
                rulesDefault: [
                    v => !!v || this.$t('rules.require.rules'),
                ],
                changeImg: true,
                urlImageLoad: '',
                image: '',
                getSizeImages: 0,
                isSelected: true,
                postDay: ['7', '8', '9', '10', '20', '30', '31', '60', '90'],
                enoughMoney: false,
                activateDate: 7,
                files: [],
                endDate: null,
                money: 0,
                typePosts: [],
                provinces: [],
                districts: [],
                wards: [],
                categories: [],
                loading: false,
                form: false,
                postList: [],
                rawInput: "",
                typePost: {
                    id: null,
                    typePostName: null,
                    typePostPrice: null
                },
                provinceEdit: {
                    id: '',
                    name: '',
                    urlImage: '',
                    lat: '',
                    lng: ''
                },
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
                    statusPlus: null,
                    userId: null,
                    emailContact: null,
                    sdtContact: null,
                    ward: {
                        id: null,
                        district: {
                            id: null,
                            province: {
                                id: null,
                                name: null,
                                lat: null,
                                lng: null,
                            }
                        }
                    },
                    typePost: {
                        id: null,
                    },
                    category: {
                        id: null
                    },

                },
                date: null,
                format: null,
                surplus: null,
                blockEdit: false,
                draftStatus: false,
                cofrimApprove: this.$t('post-form.confrim'),
                oldStatus: "",
                oldDate: ""
            }
        },
        created() {
            this.getDoDienTu()
            var paramID = localStorage.getItem('postEdit')

            if (typeof (paramID) !== 'undefined') {
                this.findByID(paramID);
                this.blockEdit = true
            }
        },
        setup() {
            let user = JSON.parse(localStorage.getItem("user"))

            return {
                user,
            }

        },

        mounted() {
            this.date = new Date()
            this.format = this.formatDate(this.date)
        },

        methods: {
            getActivate(dateEnd) {
                const date1 = new Date().getTime();
                const date2 = new Date(dateEnd).getTime();

                if (date2 > date1) {
                    return "Còn hạn"
                } else {
                    return "Hết hạn"
                }
            },

            validateForm() {
                const {valid} = this.$refs.form.validate()

                if (!valid) {
                    this.validate = true
                }
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

            /*image*/
            removeEdit(id) {
                const indexToRemove = this.post.images.findIndex((pl) => pl.id === id);
                this.post.images.splice(indexToRemove, 1);
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
            /*image-end*/
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
                DoDienTuService.findByParentId("district", "province", params, this.post.province)
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
                DoDienTuService.findByParentId("ward", "district", params, this.post.district)
                    .then(response => {
                        this.wards = response.data
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error")
                    });
            },
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

                this.post.postPrice = this.post.postPrice > 0 ? this.post.postPrice : this.typePost.typePostPrice * this.activateDate * 1000

                const value = this.post.price

                let cleanedString = value.trim().replace(/,/g, '');
                let decimalSplit = cleanedString.split('.');
                let size = decimalSplit.length
                let tam = ""
                for (let i = 0; i < size; i++) {
                    tam = tam + decimalSplit[i]
                }
                let bigDecimalValue = tam + '.00';
                this.post.price = bigDecimalValue
                PostService.add(this.post)
                    .then(response => {
                        let id = response.data.id
                        this.post = response.data
                        if (this.oldStatus === 2 && this.oldDate === "Hết hạn") {
                            this.payPost()
                        }
                        if (this.oldStatus === 3 || this.oldStatus === 4 || this.oldStatus === 0) {
                            this.payPost()
                        }
                        let file = this.$refs.thumbnail.files[0];
                        let formData = new FormData();
                        formData.append('file', file);
                        formData.append('path', "post//" + id);

                        if (file != null) {
                            ImageService.uploadImage(formData)
                                .then(response => {
                                    this.post.thumbnail = response.data.urlFile
                                    this.post.images = []
                                    PostService.add(this.post).then(() => {
                                    }).catch(e => {
                                        console.log(e, "error");
                                    });
                                })
                                .catch(e => {
                                    console.log(e, "error");
                                });
                        }
                        this.updateImages(id)
                    })
                    .catch(e => {
                        this.notification(e, "error");
                    });


            },
            saveDraft() {
                this.draftStatus = true
                this.save()
            },
            payPost() {
                var data = {
                    userId: this.user.id,
                    moneyPost: this.post.postPrice
                }
                UserService.payPost(data).then()
            },
            findByID(id) {
                var params = {};
                params["isDelete"] = 'false';
                PostService.findByID(params, id)
                    .then(response => {
                        this.post = response.data;
                        var checkDate = this.getActivate(response.data.endDate)
                        const date1 = new Date(response.data.postDate).getTime();
                        const date2 = new Date(response.data.endDate).getTime();
                        const diffTime = date2 - date1;
                        let daysDifference
                        this.oldStatus = this.post.status
                        this.oldDate = checkDate

                        this.format = this.formatDate(this.date)
                        if (checkDate === "Còn hạn" && (this.post.status === 3 || this.post.status === 1)) {
                            this.blockEdit = false
                            this.date = new Date()
                            daysDifference = 7
                        }
                        if (this.post.status === 4) {
                            this.blockEdit = false
                            this.date = new Date()
                            daysDifference = 7
                        }

                        if (checkDate === "Hết hạn") {
                            this.blockEdit = false
                            this.date = new Date()
                            daysDifference = 7
                        }
                        if (checkDate === "Hết hạn" && this.post.status === 2) {
                            this.blockEdit = false
                            this.date = new Date()
                            daysDifference = 7
                        } else {
                            if (this.post.status === 2) {
                                daysDifference = Math.round(diffTime / 1000 / 60 / 60 / 24);
                                this.date = new Date(response.data.postDate)
                            }
                        }

                        this.typePost = this.post.typePost

                        this.activateDate = daysDifference
                        this.getSizeImages = response.data.images.length
                        this.post.district = response.data.ward.district.name
                        this.post.province = response.data.ward.district.province.id

                        this.money = (this.post.typePost.typePostPrice * this.activateDate) * 1000

                        this.post.price = this.formatCurrency(this.post.price)
                        this.findUserById()

                    })
                    .catch(e => {
                        this.notification(e, "error");
                    });
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
            findUserById() {
                UserService.findUserById(this.user.id)
                    .then((res) => {
                        this.surplus = res.data.surplus
                        if (this.surplus < this.money) {
                            this.enoughMoney = true
                            this.validate = false
                        } else {
                            this.enoughMoney = false
                            this.validate = true
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            },
            getUrlImage(name) {
                return ImageService.getImage(name);
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
            onChangeProvince() {
                this.getDistrictsByProvinceId()
                this.districts = []
                this.wards = []
                this.$refs["selectedDistrict"].reset();
                this.$refs["selectedWard"].reset();
            },
            onChangeDistrict() {
                if (this.post.district != null) {
                    this.getWardsByDistrictId(this.post.district)
                }

                this.wards = []
                this.$refs["selectedWard"].reset();
            },
            onChangeTypePost() {
                for (let key in this.typePosts) {
                    if (this.typePosts[key].id === this.post.typePost) {
                        this.typePost = this.typePosts[key]
                        break
                    }
                }
                this.money = this.typePost.typePostPrice * this.activateDate
                this.money = this.money * 1000
                this.money = this.formatCurrency(this.money)
            },
            handleInput() {
                this.rawInput = this.unformatCurrency(this.post.price);
                this.post.price = this.formatCurrency(this.rawInput);
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
            onChangeCategory(){
                this.post.category = {id: this.post.category}
            }
        },
        watch: {
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
            },
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
        }
    });
</script>

<style scoped>
    .date-picker {
        padding-left: 0px !important;
    }

    .dropzone-container {
        border: 1px dashed #ABABAB;
        margin-top: 10px;
        text-align: center;
    }

    .dropzone-container .file-label {
        width: 100%;
    }

    .preview-container {
        height: 200px;
        display: inline-flex;
        align-items: start;

    }

    .preview-card {
        width: 150px;
        height: 150px;
        position: relative;
        background: white;
        margin: 5px;
        box-shadow: white;
    }

    .preview-img {
        width: 100%;
        height: 80%;
    }

    .preview-img img {
        width: 100%;
        height: 100%;
    }

    .btn-img-delete {
        position: absolute;
        right: 0;
        top: 0;
        margin-right: 5px;
    }

    .p-img-name {

        height: 15%;
        padding: 2px;
        overflow: hidden;
    }

</style>