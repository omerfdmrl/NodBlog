import Api from "./api.service";
export default {
    async userGetEdit(credentials = []){
        return await Api("panel/user-get-edit",credentials)
    },
    async userSaveEdit(credentials = []){
        return await Api("panel/user-save-edit",credentials)
    },
    async userChangeImage(credentials = []){
        return await Api("panel/user-change-image",credentials)
    },
    async blogList(credentials = []){
        return await Api("panel/blog-list",credentials)
    },
    async blogAdd(credentials= []){
        return await Api("panel/blog-add",credentials)
    },
    async blogGetEdit(credentials= []){
        return await Api("panel/blog-get-edit",credentials)
    },
    async blogSaveEdit(credentials= []){
        return await Api("panel/blog-save-edit",credentials)
    },
    async blogDelete(credentials= []){
        return await Api("panel/blog-delete",credentials)
    },
}