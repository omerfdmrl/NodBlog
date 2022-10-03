<template>
<header class="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
    <div class="container-xl px-4">
        <div class="page-header-content">
            <div class="row align-items-center justify-content-between pt-3">
                <div class="col-auto mb-3">
                    <h1 class="page-header-title">
                        <div class="page-header-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10.225 20.85 9.85 18q-.3-.075-.875-.387-.575-.313-1.15-.738l-2.625 1.1-1.775-3.125L5.7 13.125q-.05-.25-.075-.525-.025-.275-.025-.575 0-.25.025-.538.025-.287.075-.662l-2.275-1.7L5.2 6.05l2.625 1.1q.425-.35.95-.662Q9.3 6.175 9.85 6l.375-2.85h3.55L14.15 6q.575.2 1.025.475.45.275.925.675l2.7-1.1 1.775 3.075-2.375 1.8q.05.3.075.55.025.25.025.525 0 .25-.025.5t-.1.625l2.35 1.725-1.775 3.125-2.65-1.15q-.45.4-.912.675-.463.275-1.038.475l-.375 2.875Zm1.725-6.425q1 0 1.713-.7.712-.7.712-1.725 0-1.025-.712-1.725-.713-.7-1.713-.7-1.025 0-1.725.7-.7.7-.7 1.725 0 1.025.7 1.725.7.7 1.725.7Zm0-.925q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062q.437-.438 1.062-.438.6 0 1.05.438.45.437.45 1.062T13 13.062q-.45.438-1.05.438Zm.05-1.525Zm-1 7.95h1.95l.375-2.725q.75-.2 1.325-.537.575-.338 1.2-.938l2.5 1.075.975-1.675-2.2-1.65q.125-.425.163-.775.037-.35.037-.7 0-.375-.037-.7-.038-.325-.163-.725l2.25-1.7-.975-1.7-2.575 1.1q-.425-.475-1.162-.912-.738-.438-1.363-.588L13 4.05h-2l-.3 2.725q-.775.175-1.375.5T8.1 8.25L5.6 7.175l-.975 1.7 2.15 1.6q-.125.35-.175.737-.05.388-.05.788 0 .375.05.738.05.362.15.762l-2.125 1.625L5.6 16.8l2.475-1.05q.6.6 1.213.95.612.35 1.387.525Z"/></svg></div>
                        {{ $t('menu') }}
                    </h1>
                </div>
            </div>
        </div>
    </div>
</header>
<div class="container-xl px-4 mt-4">
    <div class="card mb-4">
        <div class="card-header">{{ $t('menus') }}</div>
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
                        <div class="col-3">
                            <a href="#!" data-bs-toggle="modal" data-bs-target="#addModal" class="btn btn-primary btn-sm h-100">{{ $t('add_new_menu_item') }}</a>
                        </div>
                        <div class="col-3 me-2">
                            <select v-model="table.menu" class="form-control">
                                <option value="header">{{ $t('header_menu') }}</option>
                                <option value="footer">{{ $t('footer_menu') }}</option>
                                <option value="left">{{ $t('left_menu') }}</option>
                            </select>
                        </div>
                        <div class="col-6">
                            <input v-model="table.search" class="dataTable-input" :placeholder="$t('search...')" type="text" />
                        </div>
                    </div>
                </div>
                <div class="dataTable-container">
                    <table id="datatablesSimple" class="dataTable-table">
                        <thead>
                            <tr>
                            <th>
                                <a href="#" class="dataTable-sorter">{{ $t('title') }}</a>
                            </th>
                            <th>
                                <a href="#" class="dataTable-sorter">{{ $t('link') }}</a>
                            </th>
                            <th>
                                <a href="#" class="dataTable-sorter">{{ $t('menu') }}</a>
                            </th>
                            <th>
                                <a href="#" class="dataTable-sorter">{{ $t('actions') }}</a>
                            </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(menu,index) in items" :key="index">
                                <td>{{ menu.title }}</td>
                                <td>{{ menu.href.value }}</td>
                                <td>{{ $t(menu.menu + '_menu') }}</td>
                                <td>
                                    <a @click="selectEdit(index)" href="#!" data-bs-toggle="modal" data-bs-target="#editModal"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5.4 18.9h1l9.925-9.925-1-1.025L5.4 17.875ZM18.3 8.325 15.975 6l.75-.775q.45-.425 1.087-.425.638 0 1.088.425l.6.6q.25.275.25.662 0 .388-.25.663Zm-.625.65L6.8 19.825H4.475v-2.35L15.325 6.65Zm-1.85-.525-.5-.5 1 1.025Z"/></svg></a>
                                    <a @click="menuDelete(index)" href="javascript:;"><svg :fill="menu.step ? 'red' : null" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7.65 19.85q-.625 0-1.075-.45-.45-.45-.45-1.1V6.05H5.15v-.925h3.875v-.75h5.95v.75h3.9v.925H17.9V18.3q0 .65-.45 1.1-.45.45-1.1.45Zm9.325-13.8H7.05V18.3q0 .275.175.45t.425.175h8.7q.225 0 .425-.187.2-.188.2-.438Zm-7.1 10.9h.925V8.025h-.925Zm3.325 0h.925V8.025H13.2ZM7.05 6.05v12.875-.625Z"/></svg></a>
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

