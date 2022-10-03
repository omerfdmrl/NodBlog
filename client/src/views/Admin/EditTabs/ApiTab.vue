<template>
<div class="row">
    <div class="col-lg-6">
        <div class="card mb-4">
            <div class="card-header">{{ $t('redis') }}</div>
            <div class="card-body">
                <form @submit.prevent="save">
                    <div class="mb-3">
                        <label class="small mb-1" for="redisUrl">{{ $t('redis_url') }}</label>
                        <input v-model="settingsClone.api.redis.url" class="form-control" id="redisUrl" type="text">
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" id="redisSitemapDisplay" type="checkbox" value="true" v-model="settingsClone.api.redis.sitemap.display">
                            <label class="form-check-label" for="redisSitemapDisplay">{{ $t('sitemap') }}</label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="redisSitemapTTL">{{ $t('ttl_minute') }}</label>
                        <input :disabled="!settingsClone.api.redis.sitemap.display" v-model="settingsClone.api.redis.sitemap.ttl" class="form-control" id="redisSitemapTTL" type="number">
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" id="redisRssDisplay" type="checkbox" value="true" v-model="settingsClone.api.redis.rss.display">
                            <label class="form-check-label" for="redisRssDisplay">{{ $t('rss') }}</label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="redisRssTTL">{{ $t('ttl_minute') }}</label>
                        <input :disabled="!settingsClone.api.redis.rss.display" v-model="settingsClone.api.redis.rss.ttl" class="form-control" id="redisRssTTL" type="number">
                    </div>
                    <button class="btn btn-primary" type="submit">{{ $t('save_changes') }}</button>
                </form>
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-header">{{ $t('aws') }}</div>
            <div class="card-body">
                <form @submit.prevent="save">
                    <div class="mb-3">
                        <div class="form-check">
                            <input :disabled="settingsClone.api.drive.display" class="form-check-input" id="awsDisplay" type="checkbox" value="true" v-model="settingsClone.api.aws.display" name="aws_driveDisplay">
                            <label class="form-check-label" for="awsDisplay">{{ $t('active') }}</label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="awsBucketName">{{ $t('aws_bucket_name') }}</label>
                        <input v-model="settingsClone.api.aws.bucket" class="form-control" id="awsBucketName" type="text">
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="awsBucketRegion">{{ $t('aws_bucket_region') }}</label>
                        <input v-model="settingsClone.api.aws.region" class="form-control" id="awsBucketRegion" type="text">
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="awsBucketAccess">{{ $t('aws_bucket_access') }}</label>
                        <input v-model="settingsClone.api.aws.access" class="form-control" id="awsBucketAccess" type="text">
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="awsBucketSecret">{{ $t('aws_bucket_secret') }}</label>
                        <input v-model="settingsClone.api.aws.secret" class="form-control" id="awsBucketSecret" type="text">
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="awsCdn">{{ $t('aws_cdn_url') }}</label>
                        <input v-model="settingsClone.api.aws.cdn" class="form-control" id="awsCdn" type="text">
                    </div>
                    <button class="btn btn-primary" type="submit">{{ $t('save_changes') }}</button>
                </form>
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-header">{{ $t('recommendation_engine') }}</div>
            <div class="card-body">
                <form @submit.prevent="save">
                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" id="reBlog" type="checkbox" value="true" v-model="settingsClone.api.recommendation.blog">
                            <label class="form-check-label" for="reBlog">{{ $t('blog') }}</label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" id="reComment" type="checkbox" value="true" v-model="settingsClone.api.recommendation.comment">
                            <label class="form-check-label" for="reComment">{{ $t('comment') }}</label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" id="reUser" type="checkbox" value="true" v-model="settingsClone.api.recommendation.user">
                            <label class="form-check-label" for="reUser">{{ $t('user') }}</label>
                        </div>
                    </div>
                    <button class="btn btn-primary" type="submit">{{ $t('save_changes') }}</button>
                </form>
            </div>
        </div>
    </div>
    <div class="col-lg-6">
        <div class="card mb-4">
            <div class="card-header">{{ $t('google_index') }}</div>
            <div class="card-body">
                <form @submit.prevent="save">
                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" id="googleIndexActive" type="checkbox" value="true" v-model="settingsClone.api.index.display" name="googleIndexDisplay">
                            <label class="form-check-label" for="googleIndexActive">{{ $t('active') }}</label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="googleIndexEmail">{{ $t('google_index_email') }}</label>
                        <input v-model="settingsClone.api.index.email" class="form-control" id="googleIndexEmail" type="text">
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="googleIndexKey">{{ $t('google_index_key') }}</label>
                        <input v-model="settingsClone.api.index.email" class="form-control" id="googleIndexKey" type="text">
                    </div>
                    <button class="btn btn-primary" type="submit">{{ $t('save_changes') }}</button>
                </form>
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-header">{{ $t('google_drive') }}</div>
            <div class="card-body">
                <form @submit.prevent="save">
                    <div class="mb-3">
                        <div class="form-check">
                            <input :disabled="settingsClone.api.aws.display" class="form-check-input" id="driveDisplay" type="checkbox" value="true" v-model="settingsClone.api.drive.display" name="aws_driveDisplay">
                            <label class="form-check-label" for="driveDisplay">{{ $t('active') }}</label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="driveClient">{{ $t('drive_client') }}</label>
                        <input v-model="settingsClone.api.drive.client" class="form-control" id="driveClient" type="text">
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="driveSecret">{{ $t('drive_secret') }}</label>
                        <input v-model="settingsClone.api.drive.secret" class="form-control" id="driveSecret" type="text">
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="driveRedirect">{{ $t('drive_redirect') }}</label>
                        <input v-model="settingsClone.api.drive.redirect" class="form-control" id="driveRedirect" type="text">
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="driveRefresh">{{ $t('drive_refresh') }}</label>
                        <input v-model="settingsClone.api.drive.refresh" class="form-control" id="driveRefresh" type="text">
                    </div>
                    <button class="btn btn-primary" type="submit">{{ $t('save_changes') }}</button>
                </form>
            </div>
        </div>
        <div class="card mb-4">
            <div class="card-header">{{ $t('custom_codes') }}</div>
            <div class="card-body">
                <form @submit.prevent="save">
                    <div class="mb-3">
                        <label class="small mb-1" for="customJs">{{ $t('custom_js_code') }}</label>
                        <textarea v-model="settingsClone.api.custom.js" class="form-control" id="customJs"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="small mb-1" for="customCss">{{ $t('custom_css_code') }}</label>
                        <textarea v-model="settingsClone.api.custom.css" class="form-control" id="customCss"></textarea>
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
                api: {
                    redis: {
                        sitemap: {},
                        rss: {},
                    },
                    index: {},
                    aws: {},
                    drive: {},
                    recommendation: {},
                    custom: {}
                }
            }
        }
    },
    created(){
        this.settingsClone = structuredClone(this.settings)
    },
    methods: {
        save(){
            adminService.saveSettings(this.settingsClone)
        }
    }
}
</script>