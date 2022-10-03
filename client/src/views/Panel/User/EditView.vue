<template>
    <header class="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
        <div class="container-xl px-4">
            <div class="page-header-content">
                <div class="row align-items-center justify-content-between pt-3">
                    <div class="col-auto mb-3">
                        <h1 class="page-header-title">
                            <div class="page-header-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
                            {{ $t('account_settings') + ' - ' + $t('profile') }}
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
            <component :key="currentTab" @update="update" :user="user" :is="tab"></component>
        </keep-alive>
    </div>
</template>

<script>
import profile from './EditTabs/ProfileTab.vue'
import billing from './EditTabs/BillingTab.vue'
import security from './EditTabs/SecurityTab.vue'
import notifications from './EditTabs/NotificationsTab.vue'
import panelService from '@/services/panel.service'
export default {
    data(){
        return {
            user: {},
            currentTab: 'profile',
            tabs: [
                {name: this.$t('profile'), tab: 'profile'},
                {name: this.$t('billing'), tab: 'billing'},
                {name: this.$t('security'), tab: 'security'},
                {name: this.$t('notifications'), tab: 'notifications'}
            ]
        }
    },
    async created(){
        const response = await panelService.userGetEdit()
        if(response.status == 1){
            this.user = response.user
        }
    },
    computed: {
        tab(){
            return this.currentTab
        }
    },
    components: {
        profile,
        billing,
        security,
        notifications
    },
    methods: {
        update(user){
            this.user = user
        }
    }
}
</script>