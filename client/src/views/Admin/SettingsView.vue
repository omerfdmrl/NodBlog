<template>
    <header class="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
        <div class="container-xl px-4">
            <div class="page-header-content">
                <div class="row align-items-center justify-content-between pt-3">
                    <div class="col-auto mb-3">
                        <h1 class="page-header-title">
                            <div class="page-header-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3.625 17.175v-.925H20.4v.925Zm0-4.725v-.925H20.4v.925Zm0-4.7v-.925H20.4v.925Z"/></svg></div>
                            {{ $t('site_settings') }}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class="container-xl px-4 mt-4">
        <!-- Account page navigation-->
        <nav class="nav nav-borders">
            <a v-for="(tab,index) in tabs" :key="index" @click="currentTab = tab.tab" :class="[currentTab == tab.tab ? 'active' : null,'nav-link ms-0']" href="javascript:;">{{ tab.name }}</a>
        </nav>
        <hr class="mt-0 mb-4">
        <keep-alive>
            <component :key="currentTab" @update="update" :settings="settings" :is="tab"></component>
        </keep-alive>
    </div>
</template>

<script>
import general from './EditTabs/GeneralTab.vue'
import mail from './EditTabs/MailTab.vue'
import seo from './EditTabs/SeoTab.vue'
import site from './EditTabs/SiteTab.vue'
import api from './EditTabs/ApiTab.vue'
import adminService from '@/services/admin.service'
export default {
    data(){
        return {
            settings: {},
            currentTab: 'general',
            tabs: [
                {name: this.$t('general'), tab: 'general'},
                {name: this.$t('mail'), tab: 'mail'},
                {name: this.$t('seo'), tab: 'seo'},
                {name: this.$t('site'), tab: 'site'},
                {name: this.$t('api'), tab: 'api'}
            ]
        }
    },
    async created(){
        const response = await adminService.getSettings()
        if(response.status == 1){
            this.settings = response.settings
        }
    },
    computed: {
        tab(){
            return this.currentTab
        }
    },
    components: {
        general,mail,seo,site,api
    },
    methods: {
        update(settings){
            this.settings = settings
        }
    }
}
</script>