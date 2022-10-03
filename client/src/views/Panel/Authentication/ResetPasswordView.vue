<template>
<div class="container-xl px-4">
    <div class="row justify-content-center">
        <div class="col-lg-5">
            <!-- Basic login form-->
            <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-header justify-content-center"><h3 class="fw-light my-4">{{ $t('reset_password') }}</h3></div>
                <div class="card-body">
                    <!-- Login form-->
                    <form @submit.prevent="submitForgotPassword()">
                        <!-- Form Group (password)-->
                        <div class="mb-3">
                            <label class="small mb-1" for="inputPassword">{{ $t('password') }}</label>
                            <input required v-model="credentials.password" class="form-control" id="inputPassword" type="password" :placeholder="$t('enter_password')">
                        </div>
                        <!-- Form Group (confirm password)-->
                        <div class="mb-3">
                            <label class="small mb-1" for="inputConfirmPassword">{{ $t('confirm_password') }}</label>
                            <input required v-model="credentials.repassword" class="form-control" id="inputConfirmPassword" type="password" :placeholder="$t('confirm_password')">
                        </div>
                        <!-- Form Group (login box)-->
                        <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                            <button class="btn btn-primary" type="submit">{{ $t('reset_password') }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import authenticationService from '@/services/authentication.service'
export default {
    data(){
        return {
            credentials: {}
        }
    },
    methods: {
        async submitForgotPassword(){
            this.credentials.email = this.$route.params.email
            this.credentials.code = this.$route.params.code
            await authenticationService.submitForgotPassword(this.credentials)
        }
    }
}
</script>