<div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addModalLabel">{{ $t('add_new_menu_item') }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="addMenu()">
        <div class="modal-body">
            <div class="mb-3">
                <label class="small mb-1" for="addMenuTitle">{{ $t('menu_title') }}</label>
                <input required v-model="add.title" class="form-control" id="addMenuTitle" type="text">
            </div>
            <div class="mb-3">
                <label class="small mb-1" for="addMenuIcon">{{ $t('menu_icon') }}</label>
                <input v-model="add.icon" class="form-control" id="addMenuIcon" type="text">
            </div>
            <div class="mb-3">
                <label class="small mb-1" for="addMenuType">{{ $t('link_type') }}</label>
                <select id="addMenuType" required v-model="add.href.type" class="form-control">
                    <option value="url">{{ $t('url') }}</option>
                    <option value="router">{{ $t('router') }}</option>
                </select>
            </div>
            <div v-if="add.href.type == 'url'" class="mb-3 row">
                <div class="col-md-6">
                    <label class="small mb-1" for="addMenuLink">{{ $t('link') }}</label>
                    <input required v-model="add.href.value" class="form-control" id="addMenuLink" type="text">
                </div>
                <div class="col-md-6">
                    <label class="small mb-1" for="addMenuLinkTarget">{{ $t('link_target') }}</label>
                    <select id="addMenuLinkTarget" required v-model="add.href.target" class="form-control">
                        <option value="_self">{{ $t('link_self') }}</option>
                        <option value="_blank">{{ $t('link_blank') }}</option>
                    </select>
                </div>
            </div>
            <div v-else-if="add.href.type == 'router'" class="mb-3 row">
                <div class="col-md-6">
                    <label class="small mb-1" for="addMenuRouterName">{{ $t('router_name') }}</label>
                    <input required v-model="add.href.value" class="form-control" id="addMenuRouterName" type="text">
                </div>
                <div class="col-md-6">
                    <label class="small mb-1" for="addMenuRouterParams">{{ $t('router_params') }}</label>
                    <input v-model="add.href.params" class="form-control" id="addMenuRouterParams" type="text">
                </div>
            </div>
            <div class="mb-3">
                <label class="small mb-1" for="addMenuParent">{{ $t('menu_parent') }}</label>
                <select id="addMenuParent" v-model="add.parent" class="form-control">
                    <option :value="item._id" v-for="(item,index) in items" :key="index">{{ item.title }}</option>
                </select>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
            <button type="submit" class="btn btn-primary">{{ $t('save') }}</button>
        </div>
      </form>
    </div>
  </div>
