<template>
<section class="section">
  <div class="container">
    <div class="row g-0 justify-content-center">
      <div class="col-xl-9 col-lg-10">
        <div class="row gy-2 align-items-center section-title mb-0 section pt-0">
          <div class="col-12">
            <h1 class="h3 mb-0 title">{{ $t('tags') }}</h1>
          </div>
          <div class="col-12">
            <ul class="list-inline breadcrumb-menu">
              <li class="list-inline-item">
                <router-link class="text-link" :to="{name : 'site-home'}">{{ $t('home') }}</router-link>
              </li>
              <li class="list-inline-item">• &nbsp; <a class="text-link" href="#!">{{ $t('tags') }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-xl-9 col-lg-10">
        <div class="tab-content" id="taxonomyLists">
          <div class="row g-2 taxonomy-lists">

            <div v-for="(tag,index) in tags" :key="index" class="col-md-4 col-6">
                <router-link class="text-dark px-3 py-2 d-flex lead bg-white" :to="{name: 'site-tag-index', params: {tag: tag.key}}">
                    <div class="flex-grow-1">
                        <span class="sort-alphabetical">{{ tag.key }}</span>
                        <small class="sort-popular"> ({{ tag.count }})</small>
                    </div>
                    <div class="flex-shrink-0 ms-2 icon">
                        <i class="ti ti-arrow-right opacity-25 small"></i>
                    </div>
                </router-link>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import mainService from '@/services/main.service'
export default {
    data(){
        return {
            tags: []
        }
    },
    async created(){
      const response = await mainService.tagList()
      this.tags = response.tags
    }
}
</script>