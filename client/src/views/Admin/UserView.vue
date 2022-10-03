<template>
<header class="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
    <div class="container-xl px-4">
        <div class="page-header-content">
            <div class="row align-items-center justify-content-between pt-3">
                <div class="col-auto mb-3">
                    <h1 class="page-header-title">
                        <div class="page-header-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10.225 20.85 9.85 18q-.3-.075-.875-.387-.575-.313-1.15-.738l-2.625 1.1-1.775-3.125L5.7 13.125q-.05-.25-.075-.525-.025-.275-.025-.575 0-.25.025-.538.025-.287.075-.662l-2.275-1.7L5.2 6.05l2.625 1.1q.425-.35.95-.662Q9.3 6.175 9.85 6l.375-2.85h3.55L14.15 6q.575.2 1.025.475.45.275.925.675l2.7-1.1 1.775 3.075-2.375 1.8q.05.3.075.55.025.25.025.525 0 .25-.025.5t-.1.625l2.35 1.725-1.775 3.125-2.65-1.15q-.45.4-.912.675-.463.275-1.038.475l-.375 2.875Zm1.725-6.425q1 0 1.713-.7.712-.7.712-1.725 0-1.025-.712-1.725-.713-.7-1.713-.7-1.025 0-1.725.7-.7.7-.7 1.725 0 1.025.7 1.725.7.7 1.725.7Zm0-.925q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062q.437-.438 1.062-.438.6 0 1.05.438.45.437.45 1.062T13 13.062q-.45.438-1.05.438Zm.05-1.525Zm-1 7.95h1.95l.375-2.725q.75-.2 1.325-.537.575-.338 1.2-.938l2.5 1.075.975-1.675-2.2-1.65q.125-.425.163-.775.037-.35.037-.7 0-.375-.037-.7-.038-.325-.163-.725l2.25-1.7-.975-1.7-2.575 1.1q-.425-.475-1.162-.912-.738-.438-1.363-.588L13 4.05h-2l-.3 2.725q-.775.175-1.375.5T8.1 8.25L5.6 7.175l-.975 1.7 2.15 1.6q-.125.35-.175.737-.05.388-.05.788 0 .375.05.738.05.362.15.762l-2.125 1.625L5.6 16.8l2.475-1.05q.6.6 1.213.95.612.35 1.387.525Z"/></svg></div>
                        {{ $t('user') }}
                    </h1>
                </div>
            </div>
        </div>
    </div>
