<template>
<div class="row">
    <div class="col-lg-8">
        <!-- Change password card-->
        <div class="card mb-4">
            <div class="card-header">Change Password</div>
            <div class="card-body">
                <form @submit.prevent="save">
                    <!-- Form Group (current password)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="currentPassword">{{ $t('current_password') }}</label>
                        <input v-model="userClone.pass.current" class="form-control" id="currentPassword" type="password" :placeholder="$t('enter_current_password')">
                    </div>
                    <!-- Form Group (new password)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="newPassword">{{ $t('new_password') }}</label>
                        <input v-model="userClone.pass.new" class="form-control" id="newPassword" type="password" :placeholder="$t('enter_new_password')">
                    </div>
                    <!-- Form Group (confirm password)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="confirmPassword">{{ $t('confirm_password') }}</label>
                        <input v-model="userClone.pass.confirm" class="form-control" id="confirmPassword" type="password" :placeholder="$t('enter_confirm_password')">
                    </div>
                    <button class="btn btn-primary" type="submit">{{ $t('save_changes') }}</button>
                </form>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <!-- Two factor authentication card-->
        <div class="card mb-4">
            <div class="card-header">{{ $t('two_factor_authentication') }}</div>
            <div class="card-body">
                <p>{{ $t('add_another_level_of_security_to_your_account_by_enabling_two-factor_authentication._we_will_send_you__text_message_to_verify_your_login_attempts_on_unrecognized_devices_and_browsers.') }}</p>
                <form>
                    <div class="form-check">
                        <input v-model="userClone.fac.type" class="form-check-input" id="twoFactorOn" type="radio" value="off" name="twoFactor">
                        <label class="form-check-label" for="twoFactorOn">{{ $t('off') }}</label>
                    </div>
                    <div class="form-check">
                        <input v-model="userClone.fac.type" class="form-check-input" id="twoFactorOff" type="radio" value="email" name="twoFactor">
                        <label class="form-check-label" for="twoFactorOff">{{ $t('email') }}</label>
                    </div>
                </form>
            </div>
        </div>
        <!-- Delete account card-->
        <div class="card mb-4">
            <div class="card-header">{{ $t('delete_account') }}</div>
            <div class="card-body">
                <p>{{ $t('deleting_your_account_is_a_permanent_action_and_cannot_be_undone._if_you_are_sure_you_want_to_delete_your_account,_select_the_button_below.') }}</p>
                <button disabled class="btn btn-danger-soft text-danger" type="button">{{ $t('ı_understand,_delete_my_account') }}</button>
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
            userClone : {
                fac: {}
            }
        }
    },
    created(){
        this.userClone = structuredClone(this.user)
        this.userClone.pass = {}
    },
    methods: {
        save(){
            panelService.userSaveEdit(this.userClone)
        }
    }
}
</script>