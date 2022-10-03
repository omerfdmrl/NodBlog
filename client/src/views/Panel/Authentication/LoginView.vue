<template>
<div class="container-xl px-4">
    <div class="row justify-content-center">
        <div class="col-lg-5">
            <!-- Basic login form-->
            <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-header justify-content-center"><h3 class="fw-light my-4">{{ $t('login') }}</h3></div>
                <div class="card-body">
                    <!-- Login form-->
                    <form @submit.prevent="login()">
                        <!-- Form Group (email address)-->
                        <div class="mb-3">
                            <label class="small mb-1" for="inputEmailAddress">{{ $t('email') }}</label>
                            <input required v-model="credentials.email" class="form-control" id="inputEmailAddress" type="email" :placeholder="$t('enter_email_address')">
                        </div>
                        <!-- Form Group (password)-->
                        <div class="mb-3">
                            <label class="small mb-1" for="inputPassword">{{ $t('password') }}</label>
                            <input required v-model="credentials.password" class="form-control" id="inputPassword" type="password" :placeholder="$t('enter_password')">
                        </div>
                        <!-- Form Group (remember password checkbox)-->
                        <div class="mb-3">
                            <div class="form-check">
                                <input v-model="credentials.remember" class="form-check-input" id="rememberPasswordCheck" type="checkbox" value="true">
                                <label class="form-check-label" for="rememberPasswordCheck">{{ $t('remember_password') }}</label>
                            </div>
                        </div>
                        <!-- Form Group (login box)-->
                        <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                            <router-link class="small" :to="{name: 'panel-forgot-password'}">{{ $t('forgot_password?') }}</router-link>
                            <button class="btn btn-primary" type="submit">{{ $t('login') }}</button>
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
        async login(){
            this.credentials.panel = true
            const response = await authenticationService.login(this.credentials)
            if(response.status == 1){
                this.$store.commit("login", response.user);
            }
        }
    }
}
</script>