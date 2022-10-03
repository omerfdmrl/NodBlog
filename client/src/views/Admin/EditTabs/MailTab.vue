<template>
<div class="row">
    <div class="col-lg-8">
        <!-- Change password card-->
        <div class="card mb-4">
            <div class="card-header">{{ $t('email_settings') }}</div>
            <div class="card-body">
                <form @submit.prevent="save">
                    <!-- Form Group (current password)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="emailTitle">{{ $t('email_title') }}</label>
                        <input v-model="settingsClone.email.title" class="form-control" id="emailTitle" type="text">
                    </div>
                    <!-- Form Group (current password)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="emailUrl">{{ $t('email_url') }}</label>
                        <input v-model="settingsClone.email.url" class="form-control" id="emailUrl" type="text">
                    </div>
                    <button class="btn btn-primary" type="submit">{{ $t('save_changes') }}</button>
                </form>
            </div>
        </div>
        <div class="card mt-4">
            <div class="card-header">{{ $t('smtp_settings') }}</div>
            <div class="card-body">
                <form @submit.prevent="save">
                    <div class="row">
                        <div class="col-md-6">
                            <!-- Form Group (current password)-->
                            <div class="mb-3">
                                <label class="small mb-1" for="smtpHost">{{ $t('smtp_host') }}</label>
                                <input v-model="settingsClone.smtp.host" class="form-control" id="smtpHost" type="text">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <!-- Form Group (current password)-->
                            <div class="mb-3">
                                <label class="small mb-1" for="smtpPort">{{ $t('smtp_port') }}</label>
                                <input v-model="settingsClone.smtp.port" class="form-control" id="smtpPort" type="text">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <!-- Form Group (current password)-->
                            <div class="mb-3">
                                <label class="small mb-1" for="smtpUser">{{ $t('smtp_user') }}</label>
                                <input v-model="settingsClone.smtp.user" class="form-control" id="smtpUser" type="text">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <!-- Form Group (current password)-->
                            <div class="mb-3">
                                <label class="small mb-1" for="smtpPassword">{{ $t('smtp_password') }}</label>
                                <input v-model="settingsClone.smtp.password" class="form-control" id="smtpPassword" type="text">
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary" type="submit">{{ $t('save_changes') }}</button>
                </form>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <div class="card mb-4 mb-xl-0">
            <div class="card-header">{{ $t('logo') }}</div>
            <div class="card-body text-center">
                <!-- Profile picture image-->
                <img class="img-account-profile rounded-circle mb-2" :src="settingsClone.email.logo">
                <!-- Profile picture help block-->
                <div class="small font-italic text-muted mb-4"></div>
                <!-- Profile picture upload button-->
                <label for="upload-favicon" class="btn btn-primary" type="button">{{ $t('upload_new_image') }}</label>
                <input @change="onLogoChange($event)" type="file" accept="image/*" class="d-none" id="upload-favicon" />
            </div>
        </div>
        <div class="card mt-4 mb-xl-0">
            <div class="card-header">{{ $t('favicon') }}</div>
            <div class="card-body text-center">
                <!-- Profile picture image-->
                <img class="img-account-profile rounded-circle mb-2" :src="settingsClone.email.favicon">
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
                email: {},
                smtp: {}
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