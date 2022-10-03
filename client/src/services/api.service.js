import { useToast } from "vue-toastification";
const toast = useToast();
window.toast = toast
export default async (url,credentials) => {
    var headers = {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Credentials' : true
    }
    if(!(credentials instanceof FormData)){
        headers['Content-Type'] = 'application/json'
    }
    const rawResponse = await fetch(process.env.VUE_APP_SERVER_URL + url, {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        xhrFields: { withCredentials: true},
        headers: headers,
        body: credentials instanceof FormData ? credentials : JSON.stringify(credentials)
    });
    if([404].includes(rawResponse.status)){
        window.$router.push({name : 'site-error' , params : {code: rawResponse.status}})
    }
    const content = await rawResponse.json();
    if(content.redirect){
        if(content.refresh){
            if(content.resolve){
                window.location.href= window.$router.resolve({name: content.redirect , params : content.params ? content.params : {}}).href
            }else {
                window.location.href= content.redirect
            }
        }else {
            window.$router.push({name : content.redirect , params : content.params ? content.params : {}})
        }
    }
    if(content.status == 0 && content.message){
        toast.error(window.t(content.message))
    }
    if(content.status == 1 && content.message){
        toast.success(window.t(content.message))
    }
    if(content.modal){
        switch (content.modal) {
            case 'login':
                document.querySelector('[data-bs-target="#kt_modal_login"]').click()
                break;
            case 'register':
                document.querySelector('[data-bs-target="#kt_modal_register"]').click()
                break;
            case 'verify':
                document.querySelector('[data-bs-target="#kt_modal_verify"]').click()
                break;
        }
    }
    return content;
}