<template>
<div class="container-xl px-4">
    <div class="row justify-content-center">
        <div class="col-lg-5">
            <!-- Basic login form-->
            <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-header justify-content-center"><h3 class="fw-light my-4">{{ $t('password_recovery') }}</h3></div>
                <div class="card-body">
                    <div class="small mb-3 text-muted">{{ $t('enter_your_email_address_and_we_will_send_you_a_link_to_reset_your_password.') }}</div>
                    <!-- Login form-->
                    <form @submit.prevent="sendForgotPassword()">
                        <!-- Form Group (email address)-->
                        <div class="mb-3">
                            <label class="small mb-1" for="inputEmailAddress">{{ $t('email') }}</label>
                            <input required v-model="credentials.email" class="form-control" id="inputEmailAddress" type="email" :placeholder="$t('enter_email_address')">
                        </div>
                        <!-- Form Group (login box)-->
                        <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                            <router-link class="small" :to="{name: 'panel-login'}">{{ $t('return_to_login') }}</router-link>
                            <button class="btn btn-primary" type="submit">{{ $t('reset_password') }}</button>
                        </div>
                    </form>
                </div>
                <div class="card-footer text-center">
                    <div class="small"><router-link :to="{name: 'panel-register'}">{{ $t('need_an_account?_sign_up!') }}</router-link></div>
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
        async sendForgotPassword(){
            await authenticationService.sendForgotPassword(this.credentials)
        }
    }
}
</script>