<template>
<div class="row">
    <div class="col-lg-8">
        <!-- Email notifications preferences card-->
        <div class="card card-header-actions mb-4">
            <div class="card-header">
                {{ $t('email_notifications') }}
                <div class="form-check form-switch">
                    <input v-model="userClone.notification.email.status" value="true" class="form-check-input" id="flexSwitchCheckChecked" type="checkbox">
                    <label class="form-check-label" for="flexSwitchCheckChecked"></label>
                </div>
            </div>
            <div class="card-body">
                <form>
                    <!-- Form Group (default email)-->
                    <div class="mb-3">
                        <label class="small mb-1" for="inputNotificationEmail">{{ $t('default_notification_email') }}</label>
                        <input class="form-control" id="inputNotificationEmail" type="email" :value="userClone.email" disabled>
                    </div>
                    <!-- Form Group (email updates checkboxes)-->
                    <div class="mb-0">
                        <label class="small mb-2">{{ $t('choose_which_types_of_email_updates_you_receive') }}</label>
                        <div class="form-check mb-2">
                            <input class="form-check-input" v-model="userClone.notification.email.failed_login_attempt" id="checkAccountChanges" type="checkbox">
                            <label class="form-check-label" for="checkAccountChanges">{{ $t('failed_login_attempt') }}</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="col-lg-4">
        <!-- Notifications preferences card-->
        <div class="card">
            <div class="card-header">{{ $t('notification_preferences') }}</div>
            <div class="card-body">
                <form @submit.prevent="save">
                    <p>{{ $t('your_notifications_will_come_as_you_specify._But_do_not_forget_that_we_can_also_send_notifications_in_urgent_or_necessary_situations.') }}</p>
                    <!-- Submit button-->
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
    created(){
        this.userClone = structuredClone(this.user)
    },
    methods: {
        save(){
            panelService.userSaveEdit(this.userClone)
        }
    }
}
</script>