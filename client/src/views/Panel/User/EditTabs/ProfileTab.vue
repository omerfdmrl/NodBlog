<template>
<div class="row">
    <div class="col-xl-4">
        <!-- Profile picture card-->
        <div class="card mb-4 mb-xl-0">
            <div class="card-header">{{ $t('profile_picture') }}</div>
            <div class="card-body text-center">
                <!-- Profile picture image-->
                <img class="img-account-profile rounded-circle mb-2" :src="userClone.image">
                <!-- Profile picture help block-->
                <div class="small font-italic text-muted mb-4"></div>
                <!-- Profile picture upload button-->
                <input @change="onImageChange($event)" type="file" class="d-none" id="upload-profile-image" />
                <label class="btn btn-primary" for="upload-profile-image" type="button">{{ $t('upload_new_image') }}</label>
            </div>
        </div>
    </div>
    <div class="col-xl-8">
        <!-- Account details card-->
        <div class="card mb-4">
            <div class="card-header">{{ $t('account_details') }}</div>
            <div class="card-body">
                <form @submit.prevent="save()">
                    <!-- Form Row-->
                    <div v-if="userClone.name" class="row gx-3 mb-3">
                        <!-- Form Group (first name)-->
                        <div class="col-md-6">
                            <label class="small mb-1" for="inputFirstName">{{ $t('first_name') }}</label>
                            <input v-model="userClone.name.first" class="form-control" id="inputFirstName" type="text" :placeholder="$t('enter_first_name')">
                        </div>
                        <!-- Form Group (last name)-->
                        <div class="col-md-6">
                            <label class="small mb-1" for="inputLastName">{{ $t('last_name') }}</label>
                            <input v-model="userClone.name.last" class="form-control" id="inputLastName" type="text" :placeholder="$t('enter_last_name')">
                        </div>
                    </div>
                    <!-- Form Group (email address)-->
                    <div class="row gx-3 mb-3">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="small mb-1" for="inputEmailAddress">{{ $t('email') }}</label>
                                <input v-model="userClone.email" class="form-control" id="inputEmailAddress" type="email" :placeholder="$t('enter_email_address')">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="small mb-1" for="inputUsername">{{ $t('username') }}</label>
                                <input disabled v-model="userClone.username" class="form-control" id="inputUsername" type="text" :placeholder="$t('enter_username')">
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="inputAboutYou">{{ $t('about_you') }}</label>
                        <textarea v-model="userClone.about" class="form-control" id="inputAboutYou" :placeholder="$t('enter_about_you')"></textarea>
                    </div>
                    <!-- Form Row-->
                    <div v-if="userClone.social" class="row gx-3 mb-3">
                        <!-- Form Group (first name)-->
                        <div class="col-md-6">
                            <label class="small mb-1" for="inputSocialInstagram">{{ $t('instagram') }}</label>
                            <input v-model="userClone.social.instagram" class="form-control" id="inputSocialInstagram" type="text" :placeholder="$t('enter_instagram_username')">
                        </div>
                        <!-- Form Group (last name)-->
                        <div class="col-md-6">
                            <label class="small mb-1" for="inputSocialTwitter">{{ $t('twitter') }}</label>
                            <input v-model="userClone.social.twitter" class="form-control" id="inputSocialTwitter" type="text" :placeholder="$t('enter_twitter_username')">
                        </div>
                    </div>
                    <!-- Form Row-->
                    <div v-if="userClone.social" class="row gx-3 mb-3">
                        <!-- Form Group (first name)-->
                        <div class="col-md-6">
                            <label class="small mb-1" for="inputSocialFacebook">{{ $t('facebook') }}</label>
                            <input v-model="userClone.social.facebook" class="form-control" id="inputSocialFacebook" type="text" :placeholder="$t('enter_facebook_username')">
                        </div>
                        <!-- Form Group (last name)-->
                        <div class="col-md-6">
                            <label class="small mb-1" for="inputSocialLinkedin">{{ $t('linkedin') }}</label>
                            <input v-model="userClone.social.linkedin" class="form-control" id="inputSocialLinkedin" type="text" :placeholder="$t('enter_linkedin_username')">
                        </div>
                    </div>
                    <!-- Save changes button-->
                    <button class="btn btn-primary" type="submit">{{ $t('save_changes') }}</button>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import panelService from '@/services/panel.service'
export default {
    props: ['user'],
    data(){
        return {
            userClone : {}
        }
    },
    updated(){
        this.userClone = structuredClone(this.user)
    },
    methods: {
        async onImageChange(event){
            const newImage = event.target.files[0]
            this.userClone.image = URL.createObjectURL(newImage)
            this.$emit('update',this.userClone)
            const form = new FormData()
            form.append('image',newImage)
            const response = await panelService.userChangeImage(form)
            if(response.status == 1){
                this.$store.commit("login", {
                    name: this.userClone.name,
                    image: this.userClone.image,
                    email: this.userClone.email,
                    can: this.$store.state.user.can
                });
            }
        },
        async save(){
            const response = await panelService.userSaveEdit(this.userClone)
            if(response.status == 1){
                this.$store.commit("login", {
                    name: this.userClone.name,
                    image: this.userClone.image,
                    email: this.userClone.email,
                    can: this.$store.state.user.can
                });
            }
        }
    }
}
</script>