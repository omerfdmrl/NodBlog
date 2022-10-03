<template>
<section class="section" v-if="tag">
  <div class="container">
    <div class="row gy-2 align-items-center section-title mb-0 section pt-0">
      <div class="col-12">
        <p class="mb-3">{{ $t('showing_posts_from') }}</p>
        <h1 class="h3 mb-0 title">{{ tag }}</h1>
      </div>
      <div class="col-12">
        <ul class="list-inline breadcrumb-menu">
            <li class="list-inline-item">
                <router-link class="text-link" :to="{name : 'site-home'}">{{ $t('home') }}</router-link>
            </li>
            <li class="list-inline-item">• &nbsp; <router-link class="text-link" :to="{name: 'site-tag-list'}">{{ $t('tags') }}</router-link>
            </li>
          <li class="list-inline-item">• &nbsp; <a class="text-link" href="#!">{{ tag }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="row gy-5 gx-md-5">

      <div class="col-lg-4 col-md-6" v-for="(item,index) in posts" :key="index">
        <article class="bg-white d-flex flex-column h-100">
          <div class="post-image">
            <router-link v-if="item.image" class="d-block" :to="{name: 'site-blog-index', params: {id: item.__id, post: item.slug}}" :title="item.title">
              <img loading="lazy" class="w-100 h-auto" :src="item.image" :alt="item.title" width="400" height="264">
            </router-link>
          </div>
          <div class="p-4 pb-0">
            <ul class="post-meta list-inline mb-3">
              <li class="list-inline-item">
                <i class="ti ti-calendar-event me-1"></i>{{ formatDate(item.created_at, false) }}
              </li>
              <li class="list-inline-item">•</li>
              <li class="list-inline-item">
                <i class="ti ti-clock-2 me-1"></i>{{ $t('0_min_read', {time : readMinCalculator(item.content)}) }} 
              </li>
            </ul>
            <div class="position-relative">
              <h3 class="h4 post-title mb-2 line-clamp clamp-2">
                <router-link class="text-link stretched-link" :to="{name: 'site-blog-index', params: {id: item.__id, post: item.slug}}" :title="item.title">{{ item.title }}</router-link>
              </h3>
              <p class="mb-0 line-clamp clamp-3">{{ item.excerpt }}</p>
            </div>
          </div>
          <div class="post-author d-flex mt-auto p-4">
            <div class="flex-shrink-0">
              <router-link :to="{name: 'site-profile', params: {username: item.user.username}}" class="is-hoverable" :title="Object.values(item.user.name).join(' ')">
                <img loading="lazy" class="rounded-circle w-auto" :src="item.user.image" :alt="Object.values(item.user.name).join(' ')" width="42" height="42">
              </router-link>
            </div>
            <div class="flex-grow-1 ms-3">
              <p class="mb-0 lh-base small">{{ $t('written_by') }}</p>
              <router-link class="text-link" :to="{name: 'site-profile', params: {username: item.user.username}}" :title="Object.values(item.user.name).join(' ')">{{ Object.values(item.user.name).join(' ') }}</router-link>
            </div>
          </div>
        </article>
      </div>

    </div>
  </div>
</section>
</template>

<script>
import siteService from '@/services/site.service'
export default {
    data(){
        return {
            posts: [],
            tag: null,
            page: 0,
            loadable: true
        }
    },
    async created(){
        this.tag = this.$route.params.tag
        const response = await siteService.tagIndex(this.$route.params)
        if(response.status == 1){
            this.posts = response.posts
            this.loadable = response.loadable
            window.onscroll = () => {
                if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) && this.loadable) {
                    this.loadable = false;
                    this.loadMore()
                }
            }
        }
    },
    methods: {
    async loadMore(){
      this.page++
      const response = await siteService.tagBlog({
        tag: this.$route.params.tag,
        page: this.page
      })
      if(response.status == 1){
        response.posts.forEach(element => {
          this.posts.push(element)
        });
        this.loadable = response.loadable
      }
    }
  },
}
</script>