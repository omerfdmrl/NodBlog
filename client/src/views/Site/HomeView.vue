<template>
  <section class="banner bg-white overflow-hidden">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-9 col-md-10 position-relative mx-auto">
            <h1 class="title display-1 d-inline mb-0">
              <svg class="shape text-primary" width="46" height="50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15 46A91.9 91.9 0 0 0 2 43.8c-1-.1-1.8.5-1.9 1.5-.1.9.6 1.7 1.4 1.8a87 87 0 0 1 12.7 2.3c.9.3 1.8-.2 2.1-1.1.3-1-.3-1.9-1.1-2.1ZM28.1 29c-7-7-14.7-13.2-21.5-20.5-.6-.7-1.7-.7-2.3 0-.7.6-.8 1.6-.1 2.3C11 18 18.8 24.2 25.7 31.3c.7.7 1.7.7 2.4 0 .6-.6.7-1.7 0-2.3ZM41 1.8l.7 12.1c0 1 .8 1.7 1.7 1.6 1 0 1.6-.8 1.6-1.7l-.6-12.2c0-1-.8-1.6-1.8-1.6-.8 0-1.6.9-1.5 1.8Z" fill="currentColor"></path>
              </svg>{{ $t('stay_cool') }}
            </h1>
          </div>
        </div>
      </div>
    </section>
  <HomeComponent :left="left"></HomeComponent>
</template>

<script>
import HomeComponent from '@/components/HomeComponent.vue';
export default {
  props: ['left'],
  components: {
    HomeComponent
}
}
</script>