</div>
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editModalLabel">{{ $t('edit_menu_item') }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="saveMenu()">
        <div class="modal-body">
            <div class="mb-3">
                <label class="small mb-1" for="editMenuTitle">{{ $t('menu_title') }}</label>
                <input required v-model="edit.title" class="form-control" id="editMenuTitle" type="text">
            </div>
            <div class="mb-3">
                <label class="small mb-1" for="editMenuIcon">{{ $t('menu_icon') }}</label>
                <input v-model="edit.icon" class="form-control" id="editMenuIcon" type="text">
            </div>
            <div class="mb-3">
                <label class="small mb-1" for="editMenuType">{{ $t('link_type') }}</label>
                <select id="editMenuType" required v-model="edit.href.type" class="form-control">
                    <option value="url">{{ $t('url') }}</option>
                    <option value="router">{{ $t('router') }}</option>
                </select>
            </div>
            <div v-if="edit.href.type == 'url'" class="mb-3 row">
                <div class="col-md-6">
                    <label class="small mb-1" for="editMenuLink">{{ $t('link') }}</label>
                    <input required v-model="edit.href.value" class="form-control" id="editMenuLink" type="text">
                </div>
                <div class="col-md-6">
                    <label class="small mb-1" for="editMenuLinkTarget">{{ $t('link_target') }}</label>
                    <select id="editMenuLinkTarget" required v-model="edit.href.target" class="form-control">
                        <option value="_self">{{ $t('link_self') }}</option>
                        <option value="_blank">{{ $t('link_blank') }}</option>
                    </select>
                </div>
            </div>
            <div v-else-if="edit.href.type == 'router'" class="mb-3 row">
                <div class="col-md-6">
                    <label class="small mb-1" for="editMenuRouterName">{{ $t('router_name') }}</label>
                    <input required v-model="edit.href.value" class="form-control" id="editMenuRouterName" type="text">
                </div>
                <div class="col-md-6">
                    <label class="small mb-1" for="editMenuRouterParams">{{ $t('router_params') }}</label>
                    <input v-model="edit.href.params" class="form-control" id="editMenuRouterParams" type="text">
                </div>
            </div>
            <div class="mb-3">
                <label class="small mb-1" for="editMenuParent">{{ $t('menu_parent') }}</label>
                <select id="editMenuParent" v-model="edit.parent" class="form-control">
                    <option :value="item._id" v-for="(item,index) in items" :key="index" :disabled="item._id == edit._id">{{ item.title }}</option>
                </select>
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
                currentPage: 0,
                menu: 'header'
            },
            items: {},
            interval: {},
            pageCount: 0,
            total: 0,
            deleteStep: {},
            add: {
                href: {
                    target: '_self'
                }
            },
            edit: {
                href: {
                    target: '_self'
                }
            }
        }
    },
    methods: {
        selectEdit(index){
            this.edit = structuredClone(this.items[index])
            this.edit.index = index
        },
        async menuDelete(index){
            const item = this.items[index]
            if(item.step){
                await adminService.menuDelete(item)
                this.items.splice(index,1)
            }else {
                clearInterval(this.interval.delete)
                item.step = 1
                this.interval.delete = setInterval(() => {
                    item.step = 0
                }, 1000);
            }
        },
        async get(){
            const response = await adminService.menuList(this.table)
            if(response.status == 1){
                this.items = response.items
                this.pageCount = response.pageCount
                this.total = response.total
            }
        },
        async saveMenu(){
            const response = await adminService.menuSave(this.edit)
            if(response.status == 1){
                this.items[this.edit.index] = this.edit
            }
        },
        async addMenu(){
            this.add.menu = this.table.menu
            const response = await adminService.menuAdd(this.add)
            if(response.status == 1){
                this.items.unshift(this.add)
                this.add = {
                    href: {
                        target: '_self'
                    }
                }
            }
        }
    },
    created(){
        this.get()
    },
    watch: {
        'table.perPage'(){
            this.get()
        },
        'table.menu'(){
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