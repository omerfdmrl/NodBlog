<template>
<div class="header-height-fix"></div>
<header class="header-nav tt">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <nav class="navbar navbar-expand-lg navbar-light p-0">
          <button class="navbar-toggler d-inline-flex d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navHeader" aria-controls="navHeader" aria-expanded="false" aria-label="Toggle navigation">
            <svg xmlns="http://www.w3.org/2000/svg" class="menu-open" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="12" x2="14" y2="12"></line>
              <line x1="4" y1="18" x2="18" y2="18"></line>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="menu-close" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <router-link class="navbar-brand d-flex mb-0 me-0" :to="{name: 'site-home'}">
            <img v-if="$store.state.informations.logo.type == 'image'" loading="lazy" class="img-fluid" width="130" height="31" :src="$store.state.informations.logo.value">
            <h2 v-if="$store.state.informations.logo.type == 'text'">{{ $store.state.informations.logo.value }}</h2>
          </router-link>
          <div class="d-block d-lg-none">
            <button class="search-toggle" data-toggle="search" aria-label="Search Toggle">
              <svg width="28" height="28" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 15.5L19 19" stroke="currentColor" stroke-linecap="square" stroke-linejoin="square"></path>
                <path d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z" stroke="currentColor" stroke-linecap="square" stroke-linejoin="square"></path>
              </svg>
            </button>
          </div>
          <div class="collapse navbar-collapse" id="navHeader">
            <ul class="navbar-nav ms-auto">
              <li :class="[item.child ? 'dropdown' : null,'nav-item']" v-for="(item,index) in header" :key="index">
                <a v-if="item.href.type == 'url' && !item.child" class="nav-link" :href="item.href.value" :target="item.href.target">{{ item.title }}</a>
                <router-link v-if="item.href.type == 'router' && !item.child" class="nav-link" :to="{name: item.href.value, params: item.params}">{{ item.title }}</router-link>
                <a v-if="item.child" class="nav-link dropdown-toggle" href="#!" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ item.title }}</a>
                <ul class="dropdown-menu">
                  <li v-for="(item2,index2) in item.child" :key="index2">
                    <a v-if="item2.href.type == 'url'" class="dropdown-item" :href="item2.href.value" :target="item2.href.target">{{ item2.title }}</a>
                    <router-link v-if="item2.href.type == 'router'" class="dropdown-item" :to="{name: item2.href.value, params: item2.params}">{{ item2.title }}</router-link>
                  </li>
                </ul>
              </li>
            </ul>
            <div class="navbar-right d-none d-lg-block">
              <button class="search-toggle ms-2" data-toggle="search" aria-label="Search Toggle">
                <svg width="30" height="30" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 15.5L19 19" stroke="currentColor" stroke-linecap="square" stroke-linejoin="square"></path>
                  <path d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z" stroke="currentColor" stroke-linecap="square" stroke-linejoin="square"></path>
                </svg>
              </button>
            </div>
            <div class="navbar-right ms-3 dropdown">
              <button v-if="!$store.state.user" data-bs-toggle="modal" data-bs-target="#loginModal" class="btn btn-primary rounded">{{ $t('login') }}</button>
              <div v-else class="flex-shrink-0">
                <a href="#!" class="is-hoverable" :title="Object.values($store.state.user.name).join(' ')">
                  <img loading="lazy" class="rounded-circle w-auto" :src="$store.state.user.image" :alt="Object.values($store.state.user.name).join(' ')" width="42" height="42">
                </a>
                <ul class="dropdown-menu w-25 text-center min-vw-7">
                  <li>
                    <router-link :to="{name: 'site-blog-add'}" class="dropdown-item">{{ $t('new_blog') }}</router-link>
                  </li>
                  <li>
                    <a :href="$router.resolve({name: 'panel-dashboard'}).href" target="_blank" class="dropdown-item">{{ $t('panel') }}</a>
                  </li>
                  <li>
                    <a href="#!" @click="logout" class="dropdown-item">{{ $t('logout') }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</header>
<div class="search-overlay" data-toggle="search-close"></div>
<div class="search-block overflow-auto bg-body">
  <div data-toggle="search-close">
    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </div>
  
  <div class="is-hidden">
    <input type="text" v-model="searchData.data" id="js-search-input" :placeholder="$t('type_to_search..')" aria-label="search-query">
  </div>
  
  <div class="mt-4 pt-2 is-hidden popular-topics">
    <div class="post-meta">
      <div class="section-title mb-3">
        <p class="title h4 mb-0">{{ $t('popular_tags') }}</p>
      </div>
      <ul class="taxonomy-lists list-inline">
        <li v-for="(tag,index) in tags" :key="index" class="list-inline-item me-2 mt-2">
          <router-link class="bg-white" :to="{name: 'site-tag-index', params: {tag : tag.key}}">{{ tag.key }}</router-link>
        </li>
        <li class="list-inline-item mt-2">
          <router-link class="border-0 pe-0 d-inline-flex align-items-center" :to="{name: 'site-tag-list'}"> {{ $t('all_topics') }} <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <polyline points="9 6 15 12 9 18"></polyline>
            </svg>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <div class="mt-4 pt-2 is-hidden recent-posts">
    <div class="post-meta w-100">
      <div class="row gy-4">
        <div class="col-md-6" v-for="(item,index) in searchData.posts" :key="index">
          <article class="row gx-3 align-items-start position-relative">
            <div class="col-auto" v-if="item.image">
              <img loading="lazy" class="img-fluid" :src="item.image" :alt="item.title" width="75" height="75">
            </div>
            <div class="col">
              <span class="d-block lh-1 mb-2 zIndexed line-clamp clamp-2">
                <router-link :to="{name: 'site-tag-index', params: { tag: item.tag[0] }}" class="small lh-1 text-muted text-link">{{ item.tag[0] }}</router-link>
              </span>
              <router-link :to="{name: 'site-blog-index', params: {id: item.__id, post: item.slug}}" class="fs-lg lh-base text-dark text-link stretched-link">{{ item.title }}</router-link>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</div>
<router-view :key='$route.path' @updateHead="updateHead" :left="left"></router-view>
<footer class="bg-white">
  <div class="container">
    <div class="row gy-3">
      <div class="col-lg-4 text-center text-lg-start">
        <ul class="list-inline footer-menu">
          <li v-for="(item,index) in footer" :key="index" class="list-inline-item m-0">
            <a v-if="item.href.type == 'url'" class="text-link" :href="item.href.value"><i v-if="item.icon" :class="item.icon"></i> {{ item.title }} </a>
            <router-link v-if="item.href.type == 'router'" class="text-link" :to="{name: item.href.value, params: item.href.params}"><i v-if="item.icon" :class="item.icon"></i> {{ item.title }} </router-link>
          </li>
        </ul>
      </div>
      <div class="col-lg-4 text-center">
        <p class="copyright-text mb-0">{{ $t('footer_0_0_all_rights_reserved', { name: $store.state.informations.name, date: new Date().getFullYear() }) }}</p>
      </div>
      <div class="col-lg-4 text-center text-lg-end">
        <ul v-if="$store.state.informations.social" class="list-inline social-links">
          <li v-if="$store.state.informations.social.twitter" class="list-inline-item  lead text-center">
            <a class="is-hoverable" target="_blank" :href="[`https://twitter.com/${$store.state.informations.social.twitter}`]" title="Twitter">
              <i class="ti ti-brand-twitter"></i>
            </a>
          </li>
          <li v-if="$store.state.informations.social.linkedin" class="list-inline-item ms-3 lead text-center">
            <a class="is-hoverable" target="_blank" :href="[`https://linkedin.com/${$store.state.informations.social.linkedin}`]" title="LinkedIn">
              <i class="ti ti-brand-linkedin"></i>
            </a>
          </li>
          <li v-if="$store.state.informations.social.instagram" class="list-inline-item ms-3 lead text-center">
            <a class="is-hoverable" target="_blank" :href="[`https://instagram.com/${$store.state.informations.social.instagram}`]" title="Instagram">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </li>
          <li v-if="$store.state.informations.social.facebook" class="list-inline-item ms-3 lead text-center">
            <a class="is-hoverable" target="_blank" :href="[`https://facebook.com/${store.state.informations.social.facebook}`]" title="Facebook">
              <i class="ti ti-brand-facebook"></i>
            </a>
          </li>
          <li v-if="$store.state.informations.social.reddit" class="list-inline-item ms-3 lead text-center">
            <a class="is-hoverable" target="_blank" :href="[`https://reddit.com/u/${store.state.informations.social.reddit}`]" title="Reddit">
              <i class="ti ti-brand-reddit"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>
<!-- Modal -->
<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="loginModalLabel">{{ $t('login') }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- Login form-->
        <form @submit.prevent="login()">
            <!-- Form Group (email address)-->
            <div class="mb-3">
                <label class="small mb-1" for="inputEmailAddress">{{ $t('email') }}</label>
                <input required v-model="loginData.email" class="form-control" id="inputEmailAddress" type="email" :placeholder="$t('enter_email_address')">
            </div>
            <!-- Form Group (password)-->
            <div class="mb-3">
                <label class="small mb-1" for="inputPassword">{{ $t('password') }}</label>
                <input required v-model="loginData.password" class="form-control" id="inputPassword" type="password" :placeholder="$t('enter_password')">
            </div>
            <!-- Form Group (remember password checkbox)-->
            <div class="mb-3">
                <div class="form-check">
                    <input v-model="loginData.remember" class="form-check-input" id="rememberPasswordCheck" type="checkbox" value="true">
                    <label class="form-check-label" for="rememberPasswordCheck">{{ $t('remember_password') }}</label>
                </div>
            </div>
            <!-- Form Group (login box)-->
            <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                <a class="small" href="javascript:;" data-bs-toggle="modal" data-bs-target="#forgotPasswordModal">{{ $t('forgot_password?') }}</a>
                <button class="btn btn-primary" type="submit">{{ $t('login') }}</button>
            </div>
        </form>
      </div>
      <div class="modal-footer text-center">
        <div class="small"><a data-bs-toggle="modal" data-bs-target="#registerModal" href="javascript:;">{{ $t('need_an_account?_sign_up!') }}</a></div>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="registerModalLabel">{{ $t('register') }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- Login form-->
        <form @submit.prevent="register()">
          <!-- Form Group (first name)-->
          <div class="mb-3">
              <label class="small mb-1" for="inputFirstName">{{ $t('first_name') }}</label>
              <input required v-model="registerData.firstname" class="form-control" id="inputFirstName" type="text" :placeholder="$t('enter_first_name')">
          </div>
          <!-- Form Group (last name)-->
          <div class="mb-3">
              <label class="small mb-1" for="inputLastName">{{ $t('last_name') }}</label>
              <input required v-model="registerData.lastname" class="form-control" id="inputLastName" type="text" :placeholder="$t('enter_last_name')">
          </div>
          <!-- Form Group (email address)-->
          <div class="mb-3">
              <label class="small mb-1" for="inputEmailAddress2">{{ $t('email') }}</label>
              <input required v-model="registerData.email" class="form-control" id="inputEmailAddress2" type="email" :placeholder="$t('enter_email_address')">
          </div>
          <!-- Form Group (username)-->
          <div class="mb-3">
              <label class="small mb-1" for="inputUsername">{{ $t('username') }}</label>
              <input required v-model="registerData.username" class="form-control" id="inputUsername" type="text" :placeholder="$t('enter_username')">
          </div>
          <!-- Form Group (password)-->
          <div class="mb-3">
              <label class="small mb-1" for="inputPassword2">{{ $t('password') }}</label>
              <input required v-model="registerData.password" class="form-control" id="inputPassword2" type="password" :placeholder="$t('enter_password')">
          </div>
          <!-- Form Group (confirm password)-->
          <div class="mb-3">
              <label class="small mb-1" for="inputConfirmPassword">{{ $t('confirm_password') }}</label>
              <input required v-model="registerData.repassword" class="form-control" id="inputConfirmPassword" type="password" :placeholder="$t('confirm_password')">
          </div>
          <!-- Form Group (login box)-->
          <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
              <button class="btn btn-primary" type="submit">{{ $t('register') }}</button>
          </div>
      </form>
      </div>
      <div class="modal-footer text-center">
        <div class="small"><a data-bs-toggle="modal" data-bs-target="#loginModal" href="javascript:;">{{ $t('have_an_account?_go_to_login') }}</a></div>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="forgotPasswordModal" tabindex="-1" aria-labelledby="forgotPasswordModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="forgotPasswordModalLabel">{{ $t('password_recovery') }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="small mb-3 text-muted">{{ $t('enter_your_email_address_and_we_will_send_you_a_link_to_reset_your_password.') }}</div>
        <!-- Login form-->
        <form @submit.prevent="sendForgotPassword()">
            <!-- Form Group (email address)-->
            <div class="mb-3">
                <label class="small mb-1" for="inputEmailAddress3">{{ $t('email') }}</label>
                <input required v-model="forgotPasswordData.email" class="form-control" id="inputEmailAddress3" type="email" :placeholder="$t('enter_email_address')">
            </div>
            <!-- Form Group (login box)-->
            <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                <a data-bs-toggle="modal" data-bs-target="#loginModal" class="small" href="javascript:;">{{ $t('return_to_login') }}</a>
                <button class="btn btn-primary" type="submit">{{ $t('reset_password') }}</button>
            </div>
        </form>
      </div>
      <div class="modal-footer text-center">
        <div class="small"><a data-bs-toggle="modal" data-bs-target="#registerModal" href="javascript:;">{{ $t('need_an_account?_sign_up!') }}</a></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import authenticationService from '@/services/authentication.service';
import siteService from '@/services/site.service';
export default {
  props: ['menu', 'tags'],
  data(){
    return {
      header: [],
      footer: [],
      left: [],
      loginData: {},
      registerData: {},
      forgotPasswordData: {},
      searchData: {}
    }
  },
  methods: {
    async login(){
        const response = await authenticationService.login(this.loginData)
        if(response.status == 1){
            this.$store.commit("login", response.user);
            this.loginData = {}
        }
    },
    logout(){
        authenticationService.logout({
            redirect: false
        })
        this.$store.commit("login", false);
    },
    async register(){
        const response = await authenticationService.register(this.registerData)
        if(response.status == 1){
          this.registerData = {}
        }
    },
    async sendForgotPassword(){
        const response = await authenticationService.sendForgotPassword(this.forgotPasswordData)
        if(response.status == 1){
          this.forgotPasswordData = {}
        }
    },
    updateHead(informations){
      this.$emit('updateHead',informations)
    },
    async search(){
      const response = await siteService.search(this.searchData)
      if(response.status == 1){
        this.searchData.posts = response.posts
      }
    }
  },
  watch: {
    'menu'(){
      const menu = structuredClone(this.menu)
      if(menu){
        var parents = menu.filter((el) => { return !el.parent })
        var child = menu.filter((el) => { return el.parent })
        child.forEach(element => {
          var parent = parents.filter((el) => { return el._id == element.parent._id })
          if(!parents[parents.indexOf(parent[0])].child){
            parents[parents.indexOf(parent[0])].child = []
          }
          parents[parents.indexOf(parent[0])].child.push(element)
        });
        this.header = parents.filter((el) => {return el.menu == 'header'})
        this.footer = parents.filter((el) => {return el.menu == 'footer'})
        this.left = parents.filter((el) => {return el.menu == 'left'})
      }
    },
    'searchData.data'(){
          clearTimeout(this.searchData.interval)
          this.searchData.interval = setTimeout(() => {
              if(this.searchData.data.length > 2){
                this.search()
              }
          }, 500);
      }
  }
}
</script>