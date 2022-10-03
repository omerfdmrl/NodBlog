<template>
<section class="bg-body pb-5 blog-add-section">
    <div class="container">
        <div class="row justify-content-center">
            <input v-model="data.title" type="text" class="w-100 form-control mt-5" :placeholder="$t('enter_your_title...')">
            <QuillEditor @ready="ready" id="ql-editor" :placeholder="$t('enter_your_content...')" class="form-control pb-5" :toolbar="toolbar" theme="bubble" />
            <button data-bs-toggle="modal" data-bs-target="#saveModal" class="btn btn-primary w-25" :disabled="!data.title">{{ $t('publish') }}</button>
        </div>
    </div>
</section>
<!-- Modal -->
<div class="modal fade" id="saveModal" aria-labelledby="saveModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="saveModalLabel">{{ $t('publish') }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <Select2 :options="tags" :settings="{ multiple: true, tags: true, dropdownParent: '#saveModal'}" v-model="data.tag" id="postTagInput" type="text" :placeholder="$t('enter_your_tags...')"></Select2>
        <div class="mt-3">
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
      <div class="modal-footer">
        <button :disabled="!data.tag" @click="save" type="button" class="btn btn-primary">{{ $t('publish') }}</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import mainService from '@/services/main.service'
import panelService from '@/services/panel.service'
import storageService from '@/services/storage.service'
export default {
    data(){
        return {
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
            data: {},
            tags: [],
            resource: {
                list: []
            }
        }
    },
    async created(){
        const response = await mainService.tagList()
        const Tags = response.tags
        var tags = []
        Object.values(Tags).forEach(element => {
            tags.push({
                text: `${element.key} (${element.count})`,
                id: element.key
            })
        });
        this.tags = tags
        const postData = await storageService.get('post_auto_save')
        if(postData){
            this.data.title = postData.title
            document.querySelector('#ql-editor .ql-editor').innerHTML = postData.content
        }
        setInterval(() => {
            const content = document.querySelector('#ql-editor .ql-editor').innerHTML
            const data = {
                content,
                title: this.data.title
            }
            storageService.set('post_auto_save',data)
        }, 2000);
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
        save(){
            this.data.status = 'published'
            this.data.content = document.querySelector('#ql-editor .ql-editor').innerHTML
            this.data.excerpt = document.querySelector('#ql-editor .ql-editor p:first-of-type').innerHTML
            this.data.image = document.querySelector('#ql-editor .ql-editor img') ? document.querySelector('#ql-editor .ql-editor img').src : null
            this.data.slug = this.urlify(this.data.title)
            this.data.site = true
            this.data.resource = this.resource.list
            storageService.remove('post_auto_save')
            panelService.blogAdd(this.data)
        }
    },
}
</script>