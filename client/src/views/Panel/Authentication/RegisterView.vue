<template>
<div class="container-xl px-4">
    <div class="row justify-content-center">
        <div class="col-lg-5">
            <!-- Basic login form-->
            <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-header justify-content-center"><h3 class="fw-light my-4">{{ $t('register') }}</h3></div>
                <div class="card-body">
                    <!-- Login form-->
                    <form @submit.prevent="register()">
                        <!-- Form Group (first name)-->
                        <div class="mb-3">
                            <label class="small mb-1" for="inputFirstName">{{ $t('first_name') }}</label>
                            <input required v-model="credentials.firstname" class="form-control" id="inputFirstName" type="text" :placeholder="$t('enter_first_name')">
                        </div>
                        <!-- Form Group (last name)-->
                        <div class="mb-3">
                            <label class="small mb-1" for="inputLastName">{{ $t('last_name') }}</label>
                            <input required v-model="credentials.lastname" class="form-control" id="inputLastName" type="text" :placeholder="$t('enter_last_name')">
                        </div>
                        <!-- Form Group (email address)-->
                        <div class="mb-3">
                            <label class="small mb-1" for="inputEmailAddress">{{ $t('email') }}</label>
                            <input required v-model="credentials.email" class="form-control" id="inputEmailAddress" type="email" :placeholder="$t('enter_email_address')">
                        </div>
                        <!-- Form Group (username)-->
                        <div class="mb-3">
                            <label class="small mb-1" for="inputUsername">{{ $t('username') }}</label>
                            <input required v-model="credentials.username" class="form-control" id="inputUsername" type="text" :placeholder="$t('enter_username')">
                        </div>
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
                            <button class="btn btn-primary" type="submit">{{ $t('register') }}</button>
                        </div>
                    </form>
                </div>
                <div class="card-footer text-center">
                    <div class="small"><router-link :to="{name: 'panel-login'}">{{ $t('have_an_account?_go_to_login') }}</router-link></div>
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
        async register(){
            await authenticationService.register(this.credentials)
        }
    }
}
</script>