<template>
<div class="row">
    <div class="col-lg-8">
        <!-- Change password card-->
        <div class="card mb-4">
            <div class="card-header">{{ $t('general_settings') }}</div>
            <div class="card-body">
                <form @submit.prevent="save">
                    <!-- Form Group (current password)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="siteName">{{ $t('site_name') }}</label>
                        <input v-model="settingsClone.name" class="form-control" id="siteName" type="text">
                    </div>
                    <!-- Form Group (current password)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="siteUrl">{{ $t('site_url') }}</label>
                        <input v-model="settingsClone.url.site" class="form-control" id="siteUrl" type="text">
                    </div>
                    <!-- Form Group (new password)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="backendUrl">{{ $t('backend_url') }}</label>
                        <input v-model="settingsClone.url.backend" class="form-control" id="backendUrl" type="text">
                    </div>
                    <button class="btn btn-primary" type="submit">{{ $t('save_changes') }}</button>
                </form>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <div class="card mb-4 mb-xl-0">
            <div class="card-header">{{ $t('logo') }}</div>
            <div class="card-body">
                <form>
                    <div class="form-check">
                        <input class="form-check-input" id="logoTypeText" type="radio" value="text" v-model="settingsClone.logo.type" name="logoType">
                        <label class="form-check-label" for="logoTypeText">{{ $t('text') }}</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" id="logoTypeImage" type="radio" value="image" v-model="settingsClone.logo.type" name="logoType">
                        <label class="form-check-label" for="logoTypeImage">{{ $t('image') }}</label>
                    </div>
                    <div v-if="settingsClone.logo.type == 'text'" class="mt-3">
                        <label class="small mb-1" for="logoValue">{{ $t('logo_text') }}</label>
                        <input class="form-control" id="logoValue" type="text" v-model="settingsClone.logo.value">
                    </div>
                </form>
                <div v-if="settingsClone.logo.type == 'image'" class="text-center">
                    <!-- Profile picture image-->
                    <img class="img-account-profile rounded-circle mb-2" :src="settingsClone.logo.value">
                    <!-- Profile picture help block-->
                    <div class="small font-italic text-muted mb-4"></div>
                    <!-- Profile picture upload button-->
                    <label for="upload-favicon" class="btn btn-primary" type="button">{{ $t('upload_new_image') }}</label>
                    <input @change="onLogoChange($event)" type="file" accept="image/*" class="d-none" id="upload-favicon" />
                </div>
            </div>
        </div>
        <div class="card mt-4 mb-xl-0">
            <div class="card-header">{{ $t('favicon') }}</div>
            <div class="card-body text-center">
                <!-- Profile picture image-->
                <img class="img-account-profile rounded-circle mb-2" :src="settingsClone.favicon">
                <!-- Profile picture help block-->
                <div class="small font-italic text-muted mb-4"></div>
                <!-- Profile picture upload button-->
                <label for="upload-favicon" class="btn btn-primary" type="button">{{ $t('upload_new_image') }}</label>
                <input @change="onFaviconChange($event)" type="file" accept="image/*" class="d-none" id="upload-favicon" />
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
                logo: {},
                url: {}
            }
        }
    },
    updated(){
        this.settingsClone = structuredClone(this.settings)
    },
    methods: {
        save(){
            adminService.saveSettings(this.settingsClone)
            if(this.settingsClone.logo.type == 'text'){
                const oldInformations = this.$store.state.informations
                oldInformations.logo.type = this.settingsClone.logo.type
                oldInformations.logo.value = this.settingsClone.logo.value
                this.$store.commit("informations", oldInformations);
            }
        },
        async onFaviconChange(event){
            const newImage = event.target.files[0]
            this.settingsClone.favicon = URL.createObjectURL(newImage)
            this.$emit('update',this.settingsClone)
            const form = new FormData()
            form.append('image',newImage)
            form.append('type','favicon')
            adminService.changeImage(form)
            const oldInformations = this.$store.state.informations
            oldInformations.favicon = this.settingsClone.favicon
            this.$store.commit("informations", oldInformations);
        },
        async onLogoChange(event){
            const newImage = event.target.files[0]
            this.settingsClone.logo.value = URL.createObjectURL(newImage)
            this.$emit('update',this.settingsClone)
            const form = new FormData()
            form.append('image',newImage)
            form.append('type','logo')
            adminService.changeImage(form)
            const oldInformations = this.$store.state.informations
            oldInformations.logo.value = this.settingsClone.logo.value
            this.$store.commit("informations", oldInformations);
        },
    }
}
</script>