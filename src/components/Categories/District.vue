<template>
    <v-col lg="10" class="px-6 rounded bg-background">
        <v-breadcrumbs :items="items" class="bread">
            <template v-slot:title="{ item }">
                {{ item.title }}
            </template>
        </v-breadcrumbs>

        <div class="container">
            <div class="row mb-3">
                <div class="col-12">
                    <div class="row">
                        <div class="col-5"><h2 class="listNews">{{ $t('sidebar.admin.categories.district') }}</h2></div>
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
            <div class="row">
                <v-table fixed-header lg="12" id="table" class="br-none bg-white">
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
                    <tr v-for="entry in districts" :key="entry.id" class="br-none">
                        <td class="row-tb text-tb-content"> {{entry.id}}</td>
                        <td class="row-tb text-tb-content"> {{entry.name}}</td>
                        <td class="row-tb text-tb-content"> {{entry.province.name}}</td>
                        <td class="row-tb text-tb-content"> {{entry.lat}}</td>
                        <td class="row-tb text-tb-content"> {{entry.lng}}</td>
                        <td>
                            <v-btn class="ma-2 btn-icon"
                                   color="warning"
                                   icon="fa fa-edit"
                                   size="x-small"
                                   @click="handleEdit(entry.id)"
                            ></v-btn>
                            <v-btn class="ma-2 btn-icon"
                                   color="red"
                                   icon="fa fa-trash"
                                   size="x-small"
                                   @click="deletebyId(entry.id)"
                            ></v-btn>
                        </td>
                    </tr>
                    </tbody>
                </v-table>
            </div>
        </div>

    </v-col>

    <v-row justify="center">
        <v-dialog
                v-model="dialog"
                persistent
                max-width="500"
                class="form-container"
        >
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="3" class="align-self-center"><span class="text-label-form">{{ $t('form.label-province') }}</span>
                            </v-col>
                            <v-col cols="9">
                                <v-select
                                        v-model="district.province.id"
                                        :placeholder="$t('form.place-select')"
                                        :items="provinces"
                                        item-title="name"
                                        item-value="id"
                                        variant="outlined"
                                        class="select-option"
                                ></v-select>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3" class="align-self-center"><span class="text-label-form">{{ $t('form.label-name') }}</span>
                            </v-col>
                            <v-col cols="9">
                                <v-text-field
                                        variant="outlined"
                                        :placeholder="$t('form.place-text')"
                                        v-model="district.name"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3" class="align-self-center"><span class="text-label-form">Lat</span></v-col>
                            <v-col cols="9">
                                <v-text-field
                                        variant="outlined"
                                        :placeholder="$t('form.place-text')"
                                        v-model="district.lat"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" class="align-self-center"><span class="text-label-form">Lng</span></v-col>
                            <v-col cols="9">
                                <v-text-field
                                        variant="outlined"
                                        :placeholder="$t('form.place-text')"
                                        v-model="district.lng"></v-text-field>
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
    import swal from "sweetalert";

    export default {
        data() {
            return {
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
                        name: 'Province',
                        code: 'province.name',
                        type: 'text'
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
                        title: this.$t('sidebar.admin.categories.district'),
                        disabled: true,
                        href: 'breadcrumbs_link_2',
                    },
                ],
                provinces: [],
                districts: [],
                dialog: false,
                district: {
                    id: '',
                    name: '',
                    lat: '',
                    lng: '',
                    province: {
                        id: '',
                        name: '',
                    }
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
                CategoriesService.list("district", params)
                    .then(response => {
                        this.districts = response.data;
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error");
                    });
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
                CategoriesService.findByID("district", params, id)
                    .then(response => {
                        this.district = response.data;
                    })
                    .catch(e => {
                        this.notification(e.response.data.message, "error")
                    });
            },
            handleEdit(id) {
                this.findByID(id);
                this.dialog = true;
            },
            save() {
                CategoriesService.add("district", this.district)
                    .then(() => {
                        this.getCategory();
                        this.resetModel();
                        this.dialog = false;
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
                            CategoriesService.delete("district", id).then(response => {
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
                this.district.id = null;
                this.district.name = null;
                this.district.lat = null;
                this.district.lng = null;
                this.district.province.id = null;
            },

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