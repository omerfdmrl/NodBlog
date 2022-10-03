import Api from "./api.service";
export default {
    async info(credentials = []){
        return await Api("main/info",credentials)
    },
    async tagList(credentials = []){
        return await Api("main/tag-list",credentials)
    }
}