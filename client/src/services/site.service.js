import Api from "./api.service";
export default {
    async home(credentials = []){
        return await Api("site/home",credentials)
    },
    async homeBlog(credentials = []){
        return await Api("site/home-blog",credentials)
    },
    async homePopular(credentials = []){
        return await Api("site/home-popular",credentials)
    },
    async blogIndex(credentials = []){
        return await Api("site/blog-index",credentials)
    },
    async blogLike(credentials = []){
        return await Api("site/blog-like",credentials)
    },
    async blogReport(credentials = []){
        return await Api("site/blog-report",credentials)
    },
    async blogDislike(credentials = []){
        return await Api("site/blog-dislike",credentials)
    },
    async commentAdd(credentials = []){
        return await Api("site/comment-add",credentials)
    },
    async commentLike(credentials = []){
        return await Api("site/comment-like",credentials)
    },
    async blogComment(credentials = []){
        return await Api("site/comment-report",credentials)
    },
    async profile(credentials = []){
        return await Api("site/profile",credentials)
    },
    async profileBlog(credentials = []){
        return await Api("site/profile-blog",credentials)
    },
    async profileFollow(credentials = []){
        return await Api("site/profile-follow",credentials)
    },
    async tagIndex(credentials = []){
        return await Api("site/tag-index",credentials)
    },
    async tagBlog(credentials = []){
        return await Api("site/tag-blog",credentials)
    },
    async search(credentials = []){
        return await Api("site/search",credentials)
    },
}