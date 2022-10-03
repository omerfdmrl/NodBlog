<template>
<div class="row">
    <div class="col-lg-6">
        <!-- Change password card-->
        <div class="card mb-4">
            <div class="card-header">{{ $t('blog_settings') }}</div>
            <div class="card-body">
                <form @submit.prevent="save">
                    <div class="mb-3">
                        <label class="small mb-1" for="blogProfilePagination">{{ $t('profile_pagination') }}</label>
                        <input v-model="settingsClone.site.blog.profile_pagination" class="form-control" id="blogProfilePagination" type="number">
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="blogHomePagination">{{ $t('home_pagination') }}</label>
                        <input v-model="settingsClone.site.blog.home_pagination" class="form-control" id="blogHomePagination" type="number">
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="blogTagPagination">{{ $t('tag_pagination') }}</label>
                        <input v-model="settingsClone.site.blog.tag_pagination" class="form-control" id="blogTagPagination" type="number">
                    </div>
                    <button class="btn btn-primary" type="submit">{{ $t('save_changes') }}</button>
                </form>
            </div>
        </div>
    </div>
    <div class="col-lg-6">
        <!-- Change password card-->
        <div class="card mb-4">
            <div class="card-header">{{ $t('social_medias') }}</div>
            <div class="card-body">
                <form @submit.prevent="save">
                    <div class="mb-3">
                        <label class="small mb-1" for="socialInstagram">{{ $t('instagram') }}</label>
                        <input v-model="settingsClone.site.social.instagram" class="form-control" id="socialInstagram" type="text">
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="socialTwitter">{{ $t('twitter') }}</label>
                        <input v-model="settingsClone.site.social.twitter" class="form-control" id="socialTwitter" type="text">
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="socialLinkedin">{{ $t('linkedin') }}</label>
                        <input v-model="settingsClone.site.social.linkedin" class="form-control" id="socialLinkedin" type="text">
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="socialFacebook">{{ $t('facebook') }}</label>
                        <input v-model="settingsClone.site.social.facebook" class="form-control" id="socialFacebook" type="text">
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="socialReddit">{{ $t('reddit') }}</label>
                        <input v-model="settingsClone.site.social.reddit" class="form-control" id="socialReddit" type="text">
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
                site: {
                    blog: {},
                    social: {}
                }
            }
        }
    },
    created(){
        this.settingsClone = structuredClone(this.settings)
        if(!this.settingsClone.site.social){
            this.settingsClone.site.social = {}
        }
    },
    methods: {
        save(){
            adminService.saveSettings(this.settingsClone)
        }
    }
}
</script>