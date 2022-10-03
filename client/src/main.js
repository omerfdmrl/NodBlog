import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import functions from './functions'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import i18n from './i18n'
import Select2 from 'vue3-select2-component';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import SwiperClass, {Navigation, Pagination, Autoplay} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './registerServiceWorker'
SwiperClass.use([Navigation, Pagination, Autoplay])
createApp(App).component('QuillEditor', QuillEditor).component('Select2', Select2).use(VueAwesomeSwiper).use(store).use(router).use(Toast, { position: POSITION.BOTTOM_LEFT }).use(functions).use(i18n).mount('#app')
