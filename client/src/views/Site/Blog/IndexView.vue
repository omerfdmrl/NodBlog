<template>
<section class="bg-body pb-5 post-body" v-if="data.post">
  <div class="container">
    <div class="row justify-content-center">
      <div class="row">
        <div class="col-xl-9 col-lg-10">
          <div class="section">
            <p class="mb-4 text-muted"> {{ $t('0_min_read', {time : readMinCalculator(data.post.content)}) }} 
            </p>
            <h1 class="mb-3">{{ data.post.title }}</h1>
            <p class="mb-4 pb-1" v-html="data.post.excerpt"></p>
            <div class="post-author d-flex">
              <div class="flex-shrink-0">
                <router-link :to="{name: 'site-profile', params: {username: data.post.user.username}}" class="is-hoverable" :title="Object.values(data.post.user.name).join(' ')">
                  <img loading="lazy" class="rounded-circle w-auto" :src="data.post.user.image" :alt="Object.values(data.post.user.name).join(' ')" width="50" height="50">
                </router-link>
              </div>
              <div class="flex-grow-1 ms-3"> by <router-link :to="{name: 'site-profile', params: {username: data.post.user.username}}" class="text-link" :title="Object.values(data.post.user.name).join(' ')">{{ Object.values(data.post.user.name).join(' ') }}</router-link>
                <p class="mb-0 lh-base">{{ formatDate(data.post.created_at) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-9 col-lg-12">
          <div class="section p-0">
            <div id="blog-content" class="content" v-html="data.post.content"></div>
            <div v-if="data.post.resource.length" class="mt-5">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">{{ $t('resource') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(res,index) in data.post.resource" :key="index">
                      <th scope="row">{{ index + 1 }}</th>
                      <td><a :href="res" target="_blank">{{ res }}</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="d-block d-sm-flex justify-content-between align-items-center mt-5 pt-3">
              <ul class="taxonomy-lists list-unstyled list-inline">
                <li class="list-inline-item d-block mb-3">{{ $t('tags:') }} </li>
                <li class="list-inline-item" v-for="(tag,index) in data.post.tag" :key="index">
                  <a class="bg-white" href="tag-single.html">{{ tag }}</a>
                </li>
              </ul>
              <ul class="list-inline social-share text-start text-sm-end mt-4 mt-sm-0">
                <li class="list-inline-item d-block mb-2 text-start">Share: </li>
                <li class="list-inline-item lead text-center is-hoverable">
                  <a :href="[`http://twitter.com/share?text=${data.post.title}&url=${url}&hashtags=${$store.state.informations.name}`]" target="_blank"><i class="ti ti-brand-twitter"></i></a>
                </li>
                <li class="list-inline-item lead text-center is-hoverable ms-3">
                  <a :href="[`https://www.facebook.com/sharer/sharer.php?u=${url}`]" target="_blank"><i class="ti ti-brand-facebook"></i></a>
                </li>
                <li class="list-inline-item lead text-center is-hoverable ms-3">
                  <a :href="[`https://www.linkedin.com/sharing/share-offsite/?url=${url}`]" target="_blank"><i class="ti ti-brand-linkedin"></i></a>
                </li>
                <li class="list-inline-item lead text-center is-hoverable ms-3">
                  <a :href="[`http://www.reddit.com/submit?url=${url}&title=${data.post.title}`]" target="_blank"><i class="ti ti-brand-reddit"></i></a>
                </li>
                <li v-if="data.post.image" class="list-inline-item lead text-center is-hoverable ms-3">
                  <a :href="[`http://pinterest.com/pin/create/button/?url=${url}&media=${data.post.image}&description=${data.post.excerpt}`]" target="_blank"><i class="ti ti-brand-pinterest"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-xl-2 blog-user-card">
          <div class="container mt-4 mb-4 p-3 d-flex justify-content-center border"> 
            <div class="p-4"> 
              <div class="image d-flex flex-column justify-content-center align-items-center"> 
                <router-link :to="{name: 'site-profile', params: {username: data.post.user.username}}">
                  <img :src="data.post.user.image" :alt="Object.values(data.post.user.name).join(' ')" height="100" width="100" class="rounded-circle not-vw" />
                </router-link>
                <router-link :to="{name: 'site-profile', params: {username: data.post.user.username}}" class="name mt-3 text-link">{{ Object.values(data.post.user.name).join(' ') }}</router-link> 
                <div class="d-flex flex-row justify-content-center align-items-center mt-3"> 
                  <span class="number">{{ abbreviateNumber(data.followers) }} <span class="follow">{{ $t('followers') }}</span></span> 
                </div> <div class="text mt-3"> 
                  <span>{{ data.post.user.about }}</span>
                </div> 
                <div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center"> 
                  <span v-if="data.post.user.social.instagram"><a target="_blank" :href="[`https://www.instagram.com/${data.post.user.social.instagram}`]"><i class="ti ti-brand-instagram"></i></a></span> 
                  <span v-if="data.post.user.social.twitter"><a target="_blank" :href="[`https://www.twitter.com/${data.post.user.social.twitter}`]"><i class="ti ti-brand-twitter"></i></a></span> 
                  <span v-if="data.post.user.social.facebook"><a target="_blank" :href="[`https://www.facebook.com/${data.post.user.social.facebook}`]"><i class="ti ti-brand-facebook"></i></a></span> 
                  <span v-if="data.post.user.social.linkedin"><a target="_blank" :href="[`https://www.linkedin.com/in/${data.post.user.social.linkedin}`]"><i class="ti ti-brand-linkedin"></i></a></span> 
                </div> 
                <div class=" px-2 rounded mt-4 date "> 
                  <span class="join">{{ $t('joined_in_0', {date : formatDate(data.post.user.created_at,false)}) }}</span> 
                </div> 
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <teleport to="title">
    {{ ' | ' + data.post.title }}
  </teleport>
</section>
<div class="blog-action border d-flex shadow">
  <svg class="fill-muted" @click="likePost($event)" width="24" height="24" viewBox="0 0 24 24" aria-label="clap"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.37.83L12 3.28l.63-2.45h-1.26zM13.92 3.95l1.52-2.1-1.18-.4-.34 2.5zM8.59 1.84l1.52 2.11-.34-2.5-1.18.4zM18.52 18.92a4.23 4.23 0 0 1-2.62 1.33l.41-.37c2.39-2.4 2.86-4.95 1.4-7.63l-.91-1.6-.8-1.67c-.25-.56-.19-.98.21-1.29a.7.7 0 0 1 .55-.13c.28.05.54.23.72.5l2.37 4.16c.97 1.62 1.14 4.23-1.33 6.7zm-11-.44l-4.15-4.15a.83.83 0 0 1 1.17-1.17l2.16 2.16a.37.37 0 0 0 .51-.52l-2.15-2.16L3.6 11.2a.83.83 0 0 1 1.17-1.17l3.43 3.44a.36.36 0 0 0 .52 0 .36.36 0 0 0 0-.52L5.29 9.51l-.97-.97a.83.83 0 0 1 0-1.16.84.84 0 0 1 1.17 0l.97.97 3.44 3.43a.36.36 0 0 0 .51 0 .37.37 0 0 0 0-.52L6.98 7.83a.82.82 0 0 1-.18-.9.82.82 0 0 1 .76-.51c.22 0 .43.09.58.24l5.8 5.79a.37.37 0 0 0 .58-.42L13.4 9.67c-.26-.56-.2-.98.2-1.29a.7.7 0 0 1 .55-.13c.28.05.55.23.73.5l2.2 3.86c1.3 2.38.87 4.59-1.29 6.75a4.65 4.65 0 0 1-4.19 1.37 7.73 7.73 0 0 1-4.07-2.25zm3.23-12.5l2.12 2.11c-.41.5-.47 1.17-.13 1.9l.22.46-3.52-3.53a.81.81 0 0 1-.1-.36c0-.23.09-.43.24-.59a.85.85 0 0 1 1.17 0zm7.36 1.7a1.86 1.86 0 0 0-1.23-.84 1.44 1.44 0 0 0-1.12.27c-.3.24-.5.55-.58.89-.25-.25-.57-.4-.91-.47-.28-.04-.56 0-.82.1l-2.18-2.18a1.56 1.56 0 0 0-2.2 0c-.2.2-.33.44-.4.7a1.56 1.56 0 0 0-2.63.75 1.6 1.6 0 0 0-2.23-.04 1.56 1.56 0 0 0 0 2.2c-.24.1-.5.24-.72.45a1.56 1.56 0 0 0 0 2.2l.52.52a1.56 1.56 0 0 0-.75 2.61L7 19a8.46 8.46 0 0 0 4.48 2.45 5.18 5.18 0 0 0 3.36-.5 4.89 4.89 0 0 0 4.2-1.51c2.75-2.77 2.54-5.74 1.43-7.59L18.1 7.68z"></path></svg>
  <p v-if="data.post" class="text-muted noselect">{{ abbreviateNumber(data.post.stats.like) }}</p>
  <svg data-toggle="comments" class="fill-muted" width="24" height="24" viewBox="0 0 24 24" aria-label="comments"><path d="M18 16.8a7.14 7.14 0 0 0 2.24-5.32c0-4.12-3.53-7.48-8.05-7.48C7.67 4 4 7.36 4 11.48c0 4.13 3.67 7.48 8.2 7.48a8.9 8.9 0 0 0 2.38-.32c.23.2.48.39.75.56 1.06.69 2.2 1.04 3.4 1.04.22 0 .4-.11.48-.29a.5.5 0 0 0-.04-.52 6.4 6.4 0 0 1-1.16-2.65v.02zm-3.12 1.06l-.06-.22-.32.1a8 8 0 0 1-2.3.33c-4.03 0-7.3-2.96-7.3-6.59S8.17 4.9 12.2 4.9c4 0 7.1 2.96 7.1 6.6 0 1.8-.6 3.47-2.02 4.72l-.2.16v.26l.02.3a6.74 6.74 0 0 0 .88 2.4 5.27 5.27 0 0 1-2.17-.86c-.28-.17-.72-.38-.94-.59l.01-.02z"></path></svg>
  <p v-if="data.comments" class="text-muted noselect">{{ data.comments.length }}</p>
  <div class="btn-group dropup">
    <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#6c757d" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx="5" cy="12" r="1"></circle>
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="19" cy="12" r="1"></circle>
    </svg>
    <div class="dropdown-menu">
      <div class="d-flex justify-content-center flex-column mt-1">
        <svg class="mx-auto icon icon-tabler icon-tabler-flag" :title="$t('report_post')" data-bs-toggle="modal" type="button" data-bs-target="#reportBlogModal" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <line x1="5" y1="5" x2="5" y2="21"></line>
          <line x1="19" y1="5" x2="19" y2="14"></line>
          <path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0"></path>
          <path d="M5 14a5 5 0 0 1 7 0a5 5 0 0 0 7 0"></path>
        </svg>
        <svg @click="dislikeBlog" :title="$t('block_post')" class="mx-auto" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 20.85q-1.825 0-3.438-.7-1.612-.7-2.812-1.9-1.2-1.2-1.9-2.8-.7-1.6-.7-3.45 0-1.825.7-3.438.7-1.612 1.9-2.812 1.2-1.2 2.8-1.9 1.6-.7 3.45-.7 1.825 0 3.438.7 1.612.7 2.812 1.9 1.2 1.2 1.9 2.8.7 1.6.7 3.45 0 1.825-.7 3.438-.7 1.612-1.9 2.812-1.2 1.2-2.8 1.9-1.6.7-3.45.7Zm0-.925q3.3 0 5.613-2.312Q19.925 15.3 19.925 12q0-1.475-.525-2.813-.525-1.337-1.475-2.462l-11.2 11.2q1.1.975 2.45 1.488 1.35.512 2.825.512Zm-5.925-2.65 11.2-11.2q-1.075-1-2.437-1.5-1.363-.5-2.838-.5-3.3 0-5.612 2.312Q4.075 8.7 4.075 12q0 1.475.513 2.825.512 1.35 1.487 2.45Z"/></svg>
        <svg @click="download" class="mx-auto" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.675 18.8q-.65 0-1.087-.45-.438-.45-.438-1.1V14.9h.9v2.35q0 .25.2.438.2.187.425.187h10.65q.225 0 .425-.187.2-.188.2-.438V14.9h.9v2.35q0 .65-.437 1.1-.438.45-1.088.45ZM12 15.2l-3.4-3.425.65-.625 2.3 2.3V4.8h.925v8.65l2.3-2.3.65.625Z"/></svg>
      </div>
    </div>
  </div>
</div>
<div class="comments-overlay" data-toggle="comments-close"></div>
<div class="comments-block overflow-auto bg-body">
  <div data-toggle="comments-close">
    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </div>
  <h4 class="h4 mb-2" v-if="data.comments">{{ $t('comments') }} ({{ data.comments.length }})</h4>
  <div v-if="$store.state.user" class="comment-input shadow">
    <div class="post-author d-flex mb-2">
      <div class="flex-shrink-0">
        <a href="#!" class="is-hoverable" :title="Object.values($store.state.user.name).join(' ')">
          <img loading="lazy" class="rounded-circle w-auto" :src="$store.state.user.image" :alt="Object.values($store.state.user.name).join(' ')" width="50" height="50">
        </a>
      </div>
      <div class="flex-grow-1 ms-3 name">
        {{ Object.values($store.state.user.name).join(' ') }}
      </div>
    </div>
    <QuillEditor id="ql-editor" :placeholder="$t('enter_your_content...')" :toolbar="['bold', 'italic', 'code-block', 'color']" theme="bubble" class="form-control comments-editor" />
    <div class="actions">
      <button data-toggle="comments-close" class="btn btn-secondary btn-sm">{{ $t('cancel') }}</button>
      <button @click="addComment()" class="btn btn-success btn-sm">{{ $t('publish') }}</button>
    </div>
  </div>
  <hr>
  <div class="comments" v-if="data.comments">
    <div class="comment-input shadow" v-for="(comment,index) in data.comments" :key="index">
      <div v-if="comment.user.name.first" class="post-author d-flex mb-2">
        <div class="flex-shrink-0">
          <router-link :to="{name: 'site-profile', params: { username: comment.user.username }}" class="is-hoverable" :title="comment.user.name.first + ' ' + comment.user.name.last">
            <img loading="lazy" class="rounded-circle w-auto" :src="comment.user.image" :alt="comment.user.name.first + ' ' + comment.user.name.last" width="50" height="50">
          </router-link>
        </div>
        <div class="flex-grow-1 ms-3 name">
          {{ comment.user.name.first + ' ' + comment.user.name.last }}
        </div>
        <div class="btn-group">
          <svg data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx="5" cy="12" r="1"></circle>
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
          </svg>
          <div class="dropdown-menu">
            <div class="d-flex justify-content-center flex-column">
              <svg @click="report.comment.current = index" data-bs-toggle="modal" type="button" data-bs-target="#reportCommentModal" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-flag" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <line x1="5" y1="5" x2="5" y2="21"></line>
                <line x1="19" y1="5" x2="19" y2="14"></line>
                <path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0"></path>
                <path d="M5 14a5 5 0 0 1 7 0a5 5 0 0 0 7 0"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div readonly class="form-control comments-editor" v-html="comment.content"></div>
      <div class="actions d-flex justify-content-end">
        <span @click="likeComment($event,index)" class="heart noselect" :data-count="comment.stats.like"></span>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="reportBlogModal" tabindex="-1" aria-labelledby="reportBlogModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="reportBlogModalLabel">{{ $t('report_post') }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form action="#" @submit.prevent="reportBlog">
        <div class="modal-body">
          <div class="form-check">
              <input required value="spam" v-model="report.blog.reason" class="form-check-input" type="radio" name="reportBlog" id="reportSpam">
              <label class="form-check-label" for="reportSpam">
                {{ $t('spam') }}
              </label>
            </div>
            <div class="form-check">
              <input required value="against_community_rules" v-model="report.blog.reason" class="form-check-input" type="radio" name="reportBlog" id="reportAgainst_community_rules">
              <label class="form-check-label" for="reportAgainst_community_rules">
                {{ $t('against_community_rules') }}
              </label>
            </div>
            <div class="form-check">
              <input required value="rules_violation" v-model="report.blog.reason" class="form-check-input" type="radio" name="reportBlog" id="reportRules_violation">
              <label class="form-check-label" for="reportRules_violation">
                {{ $t('rules_violation') }}
              </label>
            </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">{{ $t('report') }}</button>
        </div>
      </form>
    </div>
  </div>
</div>
<div class="modal fade" id="reportCommentModal" tabindex="-1" aria-labelledby="reportCommentModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="reportCommentModalLabel">{{ $t('report_comment') }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form action="#" @submit.prevent="reportComment">
        <div class="modal-body">
          <div class="form-check">
              <input required value="spam" v-model="report.comment.reason" class="form-check-input" type="radio" name="reportComment" id="reportSpam2">
              <label class="form-check-label" for="reportSpam2">
                {{ $t('spam') }}
              </label>
            </div>
            <div class="form-check">
              <input required value="against_community_rules" v-model="report.comment.reason" class="form-check-input" type="radio" name="reportComment" id="reportAgainst_community_rules2">
              <label class="form-check-label" for="reportAgainst_community_rules2">
                {{ $t('against_community_rules') }}
              </label>
            </div>
            <div class="form-check">
              <input required value="rules_violation" v-model="report.comment.reason" class="form-check-input" type="radio" name="reportComment" id="reportRules_violation2">
              <label class="form-check-label" for="reportRules_violation2">
                {{ $t('rules_violation') }}
              </label>
            </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">{{ $t('report') }}</button>
        </div>
      </form>
    </div>
  </div>
</div>
<div id="reading-progress"><div id="reading-progress-fill"></div></div>
<HomeComponent :left="left" v-if="isHomeVisible"></HomeComponent>
</template>

<script>
import siteService from '@/services/site.service';
import HomeComponent from '@/components/HomeComponent.vue';
import storageService from '@/services/storage.service';
export default {
    props: ["left"],
    data() {
        return {
            data: {},
            url: window.location.href,
            likePostProgress: {
                interval: null,
                is: true
            },
            likeCommentProgress: {
                interval: null,
                is: true
            },
            report: {
                blog: {},
                comment: {}
            },
            isHomeVisible : false,
        };
    },
    async created() {
        const response = await siteService.blogIndex(this.$route.params);
        if (response.status == 1) {
            this.data = response;
            this.$emit("updateHead", {
                meta: {
                    keywords: this.data.post.tag.join("."),
                    description: this.data.post.excerpt
                },
                og: {
                    title: this.data.post.title,
                    url: window.location.href,
                    image: this.data.post.image,
                    description: this.data.post.excerpt
                }
            });
            let o = document.querySelector(".blog-action");
            const readingProgressFill = document.querySelector("#reading-progress-fill");
            let progressBar = document.getElementById('reading-progress')
            document.addEventListener('scroll', () => {
                let scrollHeight = document.querySelector('section.bg-body.post-body').scrollHeight
                let w = (document.body.scrollTop || document.documentElement.scrollTop) / (scrollHeight - document.documentElement.clientHeight) * 100;
                readingProgressFill.style.setProperty("width", w + "%");
                if(w  > 99.5){
                  this.isHomeVisible = true
                }
                200 <= window.scrollY && scrollHeight - 1000 >= window.scrollY ? o.classList.add("shown") & progressBar.classList.add('shown') : o.classList.remove("shown") & progressBar.classList.remove('shown')
            })
            let s = document.querySelector(".comments-block"), n = document.querySelector(".comments-overlay"), e = document.querySelectorAll("[data-toggle=\"comments\"]"), t = document.querySelectorAll("[data-toggle=\"comments-close\"]");
            e.forEach(e => {
                e.addEventListener("click", function () {
                    s.classList.add("is-visible"), n.classList.add("is-visible");
                });
            }), t.forEach(e => {
                e.addEventListener("click", function () {
                    s.classList.remove("is-visible"), n.classList.remove("is-visible");
                });
            });

            // setTimeout(() => {
            //   let titles = document.querySelectorAll('#blog-content h1, #blog-content h2, #blog-content h3, #blog-content h4, #blog-content h5, #blog-content h6')
            //   titles.forEach(element => {
            //     let id = this.urlify(element.innerHTML)
            //     element.setAttribute('id', id)
            //     let a = document.createElement('a')
            //     a.href = '#' + id
            //     a.setAttribute('title',element.innerHTML)
            //     a.classList = 'reading-title-pointer'
            //     let scrollHeight = document.querySelector('section.bg-body.post-body').getBoundingClientRect().top
            //     let toTop = (element.getBoundingClientRect().top - scrollHeight) / 100
            //     toTop = toTop + (toTop * 30 / 100)
            //     a.style.left = toTop + '%'
            //     let i = document.createElement('i')
            //     i.classList = 'ti ti-map-pin'
            //     a.appendChild(i)
            //     progressBar.appendChild(a)
            //   });
            // }, 500);

        }
    },
    unmounted() {
        this.$emit("updateHead", false);
    },
    methods: {
        async download(){
          storageService.push('downloaded_blogs',this.data.post,false,true)
          window.toast.success(this.$t('downloaded_successfully_you_can_read_when_offline'))
        },
        async dislikeBlog() {
            siteService.blogDislike(this.$route.params);
        },
        async reportBlog() {
            if (!this.$store.state.user.name) {
                return window.toast.error(this.$t("need_to_login_first"));
            }
            this.report.blog.id = this.$route.params.id;
            this.report.blog.post = this.$route.params.post;
            const response = await siteService.blogReport(this.report.blog);
            if (response.status == 1) {
                this.report.blog = {};
            }
        },
        async reportComment() {
            if (!this.$store.state.user.name) {
                return window.toast.error(this.$t("need_to_login_first"));
            }
            this.report.comment.id = this.$route.params.id;
            this.report.comment.post = this.$route.params.post;
            this.report.comment.comment = this.data.comments[this.report.comment.current]._id;
            const response = await siteService.blogComment(this.report.comment);
            if (response.status == 1) {
                this.report.comment = {};
            }
        },
        async likePost(event) {
            if (!this.$store.state.user.name) {
                return window.toast.error(this.$t("need_to_login_first"));
            }
            clearTimeout(this.likePostProgress.timeout);
            if (this.likePostProgress.is) {
                event.target.classList.remove("fill-muted");
                event.target.classList.add("tada_animating");
                setTimeout(() => {
                    event.target.classList.remove("tada_animating");
                }, 1000);
                const response = await siteService.blogLike(this.$route.params);
                if (response.status == 1) {
                    this.data.post.stats.like++;
                }
            }
            this.likePostProgress.is = false;
            this.likePostProgress.timeout = setTimeout(() => {
                this.likePostProgress.is = true;
            }, 1000);
        },
        async likeComment(event, index) {
            if (!this.$store.state.user.name) {
                return window.toast.error(this.$t("need_to_login_first"));
            }
            clearTimeout(this.likePostProgress.timeout);
            if (this.likePostProgress.is) {
                event.target.classList.add("active");
                event.target.classList.add("heart_animating");
                setTimeout(() => {
                    event.target.classList.remove("heart_animating");
                }, 1000);
                const response = await siteService.commentLike({
                    id: this.$route.params.id,
                    post: this.$route.params.post,
                    comment: this.data.comments[index]._id
                });
                if (response.status == 1) {
                    this.data.comments[index].stats.like++;
                }
            }
            this.likePostProgress.is = false;
            this.likePostProgress.timeout = setTimeout(() => {
                this.likePostProgress.is = true;
            }, 1000);
        },
        async addComment() {
            if (!this.$store.state.user.name) {
                return window.toast.error(this.$t("need_to_login_first"));
            }
            if (!document.querySelector(".comments-block .comment-input .comments-editor .ql-editor").innerHTML || document.querySelector(".comments-block .comment-input .comments-editor .ql-editor").innerHTML.length < 30) {
                return window.toast.error(this.$t("content_required"));
            }
            const response = await siteService.commentAdd({
                id: this.$route.params.id,
                post: this.$route.params.post,
                content: document.querySelector(".comments-block .comment-input .comments-editor .ql-editor").innerHTML
            });
            if (response.status == 1) {
                this.data.comments.unshift({
                    content: document.querySelector(".comments-block .comment-input .comments-editor .ql-editor").innerHTML,
                    user: {
                        name: this.$store.state.user.name,
                        image: this.$store.state.user.image,
                        username: this.$store.state.user.username,
                    },
                    stats: {
                        like: 0
                    }
                });
                console.log(this.data.comments);
                document.querySelector(".comments-block .comment-input .comments-editor .ql-editor").innerHTML = "";
            }
        }
    },
    components: { HomeComponent }
}
</script>