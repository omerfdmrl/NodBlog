<template>
<div class="row">
    <div class="col-lg-6">
        <!-- Change password card-->
        <div class="card mb-4">
            <div class="card-header">{{ $t('meta_settings') }}</div>
            <div class="card-body">
                <form @submit.prevent="save">
                    <!-- Form Group (current password)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="siteTitle">{{ $t('site_title') }}</label>
                        <input v-model="settingsClone.head.title" class="form-control" id="siteTitle" type="text">
                    </div>
                    <!-- Form Group (current password)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="metaDescription">{{ $t('meta_description') }}</label>
                        <input v-model="settingsClone.head.meta.description" class="form-control" id="metaDescription" type="text">
                    </div>
                    <!-- Form Group (current password)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="metaSubject">{{ $t('meta_subject') }}</label>
                        <input v-model="settingsClone.head.meta.subject" class="form-control" id="metaSubject" type="text">
                    </div>
                    <!-- Form Group (current password)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="metaKeywords">{{ $t('meta_keywords') }}</label>
                        <input v-model="settingsClone.head.meta.keywords" class="form-control" id="metaKeywords" type="text">
                    </div>
                    <button class="btn btn-primary" type="submit">{{ $t('save_changes') }}</button>
                </form>
            </div>
        </div>
    </div>
    <div class="col-lg-6">
        <!-- Change password card-->
        <div class="card mb-4">
            <div class="card-header">{{ $t('og_settings') }}</div>
            <div class="card-body">
                <form @submit.prevent="save">
                    <!-- Form Group (current password)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="ogTitle">{{ $t('og_title') }}</label>
                        <input v-model="settingsClone.head.og.title" class="form-control" id="ogTitle" type="text">
                    </div>
                    <!-- Form Group (current password)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="ogDescription">{{ $t('og_description') }}</label>
                        <input v-model="settingsClone.head.og.description" class="form-control" id="ogDescription" type="text">
                    </div>
                    <!-- Form Group (current password)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="ogSiteName">{{ $t('og_site_name') }}</label>
                        <input v-model="settingsClone.head.og.site_name" class="form-control" id="ogSiteName" type="text">
                    </div>
                    <!-- Form Group (current password)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="ogType">{{ $t('og_type') }}</label>
                        <input v-model="settingsClone.head.og.type" class="form-control" id="ogType" type="text">
                    </div>
                    <!-- Form Group (current password)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="ogImage">{{ $t('og_image') }}</label>
                        <input v-model="settingsClone.head.og.image" class="form-control" id="ogImage" type="text">
                    </div>
                    <button class="btn btn-primary" type="submit">{{ $t('save_changes') }}</button>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import adminService from '@/services/admin.service'
export default {
    props: ['settings'],
    data(){
        return {
            settingsClone : {
                head: {
                    meta: {},
                    og: {}
                }
            }
        }
    },
    created(){
        this.settingsClone = structuredClone(this.settings)
    },
    methods: {
        save(){
            adminService.saveSettings(this.settingsClone)
            if(this.settingsClone.logo.type == 'text'){
                const oldInformations = this.$store.state.informations
                oldInformations.logo.type = this.settingsClone.logo.type
                oldInformations.logo.value = this.settingsClone.logo.value
                oldInformations.head.title = this.settingsClone.head.title
                this.$store.commit("informations", oldInformations);
            }
        },
        async onFaviconChange(event){
            const newImage = event.target.files[0]
            this.settingsClone.email.favicon = URL.createObjectURL(newImage)
            this.$emit('update',this.settingsClone)
            const form = new FormData()
            form.append('image',newImage)
            form.append('type','email_favicon')
            adminService.changeImage(form)
        },
        async onLogoChange(event){
            const newImage = event.target.files[0]
            this.settingsClone.email.logo = URL.createObjectURL(newImage)
            this.$emit('update',this.settingsClone)
            const form = new FormData()
            form.append('image',newImage)
            form.append('type','email_logo')
            adminService.changeImage(form)
        },
    }
}
</script>