</header>
<div class="container-xl px-4 mt-4">
    <div class="card mb-4">
        <div class="card-header">{{ $t('users') }}</div>
        <div class="card-body">
            <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                <div class="dataTable-top">
                    <div class="dataTable-dropdown">
                    <label>
                        <select v-model="table.perPage" class="dataTable-selector">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                        </select>
                        {{ $t('entries_per_page') }}
                    </label>
                    </div>
                    <div class="dataTable-search d-flex">
                        <div class="col-4">
                        </div>
                        <div class="col-8">
                            <input v-model="table.search" class="dataTable-input" :placeholder="$t('search...')" type="text" />
                        </div>
                    </div>
                </div>
                <div class="dataTable-container">
                    <table id="datatablesSimple" class="dataTable-table">
                        <thead>
                            <tr>
                            <th>
                                <a href="#" class="dataTable-sorter">{{ $t('full_name') }}</a>
                            </th>
                            <th>
                                <a href="#" class="dataTable-sorter">{{ $t('email') }}</a>
                            </th>
                            <th>
                                <a href="#" class="dataTable-sorter">{{ $t('role') }}</a>
                            </th>
                            <th>
                                <a href="#" class="dataTable-sorter">{{ $t('joined_date') }}</a>
                            </th>
                            <th>
                                <a href="#" class="dataTable-sorter">{{ $t('actions') }}</a>
                            </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(item,index) in items" :key="index">
                                <td><div class="d-flex align-items-center">
                                        <div class="avatar me-2"><img class="avatar-img img-fluid" :src="item.image"></div>
                                        {{ Object.values(item.name).join(' ') }}
                                    </div>
                                </td>
                                <td>{{ item.email }}</td>
                                <td>{{ roles.filter((el) => { return el._id == item.role })[0].title }}</td>
                                <td>{{ formatDate(item.created_at) }}</td>
                                <td>
                                    <a @click="selectEdit(index)" href="#!" data-bs-toggle="modal" data-bs-target="#editModal"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5.4 18.9h1l9.925-9.925-1-1.025L5.4 17.875ZM18.3 8.325 15.975 6l.75-.775q.45-.425 1.087-.425.638 0 1.088.425l.6.6q.25.275.25.662 0 .388-.25.663Zm-.625.65L6.8 19.825H4.475v-2.35L15.325 6.65Zm-1.85-.525-.5-.5 1 1.025Z"/></svg></a>
                                    <a @click="loginAs(index)" href="#!"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11.75 20.925V20h6.375q.225 0 .413-.188.187-.187.187-.437V5.7q0-.25-.187-.438-.188-.187-.413-.187H11.75V4.15h6.375q.65 0 1.088.45.437.45.437 1.1v13.675q0 .65-.437 1.1-.438.45-1.088.45Zm-.425-5-.65-.625L12.95 13h-8.6v-.925h8.6L10.675 9.8l.65-.675 3.4 3.4Z"/></svg></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="dataTable-bottom">
                    <div class="dataTable-info">{{ $t('showing_0_to_0_of_0_entries',{ from: table.currentPage * table.perPage, to: total, total: Object.keys(items).length }) }}</div>
                    <nav class="dataTable-pagination">
                        <ul class="dataTable-pagination-list">
                            <li v-if="table.currentPage > 1" class="pager"><a @click="table.currentPage++" href="#"> &lt; </a></li>
                            <li v-for="(item,index) in pageCount" :key="index" ><a @click="table.currentPage = index" href="#">{{ ++index }}</a></li>
                            <li v-if="table.currentPage !== pageCount" class="pager"><a @click="table.currentPage--" href="#"> &gt; </a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editModalLabel">{{ $t('edit_user') }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="saveUser()">
        <div class="modal-body">
            <div class="row">
                <div class="col-xl-4">
                    <!-- Profile picture card-->
                    <div class="card mb-4 mb-xl-0">
                        <div class="card-header">{{ $t('profile_picture') }}</div>
                        <div class="card-body text-center">
                            <!-- Profile picture image-->
                            <img class="img-account-profile rounded-circle mb-2" :src="edit.image">
                            <!-- Profile picture upload button-->
                            <div class="small font-italic text-muted mb-4"></div>
                            <input @change="onImageChange($event)" type="file" class="d-none" id="upload-profile-image">
                            <label for="upload-profile-image" class="btn btn-primary" type="button">{{ $t('upload_new_image') }}</label>
                        </div>
                    </div>
                </div>
                <div class="col-xl-8">
                    <!-- Account details card-->
                    <div class="card mb-4">
                        <div class="card-header">{{ $t('account_details') }}</div>
                        <div class="card-body">
                            <!-- Form Row-->
                            <div class="row gx-3 mb-3">
                                <!-- Form Group (first name)-->
                                <div class="col-md-6">
                                    <label class="small mb-1" for="inputFirstName">{{ $t('first_name') }}</label>
                                    <input v-model="edit.name.first" class="form-control" id="inputFirstName" type="text" :placeholder="$t('enter_first_name')">
                                </div>
                                <!-- Form Group (last name)-->
                                <div class="col-md-6">
                                    <label class="small mb-1" for="inputLastName">{{ $t('last_name') }}</label>
                                    <input v-model="edit.name.last" class="form-control" id="inputLastName" type="text" :placeholder="$t('enter_last_name')">
                                </div>
                            </div>
                            <!-- Form Group (email address)-->
                            <div class="mb-3">
                                <label class="small mb-1" for="inputEmailAddress">{{ $t('email') }}</label>
                                <input v-model="edit.email" class="form-control" id="inputEmailAddress" type="email" :placeholder="$t('enter_email_address')">
                            </div>
                            <div class="mb-3">
                            <label class="small mb-1">{{ $t('group(s)') }}</label>
                            <div v-for="(group,index) in groups" :key="index" class="form-check">
                                <input v-model="group.model" @input="selectGroup(index)" class="form-check-input" :id="`groupList${group.title}`" type="checkbox">
                                <label class="form-check-label" :for="[`groupList${group.title}`]">{{ group.title }}</label>
                            </div>
                        </div>
                            <!-- Form Group (Roles)-->
                            <div class="mb-3">
                                <label class="small mb-1">{{ $t('role') }}</label>
                                <select v-model="edit.role" class="form-select" aria-label="Default select example">
                                    <option v-for="(role,index) in roles" :key="index" :value="role._id">{{ role.title }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
            <button type="submit" class="btn btn-primary">{{ $t('save_changes') }}</button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>


<script>
import adminService from '@/services/admin.service';
export default {
    data(){
        return {
            table: {
                perPage: 10,
                currentPage: 0
            },
            items: {},
            roles: {},
            groups: {},
            interval: {},
            pageCount: 0,
            total: 0,
            deleteStep: {},
            edit: {
                name: {}
            }
        }
    },
    async created(){
        const response = await adminService.roleList({perPage: 100, currentPage: 0})
        if(response.status == 1){
            this.roles = response.items
        }
        const response2 = await adminService.groupList({perPage: 100, currentPage: 0})
        if(response2.status == 1){
            this.groups = response2.items
        }
        this.get()
    },
    methods: {
        loginAs(index){
            adminService.userLoginAs(this.items[index])
        },
        selectGroup(index){
            this.groups[index].model = !this.groups[index].model
        },
        async onImageChange(event){
            const newImage = event.target.files[0]
            this.edit.image = URL.createObjectURL(newImage)
            const form = new FormData()
            form.append('image',newImage)
            form.append('user',this.edit._id)
            const response = await adminService.userChangeImage(form)
            if(response.status == 1){
                this.items[this.edit.index] = this.edit
            }
        },
        selectEdit(index){
            this.edit = structuredClone(this.items[index])
            this.edit.index = index
            this.groups.forEach(element => {
                element.model = this.edit.group.includes(element._id)
            });
        },
        async get(){
            const response = await adminService.userList(this.table)
            if(response.status == 1){
                this.items = response.items
                this.pageCount = response.pageCount
                this.total = response.total
            }
        },
        async saveUser(){
            this.edit.oldEmail = this.items[this.edit.index].email
            var activeGroups = this.groups.filter((el) => { return el.model })
            var groups = []
            activeGroups.forEach(element => {
                groups.push(element._id)
            });
            this.edit.group = groups
            const response = await adminService.userSave(this.edit)
            if(response.status == 1){
                this.items[this.edit.index] = this.edit
            }
        },
    },
    watch: {
        'table.perPage'(){
            this.get()
        },
        'table.search'(){
            clearTimeout(this.interval.search)
            this.interval.search = setTimeout(() => {
                if(this.table.search.length > 2){
                    this.get()
                }
            }, 500);
        }
    }
}
</script>