import Api from "./api.service";
export default {
    async login(credentials = []){
        return await Api("authentication/login",credentials)
    },
    async register(credentials = []){
        return await Api("authentication/register",credentials)
    },
    async logout(credentials = []){
        return await Api("authentication/logout",credentials)
    },
    async sendForgotPassword(credentials = []){
        return await Api("authentication/send-forgot-password",credentials)
    },
    async submitForgotPassword(credentials = []){
        return await Api("authentication/submit-forgot-password",credentials)
    },
}