<template>
  <component @updateHead="updateHead" :is="template" :menu="menu" :tags="tags"></component>
  <teleport to="head">
    <meta name='keywords' :content="informations.head.meta.keywords">
    <meta name='description' :content="informations.head.meta.description">
    <meta name='subject' :content="informations.head.meta.subject">
    <meta name='copyright' :content="informations.name">
    <meta name='url' :content='informations.url.site'>
    <meta name='identifier-URL' :content='informations.url.site'>
    <meta name='og:title' :content='informations.head.og.title'>
    <meta name='og:url' :content='informations.head.og.url || informations.url.site'>
    <meta name='og:type' :content='informations.head.og.type'>
    <meta name='og:image' :content='informations.head.og.image'>
    <meta name='og:site_name' :content='informations.head.og.site_name'>
    <meta name='og:description' :content='informations.head.og.description'>
    <meta name="news_keywords" :content="informations.head.meta.keywords">
    <link rel="icon" :href="informations.favicon">
    <title>{{ informations.head.title }}</title>
  </teleport>
  <teleport to="head"><div v-html="custom.css"></div></teleport>
  <teleport to="body"><div v-html="custom.js"></div></teleport>
</template>

<script>
import site from './views/Templates/SiteTemplate.vue'
import panel from './views/Templates/PanelTemplate.vue'
import authentication from './views/Templates/AuthenticationTemplate.vue'
import mainService from './services/main.service'
export default {
  data(){
    return {
      informations: {
        head: {
          meta: {},
          og: {}
        },
        url: {}
      },
      custom: {},
      originalInformations: {},
      menu: null,
      tags: null
    }
  },
  computed: {
    template(){
      return this.$route.meta.template
    }
  },
  async created(){
    window.t = this.$t
    window.$router = this.$router
    const response = await mainService.info()
    if(response.status == 1){
      this.informations = response.informations
      this.custom = response.custom
      this.originalInformations = structuredClone(response.informations)
      this.menu = response.menu
      this.tags = response.tags
      this.$store.commit("login", response.user);
      this.$store.commit("informations", response.informations);
    }
  },
  methods: {
    updateHead(informations){
      if(!informations){
        this.informations = this.originalInformations
        return;
      }
      this.informations.head.meta.keywords = informations.meta.keywords || this.originalInformations.head.meta.keywords
      this.informations.head.meta.description = informations.meta.description || this.originalInformations.head.meta.description
      this.informations.head.meta.subject = informations.meta.subject || this.originalInformations.head.meta.subject
      this.informations.head.meta.keywords = informations.meta.keywords || this.originalInformations.head.meta.keywords
      this.informations.head.og.title = informations.og.title || this.originalInformations.head.og.title
      this.informations.head.og.url = informations.og.url || this.originalInformations.head.og.url
      this.informations.head.og.type = informations.og.type || this.originalInformations.head.og.type
      this.informations.head.og.image = informations.og.image || this.originalInformations.head.og.image
      this.informations.head.og.description = informations.og.description || this.originalInformations.head.og.description
      this.informations.head.og.description = informations.og.description || this.originalInformations.head.og.description
    }
  },
  components: {
    site,
    panel,
    authentication
  },
}
</script>