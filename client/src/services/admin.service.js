import Api from "./api.service";
export default {
    async getSettings(credentials = []){
        return await Api("admin/get-settings",credentials)
    },
    async changeImage(credentials = []){
        return await Api("admin/change-image",credentials)
    },
    async saveSettings(credentials = []){
        return await Api("admin/save-settings",credentials)
    },
    async menuList(credentials = []){
        return await Api("admin/menu-list",credentials)
    },
    async menuAdd(credentials = []){
        return await Api("admin/menu-add",credentials)
    },
    async menuDelete(credentials = []){
        return await Api("admin/menu-delete",credentials)
    },
    async menuSave(credentials = []){
        return await Api("admin/menu-save",credentials)
    },
    async userList(credentials = []){
        return await Api("admin/user-list",credentials)
    },
    async userSave(credentials = []){
        return await Api("admin/user-save",credentials)
    },
    async userLoginAs(credentials = []){
        return await Api("admin/user-login-as",credentials)
    },
    async userChangeImage(credentials = []){
        return await Api("admin/user-change-image",credentials)
    },
    async groupList(credentials = []){
        return await Api("admin/group-list",credentials)
    },
    async groupAdd(credentials = []){
        return await Api("admin/group-add",credentials)
    },
    async groupSave(credentials = []){
        return await Api("admin/group-save",credentials)
    },
    async groupDelete(credentials = []){
        return await Api("admin/group-delete",credentials)
    },
    async roleList(credentials = []){
        return await Api("admin/role-list",credentials)
    },
    async roleAdd(credentials = []){
        return await Api("admin/role-add",credentials)
    },
    async roleSave(credentials = []){
        return await Api("admin/role-save",credentials)
    },
    async permissionList(credentials = []){
        return await Api("admin/permission-list",credentials)
    },
    async reportList(credentials = []){
        return await Api("admin/report-list",credentials)
    },
    async reportDelete(credentials = []){
        return await Api("admin/report-delete",credentials)
    },
    async reportActionDelete(credentials = []){
        return await Api("admin/report-action-delete",credentials)
    },
    async reportActionBan(credentials = []){
        return await Api("admin/report-action-ban",credentials)
    },
}