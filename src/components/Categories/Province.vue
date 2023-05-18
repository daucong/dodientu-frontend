<template>

    <v-col lg="10" class="px-6 rounded bg-background mb-12">
        <v-breadcrumbs :items="items" class="bread">
            <template v-slot:title="{ item }">
                {{ item.title }}
            </template>
        </v-breadcrumbs>

        <div class="container">
            <div class="row mb-3">
                <div class="col-12">
                    <div class="row">
                        <div class="col-5"><h2 class="listNews">{{ $t('sidebar.admin.categories.province') }}</h2></div>
                        <div class="col-2 offset-5">
                            <v-btn class="btn-icon float-end"
                                   color="success"
                                   prepend-icon="fa fa-plus-circle"
                                   @click="dialog=true"
                            >
                                <span class="text-white">{{ $t('button.new') }}</span>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row"><v-table fixed-header lg="12" id="table" class="br-none bg-white">
                <thead class="bg-primary-tb text-tb-header">
                <tr>
                    <th class="color-tb bg-primary-tb" v-for="item in headers"
                        :key="item.name">
                        {{ item.name }}
                        <span class="arrow asc"></span>
                    </th>
                    <th class="color-tb bg-primary-tb">{{ $t('table.action') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="entry in provinces" :key="entry.id" class="br-none ">
                    <td class="row-tb text-tb-content">{{entry.id}}</td>
                    <td class="row-tb text-tb-content">{{entry.name}}</td>
                    <td class="row-tb text-tb-content">
                        <v-img
                                class="image-tb"
                                :src=getUrlImage(entry.urlImage)></v-img>
                    </td>
                    <td class="row-tb text-tb-content">{{entry.lat}}</td>
                    <td class="row-tb text-tb-content">{{entry.lng}}</td>
                    <td>
                        <v-btn class="ma-5 btn-icon"
                               color="warning"
                               icon="fa fa-edit"
                               size="x-small"
                               @click="handleEdit(entry.id)"
                        ></v-btn>
                        <v-btn class="ma-5 btn-icon"
                               color="red"
                               icon="fa fa-trash"
                               size="x-small"
                               @click="deletebyId(entry.id)"
                        ></v-btn>
                    </td>
                </tr>
                </tbody>
            </v-table></div></div>


    </v-col>

    <v-row justify="center">
        <v-dialog
                v-model="dialog"
                persistent
                transition="dialog-bottom-transition"
                max-width="800"
                class="form-container"
        >
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="3" class="align-self-center"><span class="text-label-form">Name</span></v-col>
                            <v-col cols="9">
                                <v-text-field
                                        variant="outlined"
                                        :placeholder="$t('form.place-text')"
                                        v-model="province.name"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" class="align-self-center"><span class="text-label-form">{{ $t('form.label-image') }}</span>
                            </v-col>
                            <v-col cols="9">
                                <v-file-input v-if="changeImg" class="input-image border-color-cus" density="counter"
                                              counter
                                              variant="outlined"
                                              prepend-icon="mdi:mdi-camera"
                                              @change="onFileChange" v-model="image" ref="file"
                                              required></v-file-input>
                            </v-col>

                            <v-col cols="3" class="align-self-center mr-3">
                            </v-col>
                            <v-card class="bg-white br-none">
                                <v-img max-height="180px" width="180px" v-if="image.length > 0"
                                       :src="urlImageLoad"/>

                                <v-img id="edit" max-height="180px" width="180px"
                                       v-if="province.id != null && image.length <= 0"
                                       :src="getUrlImage(province.urlImage)"/>
                            </v-card>
                        </v-row>

                        <v-row>
                            <v-col cols="3" class="align-self-center"><span class="text-label-form">Lat</span></v-col>
                            <v-col cols="9">
                                <v-text-field
                                        variant="outlined"
                                        :placeholder="$t('form.place-text')"
                                        v-model="province.lat"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" class="align-self-center"><span class="text-label-form">Lng</span></v-col>
                            <v-col cols="9">
                                <v-text-field
                                        variant="outlined"
                                        :placeholder="$t('form.place-text')"
                                        v-model="province.lng"></v-text-field>
                            </v-col>
                        </v-row>

                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            class="btn-cancel"
                            @click="dialog = false"
                    >{{ $t('button.close') }}
                    </v-btn>
                    <v-btn
                            class="btn-save"
                            @click="save()"
                    >{{ $t('button.save') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-row>
</template>

<script>
    import CategoriesService from "../../services/categories";
    import ImageService from "../../services/image";
    import swal from "sweetalert";

    export default {
        data() {
            return {
                changeImg: true,
                urlImageLoad: '',
                image: '',
                headers: [
                    {
                        name: 'ID',
                        code: 'id',
                        type: 'text'
                    },
                    {
                        name: 'Name',
                        code: 'name',
                        type: 'text'
                    },
                    {
                        name: 'Image',
                        code: 'urlImage',
                        type: 'image'
                    },
                    {
                        name: 'LAT',
                        code: 'lat',
                        type: 'text'
                    },
                    {
                        name: 'LNG',
                        code: 'lng',
                        type: 'text'
                    }
                ],
                items: [
                    {
                        title: this.$t('sidebar.admin.home'),
                        disabled: false,
                        href: 'home',
                    },
                    {
                        title: this.$t('sidebar.admin.categories.province'),
                        disabled: true,
                        href: 'breadcrumbs_link_2',
                    },
                ],
                provinces: [],
                dialog: false,
                province: {
                    id: '',
                    name: '',
                    urlImage: '',
                    lat: '',
                    lng: ''
                },
            }
        },
        mounted() {
            this.getCategory();
        },
        methods: {
            notification(message, type) {
                swal({
                    text: message,
                    icon: type,
                    timer: 5000,
                })
            },
            getCategory() {
                var params = {};
                params["isDelete"] = 'false';
                CategoriesService.list("province", params)
                    .then(response => {
                        this.provinces = response.data;
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });
            },
            findByID(id) {
                var params = {};
                params["isDelete"] = 'false';
                CategoriesService.findByID("province", params, id)
                    .then(response => {
                        this.province = response.data;
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });
            },
            handleEdit(id) {
                this.findByID(id);
                this.dialog = true;
            },

            save() {
                CategoriesService.add("province", this.province)
                    .then(response => {
                        if (response.data.id != null) {
                            let id = response.data.id;
                            let name = response.data.name;
                            let lat = response.data.lat;
                            let lng = response.data.lng;
                            let formData = new FormData();
                            let file = this.$refs.file.files[0];
                            formData.append('file', file);
                            formData.append('path', "provinces//" + id);
                            if (file != null) {
                                ImageService.uploadImage(formData)
                                    .then(response => {
                                        let update = {
                                            id: id,
                                            name: name,
                                            urlImage: response.data.urlFile,
                                            lat: lat,
                                            lng: lng,
                                        }
                                        CategoriesService.add("province", update).then(() => {
                                            this.getCategory();
                                            this.resetModel();
                                            this.dialog = false;
                                        })
                                            .catch(e => {
                                                this.notification(e.response.data.message, "error");
                                            });
                                    })
                                    .catch(e => {
                                        this.notification(e.response.data.message, "error");
                                    });
                            } else {
                                this.getCategory();
                                this.resetModel();
                                this.dialog = false;
                            }
                        }
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });

            },
            deletebyId(id) {
                swal({
                    title: this.$t('message.swal.delete'),
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            CategoriesService.delete("province", id).then(response => {
                                this.getCategory();
                                if (response.data.status === "BAD_REQUEST") {
                                    swal(this.$t('message.swal.delete-error'), {
                                        icon: "error",
                                    });
                                }
                                this.getCategory();
                            }).catch(e => {
                                this.notification(e.response.data.message, "error");
                            });

                            swal(this.$t('message.swal.icon.success'), {
                                icon: "success",
                            });
                        }
                    });
            },
            resetModel() {
                this.province.id = null;
                this.province.name = null;
                this.province.lat = null;
                this.province.lng = null;
                this.urlImage = null;
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
                                this.province.urlImage = filename;
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
                    this.province.urlImage = '';
                }
            }
        },
        watch: {
            dialog() {
                this.resetModel();
            }
        }
    }
</script>

<style scoped>
</style>