<template>

<section class="section">
  <div class="container row mx-auto">
    <div class="col-md-2">
      <ul class="home-sidebar">
        <li v-for="(item,index) in left" :key="index" class="list-inline-item m-0">
          <a v-if="item.href.type == 'url'" class="text-link" :href="item.href.value"><i v-if="item.icon" :class="item.icon"></i> {{ item.title }} </a>
          <router-link v-if="item.href.type == 'router'" class="text-link" :to="{name: item.href.value, params: item.href.params}"><i v-if="item.icon" :class="item.icon"></i> {{ item.title }} </router-link>
        </li>
      </ul>
    </div>
    <div class="col-md-7 min-h-1000">
      <swiper
        class="swiper mb-4 flow-swiper"
        :space-between="30"
        :slides-per-view="7"
        :slides-per-group="3"
        :navigation="true"
      >
        <swiper-slide v-if="$store.state.user" @click="selectSlide('flow')" :class="[type == 'flow' ? 'active' : null]">{{ $t('flow') }}</swiper-slide>
        <swiper-slide @click="selectSlide('content')" :class="[type == 'content' ? 'active' : null]">{{ $t('content') }}</swiper-slide>
        <swiper-slide @click="selectSlide('tag-' + tag.key)" v-for="(tag,index) in tags" :key="index" :class="[type == 'tag-' + tag.key ? 'active' : null]">{{ tag.key }}</swiper-slide>
      </swiper>
      <div v-for="(item,index) in items" :key="index">
        <article v-if="item.type == 'blog' || type == 'content'" class="bg-white d-flex flex-column h-100 mb-4 rounded p-5 shadow">
          <div v-if="item.image" class="post-image">
            <router-link class="d-block" :to="{name: 'site-blog-index', params: {post: item.slug, id: item.__id}}" :title="item.title">
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
                <i class="ti ti-clock-2 me-1"></i>{{ $t('0_min_read', { time: readMinCalculator(item.content) }) }}
              </li>
            </ul>
            <div class="position-relative">
              <h3 class="h4 post-title mb-2 line-clamp clamp-2">
                <router-link class="text-link stretched-link" :to="{name: 'site-blog-index', params: {post: item.slug, id: item.__id}}" :title="item.title">{{ item.title }}</router-link>
              </h3>
              <p class="mb-0 line-clamp clamp-3" v-html="item.excerpt"></p>
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
        <article v-else-if="item.type == 'comment'" class="bg-white d-flex shadow flex-column h-100 mb-4 rounded comments-block no-style">
          <div v-if="item.blog" class="comment-input mb-0">
            <div class="post-author d-flex mb-2">
              <div class="flex-shrink-0">
                <a href="#!" class="is-hoverable" :title="Object.values(item.user.name).join(' ')">
                  <img loading="lazy" class="rounded-circle w-auto" :src="item.user.image" :alt="Object.values(item.user.name).join(' ')" width="50" height="50">
                </a>
              </div>
              <div class="flex-grow-1 ms-3 name">
                {{ Object.values(item.user.name).join(' ') }}
              </div>
            </div>
            <div readonly class="form-control comments-editor" v-html="item.content"></div>
            <div class="actions">
              <router-link :to="{name: 'site-blog-index', params: {post: item.blog.slug, id: item.blog.__id}}" class="btn btn-success btn-sm">{{ $t('go_to_post') }}</router-link>
            </div>
          </div>
        </article>
        <article v-else-if="item.type == 'user'" class="bg-white d-flex flex-column h-100 mb-4 rounded p-5 shadow">
          <div class="d-sm-flex">
            <div class="flex-shrink-0">
              <img loading="lazy" class="img-fluid me-4 me-md-5" :src="item.image" :alt="Object.values(item.name).join(' ')" width="124" height="124">
            </div>
            <div class="flex-grow-1 mt-3 mt-sm-0">
              <div class="d-flex justify-content-between">
                <h4 class="text-dark mb-1">{{ Object.values(item.name).join(' ') }}</h4>
                <input @input="toggleFollow(index)" v-model="item.is" :data-content="item.is ? $t('following'): $t('+_follow')" type="checkbox" class="follow-button">
              </div>
              <p class="mb-2"><span v-for="(group,index) in item.group" :key="index">{{ group.title }}<span v-if="item.group[++index]"> • </span></span></p>
              <span v-html="item.about"></span>
              <router-link :to="{name: 'site-profile', params: {username: item.username}}" class="ms-2 text-link active">{{ $t('read_more') }} <i class="ti ti-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div class="col-md-3">
      <div class="home-sidebar">
        <h2 class="h3 mb-3">{{ $t('popular') }}</h2>
        <swiper class="swiper" :pagination="{clickable: true, dynamicBullets: true}" :autoplay="{delay: 5000, disableOnInteraction: false}">
          <swiper-slide>
            <ul class="d-flex list-unstyled popular-select-list">
              <li :class="[popularDay == 30 ? 'active' : null]" @click="selectPopularDay(30)">{{ $t('0_day', { day: 30 }) }}</li>
              <li :class="[popularDay == 90 ? 'active' : null]" @click="selectPopularDay(90)">{{ $t('0_day', { day: 90 }) }}</li>
              <li :class="[popularDay == 365 ? 'active' : null]" @click="selectPopularDay(365)">{{ $t('0_year', { year: 1 }) }}</li>
            </ul>
            <ul class="list-unstyled mt-2">
              <li class="archive-post-item" v-for="(item,index) in popular[popularDay]" :key="index">
                <div class="post-author d-flex mt-auto p-1">
                  <div class="flex-shrink-0">
                    <router-link :to="{name: 'site-profile', params: {username: item.user.username}}" class="is-hoverable" :title="Object.values(item.user.name).join(' ')">
                      <img loading="lazy" class="rounded-circle w-auto" :src="item.user.image" :alt="Object.values(item.user.name).join(' ')" width="42" height="42">
                    </router-link>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <router-link class="text-link" :to="{name: 'site-blog-index', params: {post: item.slug, id: item.__id}}" :title="item.title">{{ item.title.substr(0,20) }}<span v-if="item.title.length > 20">...</span></router-link>
                    <p class="mb-0 lh-base small">
                      <ul class="post-meta list-inline mb-3">
                        <li class="list-inline-item">
                          <i class="ti ti-calendar-event me-1"></i>{{ formatDate(item.created_at, false) }}
                        </li>
                      </ul>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </swiper-slide>
          <swiper-slide>
            <ul class="list-unstyled mt-2">
              <li class="archive-post-item" v-for="(item,index) in users" :key="index">
                <div class="post-author d-flex mt-auto p-1">
                  <div class="flex-shrink-0">
                    <router-link :to="{name: 'site-profile', params: {username: item._id.username}}" class="is-hoverable" :title="Object.values(item._id.name).join(' ')">
                      <img loading="lazy" class="rounded-circle w-auto" :src="item._id.image" :alt="Object.values(item._id.name).join(' ')" width="42" height="42">
                    </router-link>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <router-link class="text-link" :to="{name: 'site-profile', params: {username: item._id.username}}" :title="item.title">{{ Object.values(item._id.name).join(' ').substr(0,20) }}<span v-if="Object.values(item._id.name).join(' ').length > 20">...</span></router-link>
                    <p class="mb-0 lh-base small">
                      <i class="ti ti-article"></i>{{ item.blogCount }}
                        • 
                      <i class="ti ti-heart"></i>{{ item.likeCount }}
                        • 
                      <i class="ti ti-user"></i>{{ abbreviateNumber(item.follows[0].followerCount) }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import siteService from '@/services/site.service';
export default {
  props: ['left'],
  data(){
    return {
      items: {},
      popular: {},
      tags: {},
      users: {},
      page: 0,
      loadable: true,
      type: null,
      popularDay: null
    }
  },
  async created(){
    const response = await siteService.home()
    if(response.status == 1){
      this.tags = response.tags
      this.users = response.users
      window.onscroll = () => {
          if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) && this.loadable) {
            this.loadable = false;
            this.loadMore()
          }
      }
    }
    this.selectSlide(this.$store.state.user ? 'flow' : 'content')
    this.selectPopularDay(30)
  },
  methods: {
    async selectPopularDay(day){
      this.popularDay = day
      if(this.popular[day]) return false;
      const response = await siteService.homePopular({
        day: this.popularDay
      })
      if(response.status == 1){
        this.popular[day] = response.popular
      }
    },
    async selectSlide(key){
      this.page = -1
      this.loadable = true
      this.type = key
      this.items = []
      if(key.startsWith('tag-')){
        let tag = key.split('-')[1]
        this.loadTag(tag)
      }else if (key == 'flow'){
        this.loadMore()
      }else if (key == 'content'){
        this.loadMore(true)
      }
    },
    async loadMore(content = false){
      this.page++
      const response = await siteService.homeBlog({
        page: this.page,
        content
      })
      if(response.status == 1){
        this.loadable = response.loadable
        response.items.forEach(element => {
          this.items.push(element)
        });
      }
    },
    async loadTag(tag){
      this.page++
      const response = await siteService.tagBlog({
        tag,
        page: this.page
      })
      if(response.status == 1){
        response.posts.forEach(element => {
          element.type = 'blog'
          this.items.push(element)
        });
        this.loadable = response.loadable
      }
    },
    async toggleFollow(index){
      const item = this.items[index]
      siteService.profileFollow({
        username: item.username
      })
    }
  },
}
</script>