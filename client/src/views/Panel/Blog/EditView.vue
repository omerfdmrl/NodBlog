<template>
<header class="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
    <div class="container-fluid px-4">
        <div class="page-header-content">
            <div class="row align-items-center justify-content-between pt-3">
                <div class="col-auto mb-3">
                    <h1 class="page-header-title">
                        <div class="page-header-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg></div>
                        {{ $t('add_new_blog') }}
                    </h1>
                </div>
                <div class="col-12 col-xl-auto mb-3">
                    <router-link :to="{name: 'panel-blog-list'}" class="btn btn-sm btn-light text-primary" href="blog-management-posts-list.html">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left me-1"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        {{ $t('back_to_all_blogs') }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</header>
<div class="container-fluid px-4">
    <div class="row gx-4">
        <div class="col-lg-8">
            <div class="card mb-4">
                <div class="card-header">{{ $t('title') }}</div>
                <div class="card-body"><input @input="data.slug  = urlify(data.title)" v-model="data.title" class="form-control" id="postTitleInput" type="text" :placeholder="$t('enter_your_title...')"></div>
            </div>
            <div class="card card-header-actions mb-4">
                <div class="card-header">
                    {{ $t('excerpt') }}
                </div>
                <div class="card-body"><textarea v-model="data.excerpt" class="lh-base form-control" type="text" :placeholder="$t('enter_your_post_excerpt...')" rows="4"></textarea></div>
            </div>
            <div class="card card-header-actions mb-4 mb-lg-0">
                <div class="card-header">
                    {{ $t('content') }}
                </div>
                <div class="card-body">
                    <QuillEditor @ready="ready" id="ql-editor" :placeholder="$t('enter_your_content...')" :toolbar="toolbar" theme="bubble" />
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card mb-4">
                <div class="card-header">{{ $t('slug') }}</div>
                <div class="card-body"><input v-model="data.slug" class="form-control" id="postTitleInput" type="text" :placeholder="$t('enter_your_title...')"></div>
            </div>
            <div class="card mb-4">
                <div class="card-header">{{ $t('tags') }}</div>
                <div class="card-body"><Select2 :options="tags" :settings="{ multiple: true, tags: true}" v-model="data.tag" class="form-control" id="postTagInput" type="text" :placeholder="$t('enter_your_tags...')"></Select2></div>
            </div>
            <div class="card mb-4">
                <div class="card-header">{{ $t('resources') }}</div>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-10">
                            <input v-model="resource.text" class="form-control" id="resourceText" type="url" :placeholder="$t('enter_your_resource...')">
                        </div>
                        <div class="col-2">
                            <button @click="resource.list.push(resource.text);resource.text = ''" :disabled="!resource.text" class="btn btn-success">+</button>
                        </div>
                    </div>
                    <div v-for="(res,index) in resource.list" :key="index" class="row mb-1">
                        <div class="col-10">
                            <input :value="res" disabled class="form-control" id="resourceText" type="url" :placeholder="$t('enter_your_resource...')">
                        </div>
                        <div class="col-2">
                            <button @click="resource.list.splice(index)" class="btn btn-danger">+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card card-header-actions">
                <div class="card-header">
                    {{ $t('publish') }}
                </div>
                <div class="card-body">
                    <div class="d-grid mb-3"><button @click="save('draft')" class="fw-500 btn btn-primary-soft text-primary">{{ $t('save_as_draft') }}</button></div>
                    <div class="d-grid"><button @click="save('published')" class="fw-500 btn btn-primary">{{ $t('submit_as_published') }}</button></div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import panelService from '@/services/panel.service'
import mainService from '@/services/main.service';
export default {
    data(){
        return {
            data: {},
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],    
                ['blockquote', 'code-block','image'],

                [{ 'header': 1 }, { 'header': 2 }],               
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      
                [{ 'indent': '-1'}, { 'indent': '+1' }],          

                [{ 'size': ['small', false, 'large', 'huge'] }], 

                [{ 'color': [] }, { 'background': [] }],       
                [{ 'align': [] }],

                ['clean']                                         
            ],
            tags: {},
            resource: {
                list: []
            }
        }
    },
    methods: {
        ready(editor){
            editor.getModule('toolbar').addHandler('image', () => {
                const tooltip = editor.theme.tooltip;
                const originalSave = tooltip.save;
                const originalHide = tooltip.hide;

                tooltip.save = function () {
                    const range = editor.getSelection(true);
                    const value = this.textbox.value;
                    if (value) {
                        editor.insertEmbed(range.index, 'image', value, 'user');
                    }
                };
                tooltip.hide = function () {
                    tooltip.save = originalSave;
                    tooltip.hide = originalHide;
                    tooltip.hide();
                };
                tooltip.edit('image');
                tooltip.textbox.placeholder = 'Embed URL';
            });
        },
        save(status){
            this.data.status = status
            this.data.resource = this.resource.list
            this.data.content = document.querySelector('#ql-editor .ql-editor').innerHTML
            this.data.image = document.querySelector('#ql-editor .ql-editor img') ? document.querySelector('#ql-editor .ql-editor img').src : null
            this.data.oldSlug = this.$route.params.slug
            this.data.id = this.$route.params.id
            panelService.blogSaveEdit(this.data)
        }
    },
    async created(){
        const response = await panelService.blogGetEdit(this.$route.params)
        if(response.status == 1){
            this.data = response.blog
            const response2 = await mainService.tagList()
            const Tags = response2.tags
            var tags = []
            Object.values(Tags).forEach(element => {
                tags.push({
                    text: `${element.key} (${element.count})`,
                    id: element.key
                })
            });
            this.tags = tags
            this.resource.list = this.data.resource ?? []
            document.querySelector('#ql-editor .ql-editor').innerHTML = response.blog.content
        }
    }
}
</script>