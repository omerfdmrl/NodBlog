<template>
<section class="section" v-if="profile">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-9 col-lg-10 text-center">
        <div class="mb-5">
          <img loading="lazy" class="img-fluid" :src="profile.image" :alt="Object.values(profile.name).join(' ')" width="180" height="180">
        </div>
        <h4 class="text-dark mb-1">{{ Object.values(profile.name).join(' ') }}</h4>
        <p><span v-for="(group,index) in profile.group" :key="index">{{ group.title }}<span v-if="profile.group[++index]"> • </span></span></p>
        <p class="mb-3">
          <span class="fw-medium text-black"><i class="ti ti-user me-2"></i>{{ abbreviateNumber(followers) }} </span> {{ $t('followers') }} <br>
          <span class="fw-medium text-black"><i class="ti ti-edit-circle me-2"></i>{{ postCount }} </span> {{ $t('published_posts') }}
        </p>
        <div class="content">
          <p v-html="profile.about"></p>
        </div>
        <ul class="list-inline social-links mt-4">
          <li v-if="profile.social.instagram" class="list-inline-item me-4 mt-1 text-center">
            <a class="lh-1" target="_blank" :href="[`https://www.instagram.com/${profile.social.instagram}`]" :title="$t('instagram')">
              <i class="ti ti-brand-instagram"></i>
              <span class="text-link">{{ $t('instagram') }}</span>
            </a>
          </li>
          <li v-if="profile.social.twitter" class="list-inline-item me-4 mt-1 text-center">
            <a class="lh-1" target="_blank" :href="[`https://www.twitter.com/${profile.social.twitter}`]" title="$t('twitter')">
              <i class="ti ti-brand-twitter"></i>
              <span class="text-link">{{ $t('twitter') }}</span>
            </a>
          </li>
          <li v-if="profile.social.facebook" class="list-inline-item me-4 mt-1 text-center">
            <a class="lh-1" target="_blank" :href="[`https://www.facebook.com/${profile.social.facebook}`]" :title="$t('facebook')">
              <i class="ti ti-brand-facebook"></i>
              <span class="text-link">{{ $t('facebook') }}</span>
            </a>
          </li>
          <li v-if="profile.social.linkedin" class="list-inline-item me-4 mt-1 text-center">
            <a class="lh-1" target="_blank" :href="[`https://www.linkedin.com/in/${profile.social.linkedin}`]" :title="$t('linkedin')">
              <i class="ti ti-brand-linkedin"></i>
              <span class="text-link">{{ $t('linkedin') }}</span>
            </a>
          </li>
        </ul>
        <input @input="toggleFollow" v-model="isFollowing" :data-content="isFollowing ? $t('following'): $t('+_follow')" type="checkbox" class="follow-button mt-4">
        <div class="section">
          <div class="border-top"></div>
        </div>
      </div>
    </div>
    <div class="row align-items-center section-title">
      <div class="col-12 text-center">
        <h2 class="h3 mb-0 title">{{ $t('recent_posts') }}</h2>
      </div>
    </div>
    <div class="row gy-5 gx-md-5">
      <div class="col-lg-4 col-md-6" v-for="(post,index) in posts" :key="index">
        <article class="bg-white d-flex flex-column h-100">
          <div class="post-image">
            <router-link class="d-block" :to="{name: 'site-blog-index', params: {post: post.slug, id: post.__id}}" :title="post.title">
              <img loading="lazy" class="w-100 h-auto" :src="post.image" :alt="post.title" width="400" height="264">
            </router-link>
          </div>
          <div class="p-4 ">
            <ul class="post-meta list-inline mb-3">
              <li class="list-inline-item">
                <i class="ti ti-calendar-event me-1"></i>{{ formatDate(post.created_at,false) }}
              </li>
              <li class="list-inline-item">•</li>
              <li class="list-inline-item">
                <i class="ti ti-clock-2 me-1"></i>{{ $t('0_min_read', {time: readMinCalculator(post.content)}) }}
              </li>
            </ul>
            <div class="position-relative">
              <h3 class="h4 post-title mb-2 line-clamp clamp-2">
                <router-link class="text-link stretched-link" :to="{name: 'site-blog-index', params: {post: post.slug, id: post.__id}}" :title="post.title">{{ post.title }}</router-link>
              </h3>
              <p class="mb-0 line-clamp clamp-3" v-html="post.excerpt"></p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import siteService from '@/services/site.service';
export default {
  data(){
    return {
      profile: null,
      posts: [],
      loadable: true,
      followers: 0,
      isFollowing: false,
      postCount: 0,
      page: 0
    }
  },
  unmounted(){
    this.$emit('updateHead',false)
  },
  async created(){
    const response = await siteService.profile(this.$route.params)
    if(response.status == 1){
      this.profile = response.profile
      this.postCount = response.postCount
      this.posts = response.posts
      this.followers = response.followers
      this.isFollowing = response.isFollowing
      this.loadable = this.postCount !== this.posts.length
      this.$emit('updateHead',{
        meta: {
          description: this.profile.about
        },
        og: {
          title: Object.values(this.profile.name).join(' '),
          url: window.location.href,
          image: this.profile.image,
          description: this.profile.about
        }
      })
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
      const response = await siteService.profileBlog({
        username: this.$route.params.username,
        page: this.page
      })
      if(response.status == 1){
        response.posts.forEach(element => {
          this.posts.push(element)
        });
        this.loadable = this.postCount !== this.posts.length
      }
    },
    async toggleFollow(){
      siteService.profileFollow({
        username: this.$route.params.username
      })
      this.followers = this.isFollowing ? this.followers - 1 : this.followers + 1
    }
  },
}
</script>